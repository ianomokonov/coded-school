import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { JwtService } from '@jwt/service';

export const jwtGuard: CanActivateFn = () => {
    const jwtService = inject(JwtService);
    const router = inject(Router);
    if (jwtService.checkToken()) {
        return true;
    }
    router.navigate(['/sign-in']);
    return false;
};
