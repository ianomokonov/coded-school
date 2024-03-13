import { Routes } from '@angular/router';
import { SignInComponent } from './secure/sign-in/sign-in.component';
import { SignUpComponent } from './secure/sign-up/sign-up.component';
import { jwtGuard } from '@jwt/guard';

export const APP_ROUTES: Routes = [
    {
        path: '',
        loadChildren: () => import('./pages/pages.routes').then((m) => m.PAGES),
        canActivate: [jwtGuard],
    },
    {
        path: 'sign-in',
        component: SignInComponent,
    },
    {
        path: 'sign-up',
        component: SignUpComponent,
    },
    {
        path: 'forgot-password/:token',
        loadComponent: () =>
            import('./secure/forgot-password/forgot-password.component').then(
                (c) => c.ForgotPasswordComponent,
            ),
    },
    {
        path: 'lk',
        loadChildren: () => import('./lk/lk.routes').then((m) => m.PERSONAL_CABINET_ROUTES),
        canActivate: [jwtGuard],
    },
    {
        path: 'error/404',
        loadComponent: () =>
            import('./secure/not-found/not-found.component').then((c) => c.NotFoundComponent),
    },
    {
        path: '**',
        redirectTo: 'error/404',
        pathMatch: 'full',
    },
];
