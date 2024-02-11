/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { BaseResponse } from '../../base-response';
import { RequestBuilder } from '../../request-builder';


export interface ForgotPassword$Params {
  email: string;
}

export function forgotPassword(http: HttpClient, rootUrl: string, params: ForgotPassword$Params, context?: HttpContext): Observable<BaseResponse<void>> {
  const rb = new RequestBuilder(rootUrl, forgotPassword.PATH, 'get');
  if (params) {
    rb.query('email', params.email, {});
  }

  return http.request(
    rb.build({ responseType: 'text', accept: '*/*', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return (r as HttpResponse<any>).clone({ body: undefined }) as BaseResponse<void>;
    })
  );
}

forgotPassword.PATH = '/api/user/forgot-password';
