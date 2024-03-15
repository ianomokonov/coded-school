/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { BaseResponse } from '../base-response';

import { checkTrainer } from '../fn/trainer/check-trainer';
import { CheckTrainer$Params } from '../fn/trainer/check-trainer';
import { createTrainer } from '../fn/trainer/create-trainer';
import { CreateTrainer$Params } from '../fn/trainer/create-trainer';
import { getTrainer } from '../fn/trainer/get-trainer';
import { GetTrainer$Params } from '../fn/trainer/get-trainer';
import { TrainerDto } from '../models/trainer-dto';

@Injectable({ providedIn: 'root' })
export class TrainerService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `getTrainer()` */
  static readonly GetTrainerPath = '/api/trainer/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getTrainer()` instead.
   *
   * This method doesn't expect any request body.
   */
  getTrainer$Response(params: GetTrainer$Params, context?: HttpContext): Observable<BaseResponse<TrainerDto>> {
    return getTrainer(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getTrainer$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getTrainer(params: GetTrainer$Params, context?: HttpContext): Observable<TrainerDto> {
    return this.getTrainer$Response(params, context).pipe(
      map((r: BaseResponse<TrainerDto>): TrainerDto => r.body)
    );
  }

  /** Path part for operation `checkTrainer()` */
  static readonly CheckTrainerPath = '/api/trainer/{id}/check';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `checkTrainer()` instead.
   *
   * This method doesn't expect any request body.
   */
  checkTrainer$Response(params: CheckTrainer$Params, context?: HttpContext): Observable<BaseResponse<boolean>> {
    return checkTrainer(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `checkTrainer$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  checkTrainer(params: CheckTrainer$Params, context?: HttpContext): Observable<boolean> {
    return this.checkTrainer$Response(params, context).pipe(
      map((r: BaseResponse<boolean>): boolean => r.body)
    );
  }

  /** Path part for operation `createTrainer()` */
  static readonly CreateTrainerPath = '/api/trainer';

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
