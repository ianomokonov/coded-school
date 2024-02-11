/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { BaseResponse } from '../../base-response';
import { RequestBuilder } from '../../request-builder';

import { PassportUserDto } from '../../models/passport-user-dto';

export interface GetPassportInfo$Params {
}

export function getPassportInfo(http: HttpClient, rootUrl: string, params?: GetPassportInfo$Params, context?: HttpContext): Observable<BaseResponse<PassportUserDto>> {
  const rb = new RequestBuilder(rootUrl, getPassportInfo.PATH, 'get');
  if (params) {
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as BaseResponse<PassportUserDto>;
    })
  );
}

getPassportInfo.PATH = '/api/user/passport';
