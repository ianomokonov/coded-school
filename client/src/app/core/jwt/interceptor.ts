import {
    HttpErrorResponse,
    HttpHandlerFn,
    HttpInterceptorFn,
    HttpRequest,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { JwtService } from '@jwt/service';
import { BehaviorSubject, catchError, filter, of, switchMap, take, throwError } from 'rxjs';
import { TokenResponse } from '@jwt/model';

let isRefreshing = false;
const refreshTokenSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');

export const TokenInterceptor: HttpInterceptorFn = (req, next) => {
    const tokenService = inject(JwtService);

    if (req.url.includes('api/')) {
        let params = req;
        const token = tokenService.getToken();
        if (token) {
            params = addToken(req, token);
        }
        return next(params).pipe(
            catchError((error) => {
                if (error.status === 0) {
                    return of(error);
                }
                if (
                    error instanceof HttpErrorResponse &&
                    error.status === 401 &&
                    tokenService.getRefreshToken()
                ) {
                    return handle401Error(params, next, tokenService);
                }
                return throwError(error);
            }),
        );
    }
    return next(req);
};

const handle401Error = (
    request: HttpRequest<unknown>,
    next: HttpHandlerFn,
    tokenService: JwtService,
) => {
    const refreshToken = tokenService.getRefreshToken();
    if (!isRefreshing && refreshToken) {
        isRefreshing = true;
        refreshTokenSubject.next('');

        return tokenService.refreshToken(refreshToken).pipe(
            switchMap((tokenResponse: TokenResponse) => {
                isRefreshing = false;
                refreshTokenSubject.next(tokenResponse.refreshToken);
                return next(addToken(request, tokenResponse.token));
            }),
        );
    }
    return refreshTokenSubject.pipe(
        filter((token) => token != null),
        take(1),
        switchMap((jwt) => {
            return next(addToken(request, jwt));
        }),
    );
};

const addToken = (request: HttpRequest<unknown>, token: string) => {
    return request.clone({
        setHeaders: {
            Authorization: `Bearer ${token}`,
        },
    });
};
