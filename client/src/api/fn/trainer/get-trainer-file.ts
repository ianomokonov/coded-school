/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { BaseResponse } from '../../base-response';
import { RequestBuilder } from '../../request-builder';


export interface GetTrainerFile$Params {
  id: number;
  fileName: string;
}

export function getTrainerFile(http: HttpClient, rootUrl: string, params: GetTrainerFile$Params, context?: HttpContext): Observable<BaseResponse<{
}>> {
  const rb = new RequestBuilder(rootUrl, getTrainerFile.PATH, 'get');
  if (params) {
    rb.path('id', params.id, {});
    rb.path('fileName', params.fileName, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as BaseResponse<{
      }>;
    })
  );
}

getTrainerFile.PATH = '/trainer/{id}/{fileName}';
