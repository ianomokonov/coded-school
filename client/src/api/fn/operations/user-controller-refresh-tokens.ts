/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { JwtDto } from '../../models/jwt-dto';

export interface UserControllerRefreshTokens$Params {
}

export function userControllerRefreshTokens(http: HttpClient, rootUrl: string, params?: UserControllerRefreshTokens$Params, context?: HttpContext): Observable<StrictHttpResponse<JwtDto>> {
  const rb = new RequestBuilder(rootUrl, userControllerRefreshTokens.PATH, 'get');
  if (params) {
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

userControllerRefreshTokens.PATH = '/api/user/refresh';
