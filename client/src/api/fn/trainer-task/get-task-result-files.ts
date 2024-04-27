/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { BaseResponse } from '../../base-response';
import { RequestBuilder } from '../../request-builder';

import { FileDto } from '../../models/file-dto';

export interface GetTaskResultFiles$Params {
  id: number;
}

export function getTaskResultFiles(http: HttpClient, rootUrl: string, params: GetTaskResultFiles$Params, context?: HttpContext): Observable<BaseResponse<Array<FileDto>>> {
  const rb = new RequestBuilder(rootUrl, getTaskResultFiles.PATH, 'get');
  if (params) {
    rb.path('id', params.id, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as BaseResponse<Array<FileDto>>;
    })
  );
}

getTaskResultFiles.PATH = '/api/task/{id}/task-result-files';
