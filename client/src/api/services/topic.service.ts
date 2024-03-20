/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { BaseResponse } from '../base-response';

import { createTopic } from '../fn/topic/create-topic';
import { CreateTopic$Params } from '../fn/topic/create-topic';
import { deleteTopic } from '../fn/topic/delete-topic';
import { DeleteTopic$Params } from '../fn/topic/delete-topic';
import { moveChild } from '../fn/topic/move-child';
import { MoveChild$Params } from '../fn/topic/move-child';
import { readTopic } from '../fn/topic/read-topic';
import { ReadTopic$Params } from '../fn/topic/read-topic';
import { TopicDto } from '../models/topic-dto';
import { updateTopic } from '../fn/topic/update-topic';
import { UpdateTopic$Params } from '../fn/topic/update-topic';

@Injectable({ providedIn: 'root' })
export class TopicService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `createTopic()` */
  static readonly CreateTopicPath = '/api/topic';

  /**
   * Создать тему.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createTopic()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createTopic$Response(params: CreateTopic$Params, context?: HttpContext): Observable<BaseResponse<number>> {
    return createTopic(this.http, this.rootUrl, params, context);
  }

  /**
   * Создать тему.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `createTopic$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createTopic(params: CreateTopic$Params, context?: HttpContext): Observable<number> {
    return this.createTopic$Response(params, context).pipe(
      map((r: BaseResponse<number>): number => r.body)
    );
  }

  /** Path part for operation `moveChild()` */
  static readonly MoveChildPath = '/api/topic/move-child';

  /**
   * Изменить сортировку тренажеров и уроков.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `moveChild()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  moveChild$Response(params: MoveChild$Params, context?: HttpContext): Observable<BaseResponse<void>> {
    return moveChild(this.http, this.rootUrl, params, context);
  }

  /**
   * Изменить сортировку тренажеров и уроков.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `moveChild$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  moveChild(params: MoveChild$Params, context?: HttpContext): Observable<void> {
    return this.moveChild$Response(params, context).pipe(
      map((r: BaseResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `readTopic()` */
  static readonly ReadTopicPath = '/api/topic/{id}';

  /**
   * Получить тему.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `readTopic()` instead.
   *
   * This method doesn't expect any request body.
   */
  readTopic$Response(params: ReadTopic$Params, context?: HttpContext): Observable<BaseResponse<TopicDto>> {
    return readTopic(this.http, this.rootUrl, params, context);
  }

  /**
   * Получить тему.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `readTopic$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  readTopic(params: ReadTopic$Params, context?: HttpContext): Observable<TopicDto> {
    return this.readTopic$Response(params, context).pipe(
      map((r: BaseResponse<TopicDto>): TopicDto => r.body)
    );
  }

  /** Path part for operation `updateTopic()` */
  static readonly UpdateTopicPath = '/api/topic/{id}';

  /**
   * Изменить тему.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateTopic()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateTopic$Response(params: UpdateTopic$Params, context?: HttpContext): Observable<BaseResponse<void>> {
    return updateTopic(this.http, this.rootUrl, params, context);
  }

  /**
   * Изменить тему.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `updateTopic$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateTopic(params: UpdateTopic$Params, context?: HttpContext): Observable<void> {
    return this.updateTopic$Response(params, context).pipe(
      map((r: BaseResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `deleteTopic()` */
  static readonly DeleteTopicPath = '/api/topic/{id}';

  /**
   * Удалить тему.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteTopic()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteTopic$Response(params: DeleteTopic$Params, context?: HttpContext): Observable<BaseResponse<void>> {
    return deleteTopic(this.http, this.rootUrl, params, context);
  }

  /**
   * Удалить тему.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `deleteTopic$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteTopic(params: DeleteTopic$Params, context?: HttpContext): Observable<void> {
    return this.deleteTopic$Response(params, context).pipe(
      map((r: BaseResponse<void>): void => r.body)
    );
  }

}
