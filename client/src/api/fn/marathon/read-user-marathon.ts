/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { BaseResponse } from '../../base-response';
import { RequestBuilder } from '../../request-builder';

import { MarathonDto } from '../../models/marathon-dto';

export interface ReadUserMarathon$Params {
  id: number;
}

export function readUserMarathon(http: HttpClient, rootUrl: string, params: ReadUserMarathon$Params, context?: HttpContext): Observable<BaseResponse<MarathonDto>> {
  const rb = new RequestBuilder(rootUrl, readUserMarathon.PATH, 'get');
  if (params) {
    rb.path('id', params.id, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as BaseResponse<MarathonDto>;
    })
  );
}

readUserMarathon.PATH = '/api/marathon/{id}';
