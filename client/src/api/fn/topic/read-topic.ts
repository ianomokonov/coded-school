/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { BaseResponse } from '../../base-response';
import { RequestBuilder } from '../../request-builder';

import { TopicDto } from '../../models/topic-dto';

export interface ReadTopic$Params {
  id: number;
}

export function readTopic(http: HttpClient, rootUrl: string, params: ReadTopic$Params, context?: HttpContext): Observable<BaseResponse<TopicDto>> {
  const rb = new RequestBuilder(rootUrl, readTopic.PATH, 'get');
  if (params) {
    rb.path('id', params.id, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as BaseResponse<TopicDto>;
    })
  );
}

readTopic.PATH = '/api/topic/{id}';
