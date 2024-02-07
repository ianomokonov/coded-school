/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { BaseResponse } from '../../base-response';
import { RequestBuilder } from '../../request-builder';

import { AchievementDto } from '../../models/achievement-dto';

export interface GetAllAchievements$Params {
}

export function getAllAchievements(http: HttpClient, rootUrl: string, params?: GetAllAchievements$Params, context?: HttpContext): Observable<BaseResponse<Array<AchievementDto>>> {
  const rb = new RequestBuilder(rootUrl, getAllAchievements.PATH, 'get');
  if (params) {
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as BaseResponse<Array<AchievementDto>>;
    })
  );
}

getAllAchievements.PATH = '/api/achievement/all';
