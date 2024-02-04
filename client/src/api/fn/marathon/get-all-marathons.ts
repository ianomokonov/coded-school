/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { BaseResponse } from '../../base-response';
import { RequestBuilder } from '../../request-builder';

import { MarathonDto } from '../../models/marathon-dto';

export interface GetAllMarathons$Params {
}

export function getAllMarathons(http: HttpClient, rootUrl: string, params?: GetAllMarathons$Params, context?: HttpContext): Observable<BaseResponse<Array<MarathonDto>>> {
  const rb = new RequestBuilder(rootUrl, getAllMarathons.PATH, 'get');
  if (params) {
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as BaseResponse<Array<MarathonDto>>;
    })
  );
}

getAllMarathons.PATH = '/api/marathon/all';
