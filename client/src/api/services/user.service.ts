/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { BaseResponse } from '../base-response';

import { forgotPassword } from '../fn/user/forgot-password';
import { ForgotPassword$Params } from '../fn/user/forgot-password';
import { getPassportInfo } from '../fn/user/get-passport-info';
import { GetPassportInfo$Params } from '../fn/user/get-passport-info';
import { getUser } from '../fn/user/get-user';
import { GetUser$Params } from '../fn/user/get-user';
import { getUserFullInfo } from '../fn/user/get-user-full-info';
import { GetUserFullInfo$Params } from '../fn/user/get-user-full-info';
import { isPasswordCorrect } from '../fn/user/is-password-correct';
import { IsPasswordCorrect$Params } from '../fn/user/is-password-correct';
import { JwtDto } from '../models/jwt-dto';
import { logout } from '../fn/user/logout';
import { Logout$Params } from '../fn/user/logout';
import { PassportUserDto } from '../models/passport-user-dto';
import { patchPassport } from '../fn/user/patch-passport';
import { PatchPassport$Params } from '../fn/user/patch-passport';
import { patchPassword } from '../fn/user/patch-password';
import { PatchPassword$Params } from '../fn/user/patch-password';
import { refreshTokens } from '../fn/user/refresh-tokens';
import { RefreshTokens$Params } from '../fn/user/refresh-tokens';
import { signIn } from '../fn/user/sign-in';
import { SignIn$Params } from '../fn/user/sign-in';
import { signUp } from '../fn/user/sign-up';
import { SignUp$Params } from '../fn/user/sign-up';
import { updateForgottenPassword } from '../fn/user/update-forgotten-password';
import { UpdateForgottenPassword$Params } from '../fn/user/update-forgotten-password';
import { UserFullInfoDto } from '../models/user-full-info-dto';
import { UserShortDto } from '../models/user-short-dto';

