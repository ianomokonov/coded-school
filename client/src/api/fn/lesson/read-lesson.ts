/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { BaseResponse } from '../../base-response';
import { RequestBuilder } from '../../request-builder';

import { LessonDto } from '../../models/lesson-dto';

export interface ReadLesson$Params {
  id: number;
}

export function readLesson(http: HttpClient, rootUrl: string, params: ReadLesson$Params, context?: HttpContext): Observable<BaseResponse<LessonDto>> {
  const rb = new RequestBuilder(rootUrl, readLesson.PATH, 'get');
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

readLesson.PATH = '/api/lesson/{id}';
