/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { BaseResponse } from '../../base-response';
import { RequestBuilder } from '../../request-builder';

import { TestDto } from '../../models/test-dto';

export interface GetTestFull$Params {
  id: number;
}

export function getTestFull(http: HttpClient, rootUrl: string, params: GetTestFull$Params, context?: HttpContext): Observable<BaseResponse<TestDto>> {
  const rb = new RequestBuilder(rootUrl, getTestFull.PATH, 'get');
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

getTestFull.PATH = '/api/test/{id}/full';
