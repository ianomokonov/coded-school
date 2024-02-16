import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { JwtService } from '@jwt/service';

export const noTokenGuard: CanActivateFn = () => {
    const jwtService = inject(JwtService);
    const router = inject(Router);
    if (!jwtService.getToken()) {
        return true;
    }
    router.navigate(['/lk'], { replaceUrl: true });
    return false;
};
