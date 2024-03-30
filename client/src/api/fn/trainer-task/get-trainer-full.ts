/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { BaseResponse } from '../../base-response';
import { RequestBuilder } from '../../request-builder';

import { TaskDto } from '../../models/task-dto';

export interface GetTrainerFull$Params {
  id: number;
}

export function getTrainerFull(http: HttpClient, rootUrl: string, params: GetTrainerFull$Params, context?: HttpContext): Observable<BaseResponse<TaskDto>> {
  const rb = new RequestBuilder(rootUrl, getTrainerFull.PATH, 'get');
  if (params) {
    rb.path('id', params.id, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as BaseResponse<TaskDto>;
    })
  );
}

getTrainerFull.PATH = '/api/task/{id}/full';
