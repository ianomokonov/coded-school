/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { BaseResponse } from '../base-response';

import { checkTrainer } from '../fn/trainer-task/check-trainer';
import { CheckTrainer$Params } from '../fn/trainer-task/check-trainer';
import { createTrainer } from '../fn/trainer-task/create-trainer';
import { CreateTrainer$Params } from '../fn/trainer-task/create-trainer';
import { FileDto } from '../models/file-dto';
import { getTaskFiles } from '../fn/trainer-task/get-task-files';
import { GetTaskFiles$Params } from '../fn/trainer-task/get-task-files';
import { getTaskResultFiles } from '../fn/trainer-task/get-task-result-files';
import { GetTaskResultFiles$Params } from '../fn/trainer-task/get-task-result-files';
import { getTrainer } from '../fn/trainer-task/get-trainer';
import { GetTrainer$Params } from '../fn/trainer-task/get-trainer';
import { getTrainerFull } from '../fn/trainer-task/get-trainer-full';
import { GetTrainerFull$Params } from '../fn/trainer-task/get-trainer-full';
import { TaskCheckResultDto } from '../models/task-check-result-dto';
import { TaskDto } from '../models/task-dto';
import { updateTrainer } from '../fn/trainer-task/update-trainer';
import { UpdateTrainer$Params } from '../fn/trainer-task/update-trainer';

@Injectable({ providedIn: 'root' })
export class TrainerTaskService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `getTrainer()` */
  static readonly GetTrainerPath = '/api/task/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getTrainer()` instead.
   *
   * This method doesn't expect any request body.
   */
  getTrainer$Response(params: GetTrainer$Params, context?: HttpContext): Observable<BaseResponse<TaskDto>> {
    return getTrainer(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getTrainer$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getTrainer(params: GetTrainer$Params, context?: HttpContext): Observable<TaskDto> {
    return this.getTrainer$Response(params, context).pipe(
      map((r: BaseResponse<TaskDto>): TaskDto => r.body)
    );
  }

  /** Path part for operation `updateTrainer()` */
  static readonly UpdateTrainerPath = '/api/task/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateTrainer()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateTrainer$Response(params: UpdateTrainer$Params, context?: HttpContext): Observable<BaseResponse<void>> {
    return updateTrainer(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `updateTrainer$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateTrainer(params: UpdateTrainer$Params, context?: HttpContext): Observable<void> {
    return this.updateTrainer$Response(params, context).pipe(
      map((r: BaseResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `getTaskFiles()` */
  static readonly GetTaskFilesPath = '/api/task/{id}/task-files';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getTaskFiles()` instead.
   *
   * This method doesn't expect any request body.
   */
  getTaskFiles$Response(params: GetTaskFiles$Params, context?: HttpContext): Observable<BaseResponse<Array<FileDto>>> {
    return getTaskFiles(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getTaskFiles$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getTaskFiles(params: GetTaskFiles$Params, context?: HttpContext): Observable<Array<FileDto>> {
    return this.getTaskFiles$Response(params, context).pipe(
      map((r: BaseResponse<Array<FileDto>>): Array<FileDto> => r.body)
    );
  }

  /** Path part for operation `getTaskResultFiles()` */
  static readonly GetTaskResultFilesPath = '/api/task/{id}/task-result-files';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getTaskResultFiles()` instead.
   *
   * This method doesn't expect any request body.
   */
  getTaskResultFiles$Response(params: GetTaskResultFiles$Params, context?: HttpContext): Observable<BaseResponse<Array<FileDto>>> {
    return getTaskResultFiles(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getTaskResultFiles$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getTaskResultFiles(params: GetTaskResultFiles$Params, context?: HttpContext): Observable<Array<FileDto>> {
    return this.getTaskResultFiles$Response(params, context).pipe(
      map((r: BaseResponse<Array<FileDto>>): Array<FileDto> => r.body)
    );
  }

  /** Path part for operation `getTrainerFull()` */
  static readonly GetTrainerFullPath = '/api/task/{id}/full';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getTrainerFull()` instead.
   *
   * This method doesn't expect any request body.
   */
  getTrainerFull$Response(params: GetTrainerFull$Params, context?: HttpContext): Observable<BaseResponse<TaskDto>> {
    return getTrainerFull(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getTrainerFull$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getTrainerFull(params: GetTrainerFull$Params, context?: HttpContext): Observable<TaskDto> {
    return this.getTrainerFull$Response(params, context).pipe(
      map((r: BaseResponse<TaskDto>): TaskDto => r.body)
    );
  }

  /** Path part for operation `checkTrainer()` */
  static readonly CheckTrainerPath = '/api/task/{id}/check';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `checkTrainer()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  checkTrainer$Response(params: CheckTrainer$Params, context?: HttpContext): Observable<BaseResponse<TaskCheckResultDto>> {
    return checkTrainer(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `checkTrainer$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  checkTrainer(params: CheckTrainer$Params, context?: HttpContext): Observable<TaskCheckResultDto> {
    return this.checkTrainer$Response(params, context).pipe(
      map((r: BaseResponse<TaskCheckResultDto>): TaskCheckResultDto => r.body)
    );
  }

  /** Path part for operation `createTrainer()` */
  static readonly CreateTrainerPath = '/api/task';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createTrainer()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createTrainer$Response(params: CreateTrainer$Params, context?: HttpContext): Observable<BaseResponse<number>> {
    return createTrainer(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `createTrainer$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createTrainer(params: CreateTrainer$Params, context?: HttpContext): Observable<number> {
    return this.createTrainer$Response(params, context).pipe(
      map((r: BaseResponse<number>): number => r.body)
    );
  }

}
