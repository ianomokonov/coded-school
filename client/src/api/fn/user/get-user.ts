/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { BaseResponse } from '../../base-response';
import { RequestBuilder } from '../../request-builder';

import { UserShortDto } from '../../models/user-short-dto';

export interface GetUser$Params {
}

export function getUser(http: HttpClient, rootUrl: string, params?: GetUser$Params, context?: HttpContext): Observable<BaseResponse<UserShortDto>> {
  const rb = new RequestBuilder(rootUrl, getUser.PATH, 'get');
  if (params) {
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as BaseResponse<UserShortDto>;
    })
  );
}

getUser.PATH = '/api/user';
