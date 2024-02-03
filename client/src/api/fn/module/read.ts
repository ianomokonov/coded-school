/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { BaseResponse } from '../../base-response';
import { RequestBuilder } from '../../request-builder';

import { ModuleDto } from '../../models/module-dto';

export interface Read$Params {
  id: number;
}

export function read(http: HttpClient, rootUrl: string, params: Read$Params, context?: HttpContext): Observable<BaseResponse<ModuleDto>> {
  const rb = new RequestBuilder(rootUrl, read.PATH, 'get');
  if (params) {
    rb.path('id', params.id, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as BaseResponse<ModuleDto>;
    })
  );
}

read.PATH = '/api/module/{id}';
