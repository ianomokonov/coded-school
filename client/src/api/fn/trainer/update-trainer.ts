/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { BaseResponse } from '../../base-response';
import { RequestBuilder } from '../../request-builder';

import { UpdateTrainerDto } from '../../models/update-trainer-dto';

export interface UpdateTrainer$Params {
  id: number;
      body: UpdateTrainerDto
}

export function updateTrainer(http: HttpClient, rootUrl: string, params: UpdateTrainer$Params, context?: HttpContext): Observable<BaseResponse<void>> {
  const rb = new RequestBuilder(rootUrl, updateTrainer.PATH, 'post');
  if (params) {
    rb.path('id', params.id, {});
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'text', accept: '*/*', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return (r as HttpResponse<any>).clone({ body: undefined }) as BaseResponse<void>;
    })
  );
}

updateTrainer.PATH = '/api/trainer/{id}';
