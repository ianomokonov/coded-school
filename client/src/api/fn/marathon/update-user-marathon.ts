/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { BaseResponse } from '../../base-response';
import { RequestBuilder } from '../../request-builder';

import { SaveMarathonDto } from '../../models/save-marathon-dto';

export interface UpdateUserMarathon$Params {
  id: number;
      body: SaveMarathonDto
}

export function updateUserMarathon(http: HttpClient, rootUrl: string, params: UpdateUserMarathon$Params, context?: HttpContext): Observable<BaseResponse<void>> {
  const rb = new RequestBuilder(rootUrl, updateUserMarathon.PATH, 'put');
  if (params) {
    rb.path('id', params.id, {});
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'text', accept: '*/*', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return (r as HttpResponse<any>).clone({ body: undefined }) as BaseResponse<void>;
    })
  );
}

updateUserMarathon.PATH = '/api/marathon/{id}';
