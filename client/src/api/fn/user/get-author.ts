/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { BaseResponse } from '@api/base-response';
import { RequestBuilder } from '@api/request-builder';

import { UserShortDto } from '@api/models/user-short-dto';

export interface GetAuthor$Params {}

export function getAuthor(
    http: HttpClient,
    rootUrl: string,
    params?: GetAuthor$Params,
    context?: HttpContext,
): Observable<BaseResponse<UserShortDto>> {
    const rb = new RequestBuilder(rootUrl, getAuthor.PATH, 'get');
    if (params) {
    }

    return http
        .request(rb.build({ responseType: 'json', accept: 'application/json', context }))
        .pipe(
            filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
            map((r: HttpResponse<any>) => {
                return r as BaseResponse<UserShortDto>;
            }),
        );
}

getAuthor.PATH = '/api/user';
