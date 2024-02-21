import { Routes } from '@angular/router';
import { PersonalCabinetComponent } from './lk.component';

export const PERSONAL_CABINET_ROUTES: Routes = [
    {
        path: '',
        component: PersonalCabinetComponent,
    },
    {
        path: 'passport',
        loadComponent: () =>
            import('./passport/passport.component').then((c) => c.PassportComponent),
    },
];
