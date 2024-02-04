/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { BaseResponse } from '../../base-response';
import { RequestBuilder } from '../../request-builder';

import { ModuleDto } from '../../models/module-dto';

export interface GetAllModules$Params {
}

export function getAllModules(http: HttpClient, rootUrl: string, params?: GetAllModules$Params, context?: HttpContext): Observable<BaseResponse<Array<ModuleDto>>> {
  const rb = new RequestBuilder(rootUrl, getAllModules.PATH, 'get');
  if (params) {
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as BaseResponse<Array<ModuleDto>>;
    })
  );
}

getAllModules.PATH = '/api/module/all';
