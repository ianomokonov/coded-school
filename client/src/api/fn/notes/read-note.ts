/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { BaseResponse } from '../../base-response';
import { RequestBuilder } from '../../request-builder';

import { NoteDto } from '../../models/note-dto';

export interface ReadNote$Params {
  id: number;
}

export function readNote(http: HttpClient, rootUrl: string, params: ReadNote$Params, context?: HttpContext): Observable<BaseResponse<NoteDto>> {
  const rb = new RequestBuilder(rootUrl, readNote.PATH, 'get');
  if (params) {
    rb.path('id', params.id, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as BaseResponse<NoteDto>;
    })
  );
}

readNote.PATH = '/api/note/{id}';
