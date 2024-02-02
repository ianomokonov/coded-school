/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { BaseResponse } from '../../base-response';
import { RequestBuilder } from '../../request-builder';

import { JwtDto } from '../../models/jwt-dto';
import { LoginDto } from '../../models/login-dto';

export interface LogIn$Params {
      body: LoginDto
}

export function logIn(http: HttpClient, rootUrl: string, params: LogIn$Params, context?: HttpContext): Observable<BaseResponse<JwtDto>> {
  const rb = new RequestBuilder(rootUrl, logIn.PATH, 'post');
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

logIn.PATH = '/api/user/sign-in';