@Injectable({ providedIn: 'root' })
export class UserService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `signUp()` */
  static readonly SignUpPath = '/api/user/sign-up';

  /**
   * Регистрация пользователя.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `signUp()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  signUp$Response(params: SignUp$Params, context?: HttpContext): Observable<BaseResponse<JwtDto>> {
    return signUp(this.http, this.rootUrl, params, context);
  }

  /**
   * Регистрация пользователя.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `signUp$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  signUp(params: SignUp$Params, context?: HttpContext): Observable<JwtDto> {
    return this.signUp$Response(params, context).pipe(
      map((r: BaseResponse<JwtDto>): JwtDto => r.body)
    );
  }

  /** Path part for operation `signIn()` */
  static readonly SignInPath = '/api/user/sign-in';

  /**
   * Авторизация пользователя.
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
   * Авторизация пользователя.
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

  /** Path part for operation `getUser()` */
  static readonly GetUserPath = '/api/user';

  /**
   * Получение пользователя.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getUser()` instead.
   *
   * This method doesn't expect any request body.
   */
  getUser$Response(params?: GetUser$Params, context?: HttpContext): Observable<BaseResponse<UserShortDto>> {
    return getUser(this.http, this.rootUrl, params, context);
  }

  /**
   * Получение пользователя.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getUser$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getUser(params?: GetUser$Params, context?: HttpContext): Observable<UserShortDto> {
    return this.getUser$Response(params, context).pipe(
      map((r: BaseResponse<UserShortDto>): UserShortDto => r.body)
    );
  }

  /** Path part for operation `patchPassport()` */
  static readonly PatchPassportPath = '/api/user';

  /**
   * Обновление информации о пользователе.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `patchPassport()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  patchPassport$Response(params: PatchPassport$Params, context?: HttpContext): Observable<BaseResponse<void>> {
    return patchPassport(this.http, this.rootUrl, params, context);
  }

  /**
   * Обновление информации о пользователе.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `patchPassport$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  patchPassport(params: PatchPassport$Params, context?: HttpContext): Observable<void> {
    return this.patchPassport$Response(params, context).pipe(
      map((r: BaseResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `patchPassword()` */
  static readonly PatchPasswordPath = '/api/user/update-password';

  /**
   * Обновление пароля пользователя.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `patchPassword()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  patchPassword$Response(params: PatchPassword$Params, context?: HttpContext): Observable<BaseResponse<void>> {
    return patchPassword(this.http, this.rootUrl, params, context);
  }

  /**
   * Обновление пароля пользователя.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `patchPassword$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  patchPassword(params: PatchPassword$Params, context?: HttpContext): Observable<void> {
    return this.patchPassword$Response(params, context).pipe(
      map((r: BaseResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `isPasswordCorrect()` */
  static readonly IsPasswordCorrectPath = '/api/user/check-password';

  /**
   * Проверка корректности пароля.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `isPasswordCorrect()` instead.
   *
   * This method doesn't expect any request body.
   */
  isPasswordCorrect$Response(params: IsPasswordCorrect$Params, context?: HttpContext): Observable<BaseResponse<boolean>> {
    return isPasswordCorrect(this.http, this.rootUrl, params, context);
  }

  /**
   * Проверка корректности пароля.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `isPasswordCorrect$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  isPasswordCorrect(params: IsPasswordCorrect$Params, context?: HttpContext): Observable<boolean> {
    return this.isPasswordCorrect$Response(params, context).pipe(
      map((r: BaseResponse<boolean>): boolean => r.body)
    );
  }

  /** Path part for operation `forgotPassword()` */
  static readonly ForgotPasswordPath = '/api/user/forgot-password';

  /**
   * Отправка ссылки для нового пароля.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `forgotPassword()` instead.
   *
   * This method doesn't expect any request body.
   */
  forgotPassword$Response(params: ForgotPassword$Params, context?: HttpContext): Observable<BaseResponse<void>> {
    return forgotPassword(this.http, this.rootUrl, params, context);
  }

  /**
   * Отправка ссылки для нового пароля.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `forgotPassword$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  forgotPassword(params: ForgotPassword$Params, context?: HttpContext): Observable<void> {
    return this.forgotPassword$Response(params, context).pipe(
      map((r: BaseResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `updateForgottenPassword()` */
  static readonly UpdateForgottenPasswordPath = '/api/user/forgot-password';

  /**
   * Восстановление пароля по ссылке.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateForgottenPassword()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateForgottenPassword$Response(params: UpdateForgottenPassword$Params, context?: HttpContext): Observable<BaseResponse<void>> {
    return updateForgottenPassword(this.http, this.rootUrl, params, context);
  }

  /**
   * Восстановление пароля по ссылке.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `updateForgottenPassword$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateForgottenPassword(params: UpdateForgottenPassword$Params, context?: HttpContext): Observable<void> {
    return this.updateForgottenPassword$Response(params, context).pipe(
      map((r: BaseResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `getUserFullInfo()` */
  static readonly GetUserFullInfoPath = '/api/user/full-info';

  /**
   * Получение информации в Личном кабинете.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getUserFullInfo()` instead.
   *
   * This method doesn't expect any request body.
   */
  getUserFullInfo$Response(params?: GetUserFullInfo$Params, context?: HttpContext): Observable<BaseResponse<UserFullInfoDto>> {
    return getUserFullInfo(this.http, this.rootUrl, params, context);
  }

  /**
   * Получение информации в Личном кабинете.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getUserFullInfo$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getUserFullInfo(params?: GetUserFullInfo$Params, context?: HttpContext): Observable<UserFullInfoDto> {
    return this.getUserFullInfo$Response(params, context).pipe(
      map((r: BaseResponse<UserFullInfoDto>): UserFullInfoDto => r.body)
    );
  }

  /** Path part for operation `getPassportInfo()` */
  static readonly GetPassportInfoPath = '/api/user/passport';

  /**
   * Получение полной информации пользователя.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getPassportInfo()` instead.
   *
   * This method doesn't expect any request body.
   */
  getPassportInfo$Response(params?: GetPassportInfo$Params, context?: HttpContext): Observable<BaseResponse<PassportUserDto>> {
    return getPassportInfo(this.http, this.rootUrl, params, context);
  }

  /**
   * Получение полной информации пользователя.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getPassportInfo$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getPassportInfo(params?: GetPassportInfo$Params, context?: HttpContext): Observable<PassportUserDto> {
    return this.getPassportInfo$Response(params, context).pipe(
      map((r: BaseResponse<PassportUserDto>): PassportUserDto => r.body)
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
  refreshTokens$Response(params?: RefreshTokens$Params, context?: HttpContext): Observable<BaseResponse<JwtDto>> {
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
  refreshTokens(params?: RefreshTokens$Params, context?: HttpContext): Observable<JwtDto> {
    return this.refreshTokens$Response(params, context).pipe(
      map((r: BaseResponse<JwtDto>): JwtDto => r.body)
    );
  }

}
