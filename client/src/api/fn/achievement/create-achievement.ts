/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { BaseResponse } from '../../base-response';
import { RequestBuilder } from '../../request-builder';

import { SaveAchievementDto } from '../../models/save-achievement-dto';

export interface CreateAchievement$Params {
      body: SaveAchievementDto
}

export function createAchievement(http: HttpClient, rootUrl: string, params: CreateAchievement$Params, context?: HttpContext): Observable<BaseResponse<number>> {
  const rb = new RequestBuilder(rootUrl, createAchievement.PATH, 'post');
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

createAchievement.PATH = '/api/achievement';
