import { Routes } from '@angular/router';
import { SignInComponent } from './secure/sign-in/sign-in.component';
import { SignUpComponent } from './secure/sign-up/sign-up.component';
import { PersonalCabinetComponent } from './lk/lk.component';
import { jwtGuard } from '@jwt/guard';

export const routes: Routes = [
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
        component: PersonalCabinetComponent,
        canActivate: [jwtGuard],
    },
];
