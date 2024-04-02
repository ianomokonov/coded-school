/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { BaseResponse } from '../base-response';

import { deleteTrainer } from '../fn/trainer/delete-trainer';
import { DeleteTrainer$Params } from '../fn/trainer/delete-trainer';
import { getAllTrainers } from '../fn/trainer/get-all-trainers';
import { GetAllTrainers$Params } from '../fn/trainer/get-all-trainers';
import { TrainerShortDto } from '../models/trainer-short-dto';

@Injectable({ providedIn: 'root' })
export class TrainerService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `getAllTrainers()` */
  static readonly GetAllTrainersPath = '/api/trainer/all';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllTrainers()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllTrainers$Response(params?: GetAllTrainers$Params, context?: HttpContext): Observable<BaseResponse<Array<TrainerShortDto>>> {
    return getAllTrainers(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllTrainers$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllTrainers(params?: GetAllTrainers$Params, context?: HttpContext): Observable<Array<TrainerShortDto>> {
    return this.getAllTrainers$Response(params, context).pipe(
      map((r: BaseResponse<Array<TrainerShortDto>>): Array<TrainerShortDto> => r.body)
    );
  }

  /** Path part for operation `deleteTrainer()` */
  static readonly DeleteTrainerPath = '/api/trainer/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteTrainer()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteTrainer$Response(params: DeleteTrainer$Params, context?: HttpContext): Observable<BaseResponse<void>> {
    return deleteTrainer(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `deleteTrainer$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteTrainer(params: DeleteTrainer$Params, context?: HttpContext): Observable<void> {
    return this.deleteTrainer$Response(params, context).pipe(
      map((r: BaseResponse<void>): void => r.body)
    );
  }

}
