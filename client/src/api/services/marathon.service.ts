/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { BaseResponse } from '../base-response';

import { completeUserMarathon } from '../fn/marathon/complete-user-marathon';
import { CompleteUserMarathon$Params } from '../fn/marathon/complete-user-marathon';
import { createMarathon } from '../fn/marathon/create-marathon';
import { CreateMarathon$Params } from '../fn/marathon/create-marathon';
import { createUserMarathon } from '../fn/marathon/create-user-marathon';
import { CreateUserMarathon$Params } from '../fn/marathon/create-user-marathon';
import { deleteUserMarathon } from '../fn/marathon/delete-user-marathon';
import { DeleteUserMarathon$Params } from '../fn/marathon/delete-user-marathon';
import { getAllMarathons } from '../fn/marathon/get-all-marathons';
import { GetAllMarathons$Params } from '../fn/marathon/get-all-marathons';
import { MarathonDto } from '../models/marathon-dto';
import { MarathonInfoDto } from '../models/marathon-info-dto';
import { readMarathonInfo } from '../fn/marathon/read-marathon-info';
import { ReadMarathonInfo$Params } from '../fn/marathon/read-marathon-info';
import { readUserMarathon } from '../fn/marathon/read-user-marathon';
import { ReadUserMarathon$Params } from '../fn/marathon/read-user-marathon';
import { startUserMarathon } from '../fn/marathon/start-user-marathon';
import { StartUserMarathon$Params } from '../fn/marathon/start-user-marathon';
import { updateUserMarathon } from '../fn/marathon/update-user-marathon';
import { UpdateUserMarathon$Params } from '../fn/marathon/update-user-marathon';

