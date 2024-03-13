/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { BaseResponse } from '../../base-response';
import { RequestBuilder } from '../../request-builder';

import { FilesTreeDto } from '../../models/files-tree-dto';

export interface GetFiles$Params {
  dir: string;
}

export function getFiles(http: HttpClient, rootUrl: string, params: GetFiles$Params, context?: HttpContext): Observable<BaseResponse<Array<FilesTreeDto>>> {
  const rb = new RequestBuilder(rootUrl, getFiles.PATH, 'get');
  if (params) {
    rb.query('dir', params.dir, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as BaseResponse<Array<FilesTreeDto>>;
    })
  );
}

getFiles.PATH = '/api/trainer';
