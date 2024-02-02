/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { BaseResponse } from '../../base-response';
import { RequestBuilder } from '../../request-builder';

import { UpdateUserDto } from '../../models/update-user-dto';
import { UserShortDto } from '../../models/user-short-dto';

export interface PatchAuthor$Params {
      body: UpdateUserDto
}

export function patchAuthor(http: HttpClient, rootUrl: string, params: PatchAuthor$Params, context?: HttpContext): Observable<BaseResponse<UserShortDto>> {
  const rb = new RequestBuilder(rootUrl, patchAuthor.PATH, 'put');
  if (params) {
    rb.body(params.body, 'application/json');
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

patchAuthor.PATH = '/api/user';
