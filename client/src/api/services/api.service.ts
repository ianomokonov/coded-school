/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { JwtDto } from '../models/jwt-dto';
import { userControllerGetAuthor } from '../fn/operations/user-controller-get-author';
import { UserControllerGetAuthor$Params } from '../fn/operations/user-controller-get-author';
import { userControllerLogIn } from '../fn/operations/user-controller-log-in';
import { UserControllerLogIn$Params } from '../fn/operations/user-controller-log-in';
import { userControllerLogout } from '../fn/operations/user-controller-logout';
import { UserControllerLogout$Params } from '../fn/operations/user-controller-logout';
import { userControllerPatchAuthor } from '../fn/operations/user-controller-patch-author';
import { UserControllerPatchAuthor$Params } from '../fn/operations/user-controller-patch-author';
import { userControllerRefreshTokens } from '../fn/operations/user-controller-refresh-tokens';
import { UserControllerRefreshTokens$Params } from '../fn/operations/user-controller-refresh-tokens';
import { userControllerSignIn } from '../fn/operations/user-controller-sign-in';
import { UserControllerSignIn$Params } from '../fn/operations/user-controller-sign-in';
import { UserShortDto } from '../models/user-short-dto';

@Injectable({ providedIn: 'root' })
export class ApiService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `userControllerSignIn()` */
  static readonly UserControllerSignInPath = '/api/user/sign-up';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `userControllerSignIn()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  userControllerSignIn$Response(params: UserControllerSignIn$Params, context?: HttpContext): Observable<StrictHttpResponse<JwtDto>> {
    return userControllerSignIn(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `userControllerSignIn$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  userControllerSignIn(params: UserControllerSignIn$Params, context?: HttpContext): Observable<JwtDto> {
    return this.userControllerSignIn$Response(params, context).pipe(
      map((r: StrictHttpResponse<JwtDto>): JwtDto => r.body)
    );
  }

  /** Path part for operation `userControllerLogIn()` */
  static readonly UserControllerLogInPath = '/api/user/sign-in';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `userControllerLogIn()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  userControllerLogIn$Response(params: UserControllerLogIn$Params, context?: HttpContext): Observable<StrictHttpResponse<JwtDto>> {
    return userControllerLogIn(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `userControllerLogIn$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  userControllerLogIn(params: UserControllerLogIn$Params, context?: HttpContext): Observable<JwtDto> {
    return this.userControllerLogIn$Response(params, context).pipe(
      map((r: StrictHttpResponse<JwtDto>): JwtDto => r.body)
    );
  }

  /** Path part for operation `userControllerLogout()` */
  static readonly UserControllerLogoutPath = '/api/user/logout';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `userControllerLogout()` instead.
   *
   * This method doesn't expect any request body.
   */
  userControllerLogout$Response(params?: UserControllerLogout$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return userControllerLogout(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `userControllerLogout$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  userControllerLogout(params?: UserControllerLogout$Params, context?: HttpContext): Observable<void> {
    return this.userControllerLogout$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `userControllerGetAuthor()` */
  static readonly UserControllerGetAuthorPath = '/api/user';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `userControllerGetAuthor()` instead.
   *
   * This method doesn't expect any request body.
   */
  userControllerGetAuthor$Response(params?: UserControllerGetAuthor$Params, context?: HttpContext): Observable<StrictHttpResponse<UserShortDto>> {
    return userControllerGetAuthor(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `userControllerGetAuthor$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  userControllerGetAuthor(params?: UserControllerGetAuthor$Params, context?: HttpContext): Observable<UserShortDto> {
    return this.userControllerGetAuthor$Response(params, context).pipe(
      map((r: StrictHttpResponse<UserShortDto>): UserShortDto => r.body)
    );
  }

  /** Path part for operation `userControllerPatchAuthor()` */
  static readonly UserControllerPatchAuthorPath = '/api/user';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `userControllerPatchAuthor()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  userControllerPatchAuthor$Response(params: UserControllerPatchAuthor$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return userControllerPatchAuthor(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `userControllerPatchAuthor$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  userControllerPatchAuthor(params: UserControllerPatchAuthor$Params, context?: HttpContext): Observable<void> {
    return this.userControllerPatchAuthor$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `userControllerRefreshTokens()` */
  static readonly UserControllerRefreshTokensPath = '/api/user/refresh';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `userControllerRefreshTokens()` instead.
   *
   * This method doesn't expect any request body.
   */
  userControllerRefreshTokens$Response(params?: UserControllerRefreshTokens$Params, context?: HttpContext): Observable<StrictHttpResponse<JwtDto>> {
    return userControllerRefreshTokens(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `userControllerRefreshTokens$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  userControllerRefreshTokens(params?: UserControllerRefreshTokens$Params, context?: HttpContext): Observable<JwtDto> {
    return this.userControllerRefreshTokens$Response(params, context).pipe(
      map((r: StrictHttpResponse<JwtDto>): JwtDto => r.body)
    );
  }

}
