import { Routes } from '@angular/router';
import { SignInComponent } from './secure/sign-in/sign-in.component';
import { SignUpComponent } from './secure/sign-up/sign-up.component';
import { jwtGuard } from '@jwt/guard';
import { noTokenGuard } from '@core/jwt/no-token.guard';

export const APP_ROUTES: Routes = [
    {
        path: '',
        redirectTo: '/lk',
        pathMatch: 'full',
    },
    {
        path: 'sign-in',
        component: SignInComponent,
        canActivate: [noTokenGuard],
    },
    {
        path: 'sign-up',
        component: SignUpComponent,
        canActivate: [noTokenGuard],
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
        path: 'notes',
        loadChildren: () => import('./notes/notes.routes').then((m) => m.NOTES_ROUTES),
        canActivate: [jwtGuard],
    },
    {
        path: 'module',
        loadChildren: () => import('./module/module.routes').then((m) => m.MODULE_ROUTES),
        canActivate: [jwtGuard],
    },
    {
        path: 'marathon',
        loadChildren: () => import('./marathon/marathon.routes').then((m) => m.MARATHON_ROUTES),
        canActivate: [jwtGuard],
    },
    {
        path: 'topic',
        loadChildren: () => import('./topic/topic.routes').then((m) => m.TOPIC_ROUTES),
        canActivate: [jwtGuard],
    },
    {
        path: 'lesson',
        loadChildren: () => import('./topic/lesson/lesson.routes').then((m) => m.LESSON_ROUTES),
        canActivate: [jwtGuard],
    },
    {
        path: 'admin',
        loadChildren: () => import('./admin/admin.routes').then((m) => m.ADMIN_ROUTES),
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
