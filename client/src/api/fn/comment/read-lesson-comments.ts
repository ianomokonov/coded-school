/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { BaseResponse } from '../../base-response';
import { RequestBuilder } from '../../request-builder';

import { CommentDto } from '../../models/comment-dto';

export interface ReadLessonComments$Params {
  id: number;
}

export function readLessonComments(http: HttpClient, rootUrl: string, params: ReadLessonComments$Params, context?: HttpContext): Observable<BaseResponse<Array<CommentDto>>> {
  const rb = new RequestBuilder(rootUrl, readLessonComments.PATH, 'get');
  if (params) {
    rb.path('id', params.id, {});
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

readLessonComments.PATH = '/api/comment/{id}';