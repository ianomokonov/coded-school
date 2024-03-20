/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { BaseResponse } from '../../base-response';
import { RequestBuilder } from '../../request-builder';

import { MarathonInfoDto } from '../../models/marathon-info-dto';

export interface ReadMarathonInfo$Params {
  id: number;
}

export function readMarathonInfo(http: HttpClient, rootUrl: string, params: ReadMarathonInfo$Params, context?: HttpContext): Observable<BaseResponse<MarathonInfoDto>> {
  const rb = new RequestBuilder(rootUrl, readMarathonInfo.PATH, 'get');
  if (params) {
    rb.path('id', params.id, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as BaseResponse<MarathonInfoDto>;
    })
  );
}

readMarathonInfo.PATH = '/api/marathon/{id}/info';
