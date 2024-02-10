/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { BaseResponse } from '../../base-response';
import { RequestBuilder } from '../../request-builder';

import { NoteDto } from '../../models/note-dto';

export interface GetAllNotes$Params {
  isFavorite: boolean;
}

export function getAllNotes(http: HttpClient, rootUrl: string, params: GetAllNotes$Params, context?: HttpContext): Observable<BaseResponse<Array<NoteDto>>> {
  const rb = new RequestBuilder(rootUrl, getAllNotes.PATH, 'get');
  if (params) {
    rb.query('isFavorite', params.isFavorite, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as BaseResponse<Array<NoteDto>>;
    })
  );
}

getAllNotes.PATH = '/api/note/all';
