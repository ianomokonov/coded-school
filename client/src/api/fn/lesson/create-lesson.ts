/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { BaseResponse } from '../../base-response';
import { RequestBuilder } from '../../request-builder';

import { CreateLessonDto } from '../../models/create-lesson-dto';

export interface CreateLesson$Params {
      body: CreateLessonDto
}

export function createLesson(http: HttpClient, rootUrl: string, params: CreateLesson$Params, context?: HttpContext): Observable<BaseResponse<number>> {
  const rb = new RequestBuilder(rootUrl, createLesson.PATH, 'post');
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

createLesson.PATH = '/api/lesson';
