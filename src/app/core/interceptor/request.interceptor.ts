import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { environment } from '../../../environments/environment';
import { AuthStore } from '../store/auth.store';

export const requestInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(AuthStore);
  const BASE_URL = environment.basePath;
  const IGNORE_URLS: string[] = [];

  if (req.url.includes(BASE_URL) && !IGNORE_URLS.some(url => req.url.includes(url))) {
    if (auth.isAuthed()) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${auth.getToken()}`
        }
      });
    }
  }

  return next(req);
};
