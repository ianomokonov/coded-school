/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { BaseResponse } from '../base-response';

import { getAuthor } from '../fn/user/get-author';
import { GetAuthor$Params } from '../fn/user/get-author';
import { JwtDto } from '../models/jwt-dto';
import { logIn } from '../fn/user/log-in';
import { LogIn$Params } from '../fn/user/log-in';
import { logout } from '../fn/user/logout';
import { Logout$Params } from '../fn/user/logout';
import { patchAuthor } from '../fn/user/patch-author';
import { PatchAuthor$Params } from '../fn/user/patch-author';
import { refreshTokens } from '../fn/user/refresh-tokens';
import { RefreshTokens$Params } from '../fn/user/refresh-tokens';
import { signIn } from '../fn/user/sign-in';
import { SignIn$Params } from '../fn/user/sign-in';
import { UserShortDto } from '../models/user-short-dto';

@Injectable({ providedIn: 'root' })
export class UserService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `signIn()` */
  static readonly SignInPath = '/api/user/sign-up';

  /**
   * Регистрация пользователя.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `signIn()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  signIn$Response(params: SignIn$Params, context?: HttpContext): Observable<BaseResponse<JwtDto>> {
    return signIn(this.http, this.rootUrl, params, context);
  }

  /**
   * Регистрация пользователя.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `signIn$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  signIn(params: SignIn$Params, context?: HttpContext): Observable<JwtDto> {
    return this.signIn$Response(params, context).pipe(
      map((r: BaseResponse<JwtDto>): JwtDto => r.body)
    );
  }

  /** Path part for operation `logIn()` */
  static readonly LogInPath = '/api/user/sign-in';

  /**
   * Авторизация пользователя.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `logIn()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  logIn$Response(params: LogIn$Params, context?: HttpContext): Observable<BaseResponse<JwtDto>> {
    return logIn(this.http, this.rootUrl, params, context);
  }

  /**
   * Авторизация пользователя.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `logIn$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  logIn(params: LogIn$Params, context?: HttpContext): Observable<JwtDto> {
    return this.logIn$Response(params, context).pipe(
      map((r: BaseResponse<JwtDto>): JwtDto => r.body)
    );
  }

  /** Path part for operation `logout()` */
  static readonly LogoutPath = '/api/user/logout';

  /**
   * Выход пользователя из системы.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `logout()` instead.
   *
   * This method doesn't expect any request body.
   */
  logout$Response(params?: Logout$Params, context?: HttpContext): Observable<BaseResponse<void>> {
    return logout(this.http, this.rootUrl, params, context);
  }

  /**
   * Выход пользователя из системы.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `logout$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  logout(params?: Logout$Params, context?: HttpContext): Observable<void> {
    return this.logout$Response(params, context).pipe(
      map((r: BaseResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `getAuthor()` */
  static readonly GetAuthorPath = '/api/user';

  /**
   * Получение пользователя.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAuthor()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAuthor$Response(params?: GetAuthor$Params, context?: HttpContext): Observable<BaseResponse<UserShortDto>> {
    return getAuthor(this.http, this.rootUrl, params, context);
  }

  /**
   * Получение пользователя.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAuthor$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAuthor(params?: GetAuthor$Params, context?: HttpContext): Observable<UserShortDto> {
    return this.getAuthor$Response(params, context).pipe(
      map((r: BaseResponse<UserShortDto>): UserShortDto => r.body)
    );
  }

  /** Path part for operation `patchAuthor()` */
  static readonly PatchAuthorPath = '/api/user';

  /**
   * Обновление пользователя.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `patchAuthor()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  patchAuthor$Response(params: PatchAuthor$Params, context?: HttpContext): Observable<BaseResponse<UserShortDto>> {
    return patchAuthor(this.http, this.rootUrl, params, context);
  }

  /**
   * Обновление пользователя.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `patchAuthor$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  patchAuthor(params: PatchAuthor$Params, context?: HttpContext): Observable<UserShortDto> {
    return this.patchAuthor$Response(params, context).pipe(
      map((r: BaseResponse<UserShortDto>): UserShortDto => r.body)
    );
  }

  /** Path part for operation `refreshTokens()` */
  static readonly RefreshTokensPath = '/api/user/refresh';

  /**
   * Обновление токенов.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `refreshTokens()` instead.
   *
   * This method doesn't expect any request body.
   */
  refreshTokens$Response(params?: RefreshTokens$Params, context?: HttpContext): Observable<BaseResponse<UserShortDto>> {
    return refreshTokens(this.http, this.rootUrl, params, context);
  }

  /**
   * Обновление токенов.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `refreshTokens$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  refreshTokens(params?: RefreshTokens$Params, context?: HttpContext): Observable<UserShortDto> {
    return this.refreshTokens$Response(params, context).pipe(
      map((r: BaseResponse<UserShortDto>): UserShortDto => r.body)
    );
  }

}
