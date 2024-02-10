/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { BaseResponse } from '../../base-response';
import { RequestBuilder } from '../../request-builder';

import { SaveMarathonDto } from '../../models/save-marathon-dto';

export interface CreateUserMarathon$Params {
      body: SaveMarathonDto
}

export function createUserMarathon(http: HttpClient, rootUrl: string, params: CreateUserMarathon$Params, context?: HttpContext): Observable<BaseResponse<number>> {
  const rb = new RequestBuilder(rootUrl, createUserMarathon.PATH, 'post');
  if (params) {
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return (r as HttpResponse<any>).clone({ body: parseFloat(String((r as HttpResponse<any>).body)) }) as BaseResponse<number>;
    })
  );
}

createUserMarathon.PATH = '/api/marathon';
