/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { BaseResponse } from '../../base-response';
import { RequestBuilder } from '../../request-builder';

import { SaveTopicDto } from '../../models/save-topic-dto';

export interface CreateTopic$Params {
      body: SaveTopicDto
}

export function createTopic(http: HttpClient, rootUrl: string, params: CreateTopic$Params, context?: HttpContext): Observable<BaseResponse<number>> {
  const rb = new RequestBuilder(rootUrl, createTopic.PATH, 'post');
  if (params) {
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return (r as HttpResponse<any>).clone({ body: parseFloat(String((r as HttpResponse<any>).body)) }) as BaseResponse<number>;
    })
  );
}

createTopic.PATH = '/api/topic';
