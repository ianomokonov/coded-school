/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { BaseResponse } from '../../base-response';
import { RequestBuilder } from '../../request-builder';

import { TrainerShortDto } from '../../models/trainer-short-dto';

export interface GetAllTrainers$Params {
}

export function getAllTrainers(http: HttpClient, rootUrl: string, params?: GetAllTrainers$Params, context?: HttpContext): Observable<BaseResponse<Array<TrainerShortDto>>> {
  const rb = new RequestBuilder(rootUrl, getAllTrainers.PATH, 'get');
  if (params) {
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as BaseResponse<Array<TrainerShortDto>>;
    })
  );
}

getAllTrainers.PATH = '/api/trainer/all';
