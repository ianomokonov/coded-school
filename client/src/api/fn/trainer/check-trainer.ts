/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { BaseResponse } from '../../base-response';
import { RequestBuilder } from '../../request-builder';


export interface CheckTrainer$Params {
  id: number;
}

export function checkTrainer(http: HttpClient, rootUrl: string, params: CheckTrainer$Params, context?: HttpContext): Observable<BaseResponse<boolean>> {
  const rb = new RequestBuilder(rootUrl, checkTrainer.PATH, 'get');
  if (params) {
    rb.path('id', params.id, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return (r as HttpResponse<any>).clone({ body: String((r as HttpResponse<any>).body) === 'true' }) as BaseResponse<boolean>;
    })
  );
}

checkTrainer.PATH = '/api/trainer/{id}/check';
