/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { BaseResponse } from '../../base-response';
import { RequestBuilder } from '../../request-builder';

import { AchievementDto } from '../../models/achievement-dto';

export interface ReadAchievement$Params {
  id: number;
}

export function readAchievement(http: HttpClient, rootUrl: string, params: ReadAchievement$Params, context?: HttpContext): Observable<BaseResponse<AchievementDto>> {
  const rb = new RequestBuilder(rootUrl, readAchievement.PATH, 'get');
  if (params) {
    rb.path('id', params.id, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as BaseResponse<AchievementDto>;
    })
  );
}

readAchievement.PATH = '/api/achievement/{id}';
