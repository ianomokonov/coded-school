/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { BaseResponse } from '../base-response';

import { createTopic_1 } from '../fn/lesson/create-topic-1';
import { CreateTopic_1$Params } from '../fn/lesson/create-topic-1';
import { deleteTopic_1 } from '../fn/lesson/delete-topic-1';
import { DeleteTopic_1$Params } from '../fn/lesson/delete-topic-1';
import { LessonDto } from '../models/lesson-dto';
import { readTopic_1 } from '../fn/lesson/read-topic-1';
import { ReadTopic_1$Params } from '../fn/lesson/read-topic-1';
import { updateTopic_1 } from '../fn/lesson/update-topic-1';
import { UpdateTopic_1$Params } from '../fn/lesson/update-topic-1';

@Injectable({ providedIn: 'root' })
export class LessonService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `createTopic_1()` */
  static readonly CreateTopic_1Path = '/api/lesson';

  /**
   * Создать урок.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createTopic_1()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createTopic_1$Response(params: CreateTopic_1$Params, context?: HttpContext): Observable<BaseResponse<number>> {
    return createTopic_1(this.http, this.rootUrl, params, context);
  }

  /**
   * Создать урок.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `createTopic_1$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createTopic_1(params: CreateTopic_1$Params, context?: HttpContext): Observable<number> {
    return this.createTopic_1$Response(params, context).pipe(
      map((r: BaseResponse<number>): number => r.body)
    );
  }

  /** Path part for operation `readTopic_1()` */
  static readonly ReadTopic_1Path = '/api/lesson/{id}';

  /**
   * Получить урок.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `readTopic_1()` instead.
   *
   * This method doesn't expect any request body.
   */
  readTopic_1$Response(params: ReadTopic_1$Params, context?: HttpContext): Observable<BaseResponse<LessonDto>> {
    return readTopic_1(this.http, this.rootUrl, params, context);
  }

  /**
   * Получить урок.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `readTopic_1$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  readTopic_1(params: ReadTopic_1$Params, context?: HttpContext): Observable<LessonDto> {
    return this.readTopic_1$Response(params, context).pipe(
      map((r: BaseResponse<LessonDto>): LessonDto => r.body)
    );
  }

  /** Path part for operation `updateTopic_1()` */
  static readonly UpdateTopic_1Path = '/api/lesson/{id}';

  /**
   * Изменить урок.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateTopic_1()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateTopic_1$Response(params: UpdateTopic_1$Params, context?: HttpContext): Observable<BaseResponse<void>> {
    return updateTopic_1(this.http, this.rootUrl, params, context);
  }

  /**
   * Изменить урок.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `updateTopic_1$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateTopic_1(params: UpdateTopic_1$Params, context?: HttpContext): Observable<void> {
    return this.updateTopic_1$Response(params, context).pipe(
      map((r: BaseResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `deleteTopic_1()` */
  static readonly DeleteTopic_1Path = '/api/lesson/{id}';

  /**
   * Удалить урок.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteTopic_1()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteTopic_1$Response(params: DeleteTopic_1$Params, context?: HttpContext): Observable<BaseResponse<void>> {
    return deleteTopic_1(this.http, this.rootUrl, params, context);
  }

  /**
   * Удалить урок.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `deleteTopic_1$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteTopic_1(params: DeleteTopic_1$Params, context?: HttpContext): Observable<void> {
    return this.deleteTopic_1$Response(params, context).pipe(
      map((r: BaseResponse<void>): void => r.body)
    );
  }

}
