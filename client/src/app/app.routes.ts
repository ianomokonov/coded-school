import { Routes } from '@angular/router';
import { SignInComponent } from './secure/sign-in/sign-in.component';
import { SignUpComponent } from './secure/sign-up/sign-up.component';
import { jwtGuard } from '@jwt/guard';

export const APP_ROUTES: Routes = [
    {
        path: '',
        redirectTo: '/lk',
        pathMatch: 'full',
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
        path: 'lk',
        loadChildren: () => import('./lk/lk.routes').then((m) => m.PERSONAL_CABINET_ROUTES),
        canActivate: [jwtGuard],
    },
];
