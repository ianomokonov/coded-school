/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { BaseResponse } from '../../base-response';
import { RequestBuilder } from '../../request-builder';

import { LessonDto } from '../../models/lesson-dto';

export interface ReadTopic_1$Params {
  id: number;
}

export function readTopic_1(http: HttpClient, rootUrl: string, params: ReadTopic_1$Params, context?: HttpContext): Observable<BaseResponse<LessonDto>> {
  const rb = new RequestBuilder(rootUrl, readTopic_1.PATH, 'get');
  if (params) {
    rb.path('id', params.id, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as BaseResponse<LessonDto>;
    })
  );
}

readTopic_1.PATH = '/api/lesson/{id}';
