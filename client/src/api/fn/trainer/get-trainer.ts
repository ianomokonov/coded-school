/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { BaseResponse } from '../../base-response';
import { RequestBuilder } from '../../request-builder';

import { TrainerDto } from '../../models/trainer-dto';

export interface GetTrainer$Params {
  id: number;
}

export function getTrainer(http: HttpClient, rootUrl: string, params: GetTrainer$Params, context?: HttpContext): Observable<BaseResponse<TrainerDto>> {
  const rb = new RequestBuilder(rootUrl, getTrainer.PATH, 'get');
  if (params) {
    rb.path('id', params.id, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as BaseResponse<TrainerDto>;
    })
  );
}

getTrainer.PATH = '/api/trainer/{id}';
