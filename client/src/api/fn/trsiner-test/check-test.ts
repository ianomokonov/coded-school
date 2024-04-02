/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { BaseResponse } from '../../base-response';
import { RequestBuilder } from '../../request-builder';

import { CheckTestDto } from '../../models/check-test-dto';

export interface CheckTest$Params {
  id: number;
      body: CheckTestDto
}

export function checkTest(http: HttpClient, rootUrl: string, params: CheckTest$Params, context?: HttpContext): Observable<BaseResponse<boolean>> {
  const rb = new RequestBuilder(rootUrl, checkTest.PATH, 'post');
  if (params) {
    rb.path('id', params.id, {});
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return (r as HttpResponse<any>).clone({ body: String((r as HttpResponse<any>).body) === 'true' }) as BaseResponse<boolean>;
    })
  );
}

checkTest.PATH = '/api/test/check';
