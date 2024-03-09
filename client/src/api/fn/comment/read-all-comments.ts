/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { BaseResponse } from '../../base-response';
import { RequestBuilder } from '../../request-builder';

import { CommentDto } from '../../models/comment-dto';

export interface ReadAllComments$Params {
  skip: number;
  take: number;
}

export function readAllComments(http: HttpClient, rootUrl: string, params: ReadAllComments$Params, context?: HttpContext): Observable<BaseResponse<Array<CommentDto>>> {
  const rb = new RequestBuilder(rootUrl, readAllComments.PATH, 'get');
  if (params) {
    rb.query('skip', params.skip, {});
    rb.query('take', params.take, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as BaseResponse<Array<CommentDto>>;
    })
  );
}

readAllComments.PATH = '/api/comment/all';
