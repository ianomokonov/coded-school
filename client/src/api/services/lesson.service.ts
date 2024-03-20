/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { BaseResponse } from '../base-response';

import { completeLesson } from '../fn/lesson/complete-lesson';
import { CompleteLesson$Params } from '../fn/lesson/complete-lesson';
import { createLesson } from '../fn/lesson/create-lesson';
import { CreateLesson$Params } from '../fn/lesson/create-lesson';
import { deleteLesson } from '../fn/lesson/delete-lesson';
import { DeleteLesson$Params } from '../fn/lesson/delete-lesson';
import { LessonDto } from '../models/lesson-dto';
import { readLesson } from '../fn/lesson/read-lesson';
import { ReadLesson$Params } from '../fn/lesson/read-lesson';
import { updateLesson } from '../fn/lesson/update-lesson';
import { UpdateLesson$Params } from '../fn/lesson/update-lesson';

@Injectable({ providedIn: 'root' })
export class LessonService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `createLesson()` */
  static readonly CreateLessonPath = '/api/lesson';

  /**
   * Создать урок.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createLesson()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createLesson$Response(params: CreateLesson$Params, context?: HttpContext): Observable<BaseResponse<number>> {
    return createLesson(this.http, this.rootUrl, params, context);
  }

  /**
   * Создать урок.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `createLesson$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createLesson(params: CreateLesson$Params, context?: HttpContext): Observable<number> {
    return this.createLesson$Response(params, context).pipe(
      map((r: BaseResponse<number>): number => r.body)
    );
  }

  /** Path part for operation `readLesson()` */
  static readonly ReadLessonPath = '/api/lesson/{id}';

  /**
   * Получить урок.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `readLesson()` instead.
   *
   * This method doesn't expect any request body.
   */
  readLesson$Response(params: ReadLesson$Params, context?: HttpContext): Observable<BaseResponse<LessonDto>> {
    return readLesson(this.http, this.rootUrl, params, context);
  }

  /**
   * Получить урок.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `readLesson$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  readLesson(params: ReadLesson$Params, context?: HttpContext): Observable<LessonDto> {
    return this.readLesson$Response(params, context).pipe(
      map((r: BaseResponse<LessonDto>): LessonDto => r.body)
    );
  }

  /** Path part for operation `updateLesson()` */
  static readonly UpdateLessonPath = '/api/lesson/{id}';

  /**
   * Изменить урок.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateLesson()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateLesson$Response(params: UpdateLesson$Params, context?: HttpContext): Observable<BaseResponse<void>> {
    return updateLesson(this.http, this.rootUrl, params, context);
  }

  /**
   * Изменить урок.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `updateLesson$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateLesson(params: UpdateLesson$Params, context?: HttpContext): Observable<void> {
    return this.updateLesson$Response(params, context).pipe(
      map((r: BaseResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `deleteLesson()` */
  static readonly DeleteLessonPath = '/api/lesson/{id}';

  /**
   * Удалить урок.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteLesson()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteLesson$Response(params: DeleteLesson$Params, context?: HttpContext): Observable<BaseResponse<void>> {
    return deleteLesson(this.http, this.rootUrl, params, context);
  }

  /**
   * Удалить урок.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `deleteLesson$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteLesson(params: DeleteLesson$Params, context?: HttpContext): Observable<void> {
    return this.deleteLesson$Response(params, context).pipe(
      map((r: BaseResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `completeLesson()` */
  static readonly CompleteLessonPath = '/api/lesson/{id}/complete';

  /**
   * Завершить урок.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `completeLesson()` instead.
   *
   * This method doesn't expect any request body.
   */
  completeLesson$Response(params: CompleteLesson$Params, context?: HttpContext): Observable<BaseResponse<void>> {
    return completeLesson(this.http, this.rootUrl, params, context);
  }

  /**
   * Завершить урок.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `completeLesson$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  completeLesson(params: CompleteLesson$Params, context?: HttpContext): Observable<void> {
    return this.completeLesson$Response(params, context).pipe(
      map((r: BaseResponse<void>): void => r.body)
    );
  }

}
