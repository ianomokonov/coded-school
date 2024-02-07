import {
    HttpErrorResponse,
    HttpHandlerFn,
    HttpInterceptorFn,
    HttpRequest,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { JwtService } from '@jwt/service';
import { catchError, of, switchMap, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { JwtDto } from '@api/models/jwt-dto';
import { addToken } from '@jwt/const';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
    const tokenService = inject(JwtService);
    const router: Router = inject(Router);
    let params = req;

    if (req.url.includes('/refresh')) {
        const rToken = tokenService.getRefreshToken();
        if (rToken) {
            params = addToken(req, rToken);
        }
        return next(params);
    }

    if (req.url.includes('/api')) {
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
                    return handle401Error(params, next, tokenService, router);
                }
                return throwError(() => error);
            }),
        );
    }
    return next(req);
};

const handle401Error = (
    request: HttpRequest<unknown>,
    next: HttpHandlerFn,
    tokenService: JwtService,
    router: Router,
) => {
    const refreshToken = tokenService.getRefreshToken();
    if (refreshToken) {
        return tokenService.refreshToken().pipe(
            switchMap((tokenResponse: JwtDto) => {
                return next(addToken(request, tokenResponse.token));
            }),
            catchError((err) => {
                router.navigate(['/sign-in']);
                tokenService.removeTokens();
                return throwError(() => err);
            }),
        );
    }
    router.navigate(['/sign-in']);
    return next(request);
};
