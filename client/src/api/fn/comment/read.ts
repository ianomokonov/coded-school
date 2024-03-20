/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { BaseResponse } from '../../base-response';
import { RequestBuilder } from '../../request-builder';

import { CommentDto } from '../../models/comment-dto';

export interface Read$Params {
  id: number;
}

export function read(http: HttpClient, rootUrl: string, params: Read$Params, context?: HttpContext): Observable<BaseResponse<CommentDto>> {
  const rb = new RequestBuilder(rootUrl, read.PATH, 'get');
  if (params) {
    rb.path('id', params.id, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as BaseResponse<CommentDto>;
    })
  );
}

read.PATH = '/api/comment/{id}';
