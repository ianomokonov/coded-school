/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { BaseResponse } from '../base-response';

import { CommentDto } from '../models/comment-dto';
import { createComment } from '../fn/comment/create-comment';
import { CreateComment$Params } from '../fn/comment/create-comment';
import { deleteComment } from '../fn/comment/delete-comment';
import { DeleteComment$Params } from '../fn/comment/delete-comment';
import { read } from '../fn/comment/read';
import { Read$Params } from '../fn/comment/read';
import { readAllComments } from '../fn/comment/read-all-comments';
import { ReadAllComments$Params } from '../fn/comment/read-all-comments';
import { readLessonComments } from '../fn/comment/read-lesson-comments';
import { ReadLessonComments$Params } from '../fn/comment/read-lesson-comments';
import { updateComment } from '../fn/comment/update-comment';
import { UpdateComment$Params } from '../fn/comment/update-comment';

@Injectable({ providedIn: 'root' })
export class CommentService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `createComment()` */
  static readonly CreateCommentPath = '/api/comment';

  /**
   * Создать комментарий.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createComment()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createComment$Response(params: CreateComment$Params, context?: HttpContext): Observable<BaseResponse<CommentDto>> {
    return createComment(this.http, this.rootUrl, params, context);
  }

  /**
   * Создать комментарий.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `createComment$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createComment(params: CreateComment$Params, context?: HttpContext): Observable<CommentDto> {
    return this.createComment$Response(params, context).pipe(
      map((r: BaseResponse<CommentDto>): CommentDto => r.body)
    );
  }

  /** Path part for operation `read()` */
  static readonly ReadPath = '/api/comment/{id}';

  /**
   * Получить комментарий.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `read()` instead.
   *
   * This method doesn't expect any request body.
   */
  read$Response(params: Read$Params, context?: HttpContext): Observable<BaseResponse<CommentDto>> {
    return read(this.http, this.rootUrl, params, context);
  }

  /**
   * Получить комментарий.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `read$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  read(params: Read$Params, context?: HttpContext): Observable<CommentDto> {
    return this.read$Response(params, context).pipe(
      map((r: BaseResponse<CommentDto>): CommentDto => r.body)
    );
  }

  /** Path part for operation `updateComment()` */
  static readonly UpdateCommentPath = '/api/comment/{id}';

  /**
   * Изменить комментарий.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateComment()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateComment$Response(params: UpdateComment$Params, context?: HttpContext): Observable<BaseResponse<void>> {
    return updateComment(this.http, this.rootUrl, params, context);
  }

  /**
   * Изменить комментарий.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `updateComment$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateComment(params: UpdateComment$Params, context?: HttpContext): Observable<void> {
    return this.updateComment$Response(params, context).pipe(
      map((r: BaseResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `deleteComment()` */
  static readonly DeleteCommentPath = '/api/comment/{id}';

  /**
   * Удалить комментарий.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteComment()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteComment$Response(params: DeleteComment$Params, context?: HttpContext): Observable<BaseResponse<void>> {
    return deleteComment(this.http, this.rootUrl, params, context);
  }

  /**
   * Удалить комментарий.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `deleteComment$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteComment(params: DeleteComment$Params, context?: HttpContext): Observable<void> {
    return this.deleteComment$Response(params, context).pipe(
      map((r: BaseResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `readLessonComments()` */
  static readonly ReadLessonCommentsPath = '/api/comment/lesson/{id}';

  /**
   * Получить комментари урока.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `readLessonComments()` instead.
   *
   * This method doesn't expect any request body.
   */
  readLessonComments$Response(params: ReadLessonComments$Params, context?: HttpContext): Observable<BaseResponse<Array<CommentDto>>> {
    return readLessonComments(this.http, this.rootUrl, params, context);
  }

  /**
   * Получить комментари урока.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `readLessonComments$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  readLessonComments(params: ReadLessonComments$Params, context?: HttpContext): Observable<Array<CommentDto>> {
    return this.readLessonComments$Response(params, context).pipe(
      map((r: BaseResponse<Array<CommentDto>>): Array<CommentDto> => r.body)
    );
  }

  /** Path part for operation `readAllComments()` */
  static readonly ReadAllCommentsPath = '/api/comment/all';

  /**
   * Получить все комментарии.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `readAllComments()` instead.
   *
   * This method doesn't expect any request body.
   */
  readAllComments$Response(params: ReadAllComments$Params, context?: HttpContext): Observable<BaseResponse<Array<CommentDto>>> {
    return readAllComments(this.http, this.rootUrl, params, context);
  }

  /**
   * Получить все комментарии.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `readAllComments$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  readAllComments(params: ReadAllComments$Params, context?: HttpContext): Observable<Array<CommentDto>> {
    return this.readAllComments$Response(params, context).pipe(
      map((r: BaseResponse<Array<CommentDto>>): Array<CommentDto> => r.body)
    );
  }

}