@Injectable({ providedIn: 'root' })
export class MarathonService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `getAllMarathons()` */
  static readonly GetAllMarathonsPath = '/api/marathon/all';

  /**
   * Получить список марафонов.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllMarathons()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllMarathons$Response(params?: GetAllMarathons$Params, context?: HttpContext): Observable<BaseResponse<Array<MarathonInfoDto>>> {
    return getAllMarathons(this.http, this.rootUrl, params, context);
  }

  /**
   * Получить список марафонов.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllMarathons$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllMarathons(params?: GetAllMarathons$Params, context?: HttpContext): Observable<Array<MarathonInfoDto>> {
    return this.getAllMarathons$Response(params, context).pipe(
      map((r: BaseResponse<Array<MarathonInfoDto>>): Array<MarathonInfoDto> => r.body)
    );
  }

  /** Path part for operation `createMarathon()` */
  static readonly CreateMarathonPath = '/api/marathon';

  /**
   * Создать марафон.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createMarathon()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createMarathon$Response(params: CreateMarathon$Params, context?: HttpContext): Observable<BaseResponse<number>> {
    return createMarathon(this.http, this.rootUrl, params, context);
  }

  /**
   * Создать марафон.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `createMarathon$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createMarathon(params: CreateMarathon$Params, context?: HttpContext): Observable<number> {
    return this.createMarathon$Response(params, context).pipe(
      map((r: BaseResponse<number>): number => r.body)
    );
  }

  /** Path part for operation `readUserMarathon()` */
  static readonly ReadUserMarathonPath = '/api/marathon/{id}';

  /**
   * Получить марафон.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `readUserMarathon()` instead.
   *
   * This method doesn't expect any request body.
   */
  readUserMarathon$Response(params: ReadUserMarathon$Params, context?: HttpContext): Observable<BaseResponse<MarathonDto>> {
    return readUserMarathon(this.http, this.rootUrl, params, context);
  }

  /**
   * Получить марафон.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `readUserMarathon$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  readUserMarathon(params: ReadUserMarathon$Params, context?: HttpContext): Observable<MarathonDto> {
    return this.readUserMarathon$Response(params, context).pipe(
      map((r: BaseResponse<MarathonDto>): MarathonDto => r.body)
    );
  }

  /** Path part for operation `updateUserMarathon()` */
  static readonly UpdateUserMarathonPath = '/api/marathon/{id}';

  /**
   * Изменить марафон.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateUserMarathon()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateUserMarathon$Response(params: UpdateUserMarathon$Params, context?: HttpContext): Observable<BaseResponse<void>> {
    return updateUserMarathon(this.http, this.rootUrl, params, context);
  }

  /**
   * Изменить марафон.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `updateUserMarathon$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateUserMarathon(params: UpdateUserMarathon$Params, context?: HttpContext): Observable<void> {
    return this.updateUserMarathon$Response(params, context).pipe(
      map((r: BaseResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `deleteUserMarathon()` */
  static readonly DeleteUserMarathonPath = '/api/marathon/{id}';

  /**
   * Удалить марафон.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteUserMarathon()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteUserMarathon$Response(params: DeleteUserMarathon$Params, context?: HttpContext): Observable<BaseResponse<void>> {
    return deleteUserMarathon(this.http, this.rootUrl, params, context);
  }

  /**
   * Удалить марафон.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `deleteUserMarathon$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteUserMarathon(params: DeleteUserMarathon$Params, context?: HttpContext): Observable<void> {
    return this.deleteUserMarathon$Response(params, context).pipe(
      map((r: BaseResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `readMarathonInfo()` */
  static readonly ReadMarathonInfoPath = '/api/marathon/{id}/info';

  /**
   * Получить марафон без пользователя.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `readMarathonInfo()` instead.
   *
   * This method doesn't expect any request body.
   */
  readMarathonInfo$Response(params: ReadMarathonInfo$Params, context?: HttpContext): Observable<BaseResponse<MarathonInfoDto>> {
    return readMarathonInfo(this.http, this.rootUrl, params, context);
  }

  /**
   * Получить марафон без пользователя.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `readMarathonInfo$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  readMarathonInfo(params: ReadMarathonInfo$Params, context?: HttpContext): Observable<MarathonInfoDto> {
    return this.readMarathonInfo$Response(params, context).pipe(
      map((r: BaseResponse<MarathonInfoDto>): MarathonInfoDto => r.body)
    );
  }

  /** Path part for operation `startUserMarathon()` */
  static readonly StartUserMarathonPath = '/api/marathon/{id}/start';

  /**
   * Стартовать марафон для текущего пользователя.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `startUserMarathon()` instead.
   *
   * This method doesn't expect any request body.
   */
  startUserMarathon$Response(params: StartUserMarathon$Params, context?: HttpContext): Observable<BaseResponse<void>> {
    return startUserMarathon(this.http, this.rootUrl, params, context);
  }

  /**
   * Стартовать марафон для текущего пользователя.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `startUserMarathon$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  startUserMarathon(params: StartUserMarathon$Params, context?: HttpContext): Observable<void> {
    return this.startUserMarathon$Response(params, context).pipe(
      map((r: BaseResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `createUserMarathon()` */
  static readonly CreateUserMarathonPath = '/api/marathon/{id}/create';

  /**
   * Создать марафон для текущего пользователя.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createUserMarathon()` instead.
   *
   * This method doesn't expect any request body.
   */
  createUserMarathon$Response(params: CreateUserMarathon$Params, context?: HttpContext): Observable<BaseResponse<void>> {
    return createUserMarathon(this.http, this.rootUrl, params, context);
  }

  /**
   * Создать марафон для текущего пользователя.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `createUserMarathon$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  createUserMarathon(params: CreateUserMarathon$Params, context?: HttpContext): Observable<void> {
    return this.createUserMarathon$Response(params, context).pipe(
      map((r: BaseResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `completeUserMarathon()` */
  static readonly CompleteUserMarathonPath = '/api/marathon/{id}/complete';

  /**
   * Завершить марафон для текущего пользователя.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `completeUserMarathon()` instead.
   *
   * This method doesn't expect any request body.
   */
  completeUserMarathon$Response(params: CompleteUserMarathon$Params, context?: HttpContext): Observable<BaseResponse<void>> {
    return completeUserMarathon(this.http, this.rootUrl, params, context);
  }

  /**
   * Завершить марафон для текущего пользователя.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `completeUserMarathon$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  completeUserMarathon(params: CompleteUserMarathon$Params, context?: HttpContext): Observable<void> {
    return this.completeUserMarathon$Response(params, context).pipe(
      map((r: BaseResponse<void>): void => r.body)
    );
  }

}
