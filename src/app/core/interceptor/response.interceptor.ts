import { HttpInterceptorFn, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { iif, Observable, Subject, throwError } from 'rxjs';
import { catchError, finalize, switchMap, tap } from 'rxjs/operators';
import {
  ApiErrorArgsInvalid,
  ApiErrorForbidden,
  ApiErrorResponse,
  ApiErrorTokenInvalid
} from '../model/error-response';
import { attempt, isError } from 'lodash-es';
import { environment } from '../../../environments/environment';
import { AuthStore } from '../store/auth.store';

export const responseInterceptor: HttpInterceptorFn = (request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> => {
  const auth = inject(AuthStore);
  const BASE_URL = environment.basePath;
  const IGNORE_URLS: string[] = [];
  const refreshSubject = new Subject<any>();

  const handleResponse = (event: any): void => {
    if (!(event instanceof HttpResponse)) return;
    if (!request.url.startsWith(BASE_URL) || IGNORE_URLS.some(url => request.url.includes(url))) return;

    const { isParseJsonError, response } = safeParseJson(event.body);
    if (isParseJsonError) throw new ApiErrorResponse('jsonFormat', 'Cant parse object to json');
    if (!response.message || response.isSuccess === undefined) throw new ApiErrorResponse('noResponseStatus', 'Cant get response status');
    if (!response.isSuccess) throw new ApiErrorResponse('rsCode', response.message);
  };

  const handleError = (err: any) => {
    if (err instanceof HttpErrorResponse) {
      if (err.status === 401) return new ApiErrorTokenInvalid('tokenInvalid', 'Token expired or invalid');
      if (err.status === 403) return new ApiErrorForbidden('forbidden', 'Not permission to access resource');
      if (err.status === 400) return new ApiErrorArgsInvalid('badRequest', 'Request invalid', err.error);
    }
    return err;
  };

  const ifTokenExpired = () => {
    refreshSubject.subscribe({
      next: res => auth.logInSuccess(res),
      complete: () => refreshSubject.complete()
    });

    if (refreshSubject.observers.length === 1) {
      auth.refreshToken().subscribe(refreshSubject);
    }
    return refreshSubject;
  };

  const updateHeader = (req: HttpRequest<any>) =>
    req.clone({ setHeaders: { 'Content-Type': 'application/json', Authorization: `Bearer ${auth.getToken()}` } });

  const safeParseJson = (raw: any) => {
    if (typeof raw === 'object') return { isParseJsonError: false, response: raw };
    const response = attempt(JSON.parse, raw);
    return { isParseJsonError: isError(response), response };
  };

  const started = Date.now();
  let httpStatus = 'SUCCESS';

  return next.handle(request).pipe(
    tap(event => handleResponse(event)),
    catchError(err => {
      httpStatus = 'FAIL';
      if (err instanceof HttpErrorResponse && err.status === 401) {
        return iif(
          () => auth.getRefreshToken() !== '',
          ifTokenExpired().pipe(
            switchMap(() => next.handle(updateHeader(request))),
            catchError(() => throwError(() => new ApiErrorTokenInvalid('SESSION-INVALID', 'Token expired or invalid')))
          ),
          throwError(() => new ApiErrorTokenInvalid('SESSION-INVALID', 'Token expired or invalid'))
        );
      }
      return throwError(() => handleError(err));
    }),
    finalize(() => {
      if (!environment.production) {
        const elapsed = Date.now() - started;
        console[httpStatus === 'FAIL' ? 'error' : 'log'](`${request.method} "${request.urlWithParams}" ${httpStatus} in ${elapsed} ms.`);
      }
    })
  );
};
