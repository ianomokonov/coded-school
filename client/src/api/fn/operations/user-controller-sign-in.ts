/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { JwtDto } from '../../models/jwt-dto';
import { SignInDto } from '../../models/sign-in-dto';

export interface UserControllerSignIn$Params {
      body: SignInDto
}

export function userControllerSignIn(http: HttpClient, rootUrl: string, params: UserControllerSignIn$Params, context?: HttpContext): Observable<StrictHttpResponse<JwtDto>> {
  const rb = new RequestBuilder(rootUrl, userControllerSignIn.PATH, 'post');
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

userControllerSignIn.PATH = '/api/user/sign-up';
