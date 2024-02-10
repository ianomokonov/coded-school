/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { BaseResponse } from '../../base-response';
import { RequestBuilder } from '../../request-builder';


export interface IsPasswordCorrect$Params {
  password: string;
}

export function isPasswordCorrect(http: HttpClient, rootUrl: string, params: IsPasswordCorrect$Params, context?: HttpContext): Observable<BaseResponse<boolean>> {
  const rb = new RequestBuilder(rootUrl, isPasswordCorrect.PATH, 'get');
  if (params) {
    rb.query('password', params.password, {});
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

isPasswordCorrect.PATH = '/api/user/check-password';
