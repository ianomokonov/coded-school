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
import { create_1 } from '../fn/marathon/create-1';
import { Create_1$Params } from '../fn/marathon/create-1';
import { delete_1 } from '../fn/marathon/delete-1';
import { Delete_1$Params } from '../fn/marathon/delete-1';
import { getAllMarathons } from '../fn/marathon/get-all-marathons';
import { GetAllMarathons$Params } from '../fn/marathon/get-all-marathons';
import { MarathonDto } from '../models/marathon-dto';
import { read_1 } from '../fn/marathon/read-1';
import { Read_1$Params } from '../fn/marathon/read-1';
import { startUserMarathon } from '../fn/marathon/start-user-marathon';
import { StartUserMarathon$Params } from '../fn/marathon/start-user-marathon';
import { update_1 } from '../fn/marathon/update-1';
import { Update_1$Params } from '../fn/marathon/update-1';

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
  getAllMarathons$Response(params?: GetAllMarathons$Params, context?: HttpContext): Observable<BaseResponse<Array<MarathonDto>>> {
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
  getAllMarathons(params?: GetAllMarathons$Params, context?: HttpContext): Observable<Array<MarathonDto>> {
    return this.getAllMarathons$Response(params, context).pipe(
      map((r: BaseResponse<Array<MarathonDto>>): Array<MarathonDto> => r.body)
    );
  }

  /** Path part for operation `create_1()` */
  static readonly Create_1Path = '/api/marathon';

  /**
   * Создать марафон.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `create_1()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  create_1$Response(params: Create_1$Params, context?: HttpContext): Observable<BaseResponse<number>> {
    return create_1(this.http, this.rootUrl, params, context);
  }

  /**
   * Создать марафон.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `create_1$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  create_1(params: Create_1$Params, context?: HttpContext): Observable<number> {
    return this.create_1$Response(params, context).pipe(
      map((r: BaseResponse<number>): number => r.body)
    );
  }

  /** Path part for operation `read_1()` */
  static readonly Read_1Path = '/api/marathon/{id}';

  /**
   * Получить марафон.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `read_1()` instead.
   *
   * This method doesn't expect any request body.
   */
  read_1$Response(params: Read_1$Params, context?: HttpContext): Observable<BaseResponse<MarathonDto>> {
    return read_1(this.http, this.rootUrl, params, context);
  }

  /**
   * Получить марафон.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `read_1$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  read_1(params: Read_1$Params, context?: HttpContext): Observable<MarathonDto> {
    return this.read_1$Response(params, context).pipe(
      map((r: BaseResponse<MarathonDto>): MarathonDto => r.body)
    );
  }

  /** Path part for operation `update_1()` */
  static readonly Update_1Path = '/api/marathon/{id}';

  /**
   * Изменить марафон.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `update_1()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update_1$Response(params: Update_1$Params, context?: HttpContext): Observable<BaseResponse<void>> {
    return update_1(this.http, this.rootUrl, params, context);
  }

  /**
   * Изменить марафон.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `update_1$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update_1(params: Update_1$Params, context?: HttpContext): Observable<void> {
    return this.update_1$Response(params, context).pipe(
      map((r: BaseResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `delete_1()` */
  static readonly Delete_1Path = '/api/marathon/{id}';

  /**
   * Удалить марафон.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `delete_1()` instead.
   *
   * This method doesn't expect any request body.
   */
  delete_1$Response(params: Delete_1$Params, context?: HttpContext): Observable<BaseResponse<void>> {
    return delete_1(this.http, this.rootUrl, params, context);
  }

  /**
   * Удалить марафон.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `delete_1$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  delete_1(params: Delete_1$Params, context?: HttpContext): Observable<void> {
    return this.delete_1$Response(params, context).pipe(
      map((r: BaseResponse<void>): void => r.body)
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
