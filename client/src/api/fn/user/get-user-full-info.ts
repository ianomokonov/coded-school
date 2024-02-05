/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { BaseResponse } from '../../base-response';
import { RequestBuilder } from '../../request-builder';

import { UserFullInfoDto } from '../../models/user-full-info-dto';

export interface GetUserFullInfo$Params {
}

export function getUserFullInfo(http: HttpClient, rootUrl: string, params?: GetUserFullInfo$Params, context?: HttpContext): Observable<BaseResponse<UserFullInfoDto>> {
  const rb = new RequestBuilder(rootUrl, getUserFullInfo.PATH, 'get');
  if (params) {
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as BaseResponse<UserFullInfoDto>;
    })
  );
}

getUserFullInfo.PATH = '/api/user/full-info';
