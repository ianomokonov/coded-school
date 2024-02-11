import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { inject } from '@angular/core';
import { JwtService } from '@jwt/service';
import { JwtDto } from '@api/models/jwt-dto';

export const storeTokensInterceptor: HttpInterceptorFn = (req, next) => {
    const tokenService = inject(JwtService);

    if (req.url.includes('/sign-in') || req.url.includes('/sign-up')) {
        return next(req).pipe(
            map((event) => {
                if (
                    event instanceof HttpResponse &&
                    (event.status === 200 || event.status === 201)
                ) {
                    tokenService.storeTokens(event.body as JwtDto);
                }
                return event;
            }),
        );
    }

    if (req.url.includes('/logout')) {
        return next(req).pipe(
            map((event) => {
                if (event instanceof HttpResponse && event.status === 205) {
                    tokenService.removeTokens();
                }
                return event;
            }),
        );
    }

    return next(req);
};
