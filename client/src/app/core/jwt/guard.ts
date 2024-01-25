import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { tap } from 'rxjs';
import { JwtService } from '@jwt/service';

export const jwtGuard: CanActivateFn = () => {
    const jwtService = inject(JwtService);
    const router = inject(Router);
    return jwtService.checkToken().pipe(
        tap((res) => {
            if (res) return true;
            router.navigate(['sign-in']);
            return false;
        }),
    );
};
