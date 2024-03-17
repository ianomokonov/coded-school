/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { BaseResponse } from '../../base-response';
import { RequestBuilder } from '../../request-builder';

import { MoveTopicChildDto } from '../../models/move-topic-child-dto';

export interface MoveChild$Params {
      body: MoveTopicChildDto
}

export function moveChild(http: HttpClient, rootUrl: string, params: MoveChild$Params, context?: HttpContext): Observable<BaseResponse<void>> {
  const rb = new RequestBuilder(rootUrl, moveChild.PATH, 'put');
  if (params) {
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

moveChild.PATH = '/api/topic/move-child';
