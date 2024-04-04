/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { BaseResponse } from '../../base-response';
import { RequestBuilder } from '../../request-builder';

import { CheckTaskDto } from '../../models/check-task-dto';
import { TaskCheckResultDto } from '../../models/task-check-result-dto';

export interface CheckTrainer$Params {
  id: number;
      body: CheckTaskDto
}

export function checkTrainer(http: HttpClient, rootUrl: string, params: CheckTrainer$Params, context?: HttpContext): Observable<BaseResponse<TaskCheckResultDto>> {
  const rb = new RequestBuilder(rootUrl, checkTrainer.PATH, 'post');
  if (params) {
    rb.path('id', params.id, {});
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as BaseResponse<TaskCheckResultDto>;
    })
  );
}

checkTrainer.PATH = '/api/task/{id}/check';
