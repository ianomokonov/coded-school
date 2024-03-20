/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { BaseResponse } from '../../base-response';
import { RequestBuilder } from '../../request-builder';

import { UserModuleDto } from '../../models/user-module-dto';

export interface ReadUserModule$Params {
  id: number;
}

export function readUserModule(http: HttpClient, rootUrl: string, params: ReadUserModule$Params, context?: HttpContext): Observable<BaseResponse<UserModuleDto>> {
  const rb = new RequestBuilder(rootUrl, readUserModule.PATH, 'get');
  if (params) {
    rb.path('id', params.id, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as BaseResponse<UserModuleDto>;
    })
  );
}

readUserModule.PATH = '/api/module/{id}/user';
