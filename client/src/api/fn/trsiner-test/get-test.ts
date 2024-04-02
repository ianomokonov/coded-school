/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { BaseResponse } from '../../base-response';
import { RequestBuilder } from '../../request-builder';

import { TestDto } from '../../models/test-dto';

export interface GetTest$Params {
  id: number;
}

export function getTest(http: HttpClient, rootUrl: string, params: GetTest$Params, context?: HttpContext): Observable<BaseResponse<TestDto>> {
  const rb = new RequestBuilder(rootUrl, getTest.PATH, 'get');
  if (params) {
    rb.path('id', params.id, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as BaseResponse<TestDto>;
    })
  );
}

getTest.PATH = '/api/test/{id}';
