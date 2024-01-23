/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { JwtDto } from '../../models/jwt-dto';
import { LoginDto } from '../../models/login-dto';

export interface UserControllerLogIn$Params {
      body: LoginDto
}

export function userControllerLogIn(http: HttpClient, rootUrl: string, params: UserControllerLogIn$Params, context?: HttpContext): Observable<StrictHttpResponse<JwtDto>> {
  const rb = new RequestBuilder(rootUrl, userControllerLogIn.PATH, 'post');
  if (params) {
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<JwtDto>;
    })
  );
}

userControllerLogIn.PATH = '/api/user/sign-in';
