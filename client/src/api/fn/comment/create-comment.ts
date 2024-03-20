/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { BaseResponse } from '../../base-response';
import { RequestBuilder } from '../../request-builder';

import { CommentDto } from '../../models/comment-dto';
import { CreateCommentDto } from '../../models/create-comment-dto';

export interface CreateComment$Params {
      body: CreateCommentDto
}

export function createComment(http: HttpClient, rootUrl: string, params: CreateComment$Params, context?: HttpContext): Observable<BaseResponse<CommentDto>> {
  const rb = new RequestBuilder(rootUrl, createComment.PATH, 'post');
  if (params) {
    rb.body(params.body, 'application/json');
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

createComment.PATH = '/api/comment';
