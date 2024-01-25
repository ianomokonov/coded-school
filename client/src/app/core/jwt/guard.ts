import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { SecureService } from '../../secure/secure.service';
import { tap } from 'rxjs';

export const jwtGuard: CanActivateFn = () => {
    const secureService = inject(SecureService);
    const router = inject(Router);
    return secureService.checkUserAuthStatus().pipe(
        tap((res) => {
            if (res) return true;
            router.navigate(['sign-in']);
            return false;
        }),
    );
};
