import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import {  tapResponse } from '@ngrx/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap, tap } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { CmsAuthService, LoginRequest, LoginResponse, UserDto } from '../generated-service';
import { ApiStatusEnum } from '../model/api-status.enum';

export interface AuthState {
  tokenReceived: string;
  loggedIn: boolean;
  apiStatus: ApiStatusEnum;
  errMessage: string;
}

@Injectable({ providedIn: 'root' })
export class AuthStore extends ComponentStore<AuthState> {
  logoutSubject: Subject<unknown> = new Subject<unknown>();
  private readonly TOKEN_KEY = 'token';
  private readonly REFRESH_TOKEN_KEY = 'refresh-token';
  private readonly USER_INFO_KEY = 'user-info';
  private readonly USER_ROLE_KEY = 'user-role';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: CmsAuthService,
  ) {
    super(<AuthState>{
      loggedIn: false,
      apiStatus: ApiStatusEnum.INIT
    });
  }

  readonly tokenReceived$ = this.select((state) => state.tokenReceived);
  readonly loggedIn$ = this.select((state) => state.loggedIn);
  readonly apiStatus$ = this.select((state) => state.apiStatus);
  readonly errMessage$ = this.select((state) => state.errMessage);

  readonly loginVm$ : Observable<{isLoading: boolean, errMessage: string}> = this.select(this.apiStatus$, this.errMessage$, (apiStatus, errMessage) => ({
    isLoading: apiStatus === ApiStatusEnum.LOADING,
    errMessage
  }))

  readonly login = this.effect((request$: Observable<LoginRequest>) => request$.pipe(
    tap(() => this.patchState({ apiStatus: ApiStatusEnum.LOADING })),
    switchMap((request) => this.authService.apiCmsV1AuthLoginPost(request).pipe(
      tapResponse((res) => {
        if (res.data) this.logInSuccess(res.data);
        this.patchState({ tokenReceived: res.data?.token || undefined, loggedIn: true, apiStatus: ApiStatusEnum.LOADED, errMessage: undefined });
        void this.router.navigate(['/']);
      }, (err: any) => {
        this.patchState({ loggedIn: false, apiStatus: ApiStatusEnum.FAILED, errMessage: err.params ? err.params.message : undefined });
      })
    )
    )
  ));

  refreshToken() {
    return this.authService.apiCmsV1AuthRefreshTokenPost({ token: this.getToken(), refreshToken: this.getRefreshToken() });
  }

  readonly autoLogin = this.effect((trigger$) => trigger$.pipe(

  ));

  readonly logout = this.updater((state) => ({
    ...state,
    loggedIn: false
  }));

  logInSuccess(res: LoginResponse) {
    const token = res.token ? res.token : '';
    const refreshToken = res.refreshToken ? res.refreshToken : '';
    this.setToken(token, 180000);
    this.setRefreshToken(refreshToken, 180000);
    this.setUserInfo(res.userInfo ? res.userInfo : {});
    this.patchState({ tokenReceived: token, loggedIn: true });
  }

  /**
   * check user logged in
   */
  isAuthed(): boolean {
    return this.getCookie(this.TOKEN_KEY) !== '' || this.getCookie(this.REFRESH_TOKEN_KEY) !== '';
  }

  getToken(): string {
    return this.getCookie(this.TOKEN_KEY);
  }

  getRefreshToken(): string {
    return this.getCookie(this.REFRESH_TOKEN_KEY);
  }

  getUserInfo(): UserDto {
    const data = localStorage.getItem(this.USER_INFO_KEY);
    if (data) {
      return JSON.parse(data);
    }
    return {};
  }

  setUserInfo(user: UserDto): void {
    localStorage.setItem(this.USER_INFO_KEY, JSON.stringify(user));
  }

  setToken(token: string, expireIn: number): void {
    this.deleteCookie(this.TOKEN_KEY);
    this.setCookie(this.TOKEN_KEY, token, expireIn);
  }

  setRefreshToken(token: string, expireIn: number): void {
    this.deleteCookie(this.REFRESH_TOKEN_KEY);
    this.setCookie(this.REFRESH_TOKEN_KEY, token, expireIn);
  }

  clearToken() {
    this.deleteCookie(this.REFRESH_TOKEN_KEY);
    this.deleteCookie(this.TOKEN_KEY);
  }

  private setCookie(cname: string, cvalue: string, seconds: number): void {
    const d = new Date();
    d.setTime(d.getTime() + (seconds * 1000));
    const expires = 'expires=' + d.toUTCString();
    document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/';
  }

  private getCookie(cname: string): string {
    const name = cname + '=';
    const ca = document.cookie.split(';');
    for (let c of ca) {
      while (c.charAt(0) === ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);
      }
    }
    return '';
  }

  private deleteCookie(cname: string): void {
    const cvalue = this.getCookie(cname);
    if (cvalue !== '') {
      document.cookie = cname + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    }
  }
}
