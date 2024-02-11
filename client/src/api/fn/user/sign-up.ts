/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { BaseResponse } from '../../base-response';
import { RequestBuilder } from '../../request-builder';

import { JwtDto } from '../../models/jwt-dto';
import { SignUpDto } from '../../models/sign-up-dto';

export interface SignUp$Params {
      body: SignUpDto
}

export function signUp(http: HttpClient, rootUrl: string, params: SignUp$Params, context?: HttpContext): Observable<BaseResponse<JwtDto>> {
  const rb = new RequestBuilder(rootUrl, signUp.PATH, 'post');
  if (params) {
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as BaseResponse<JwtDto>;
    })
  );
}

signUp.PATH = '/api/user/sign-up';
