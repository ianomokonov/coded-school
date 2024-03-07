import { Routes } from '@angular/router';
import { MarathonComponent } from './marathon.component';
import { MarathonSuccessComponent } from './marathon-success/marathon-success.component';
import { MarathonTimeoutComponent } from './marathon-timeout/marathon-timeout.component';

export const MARATHON_ROUTES: Routes = [
    {
        path: ':id',
        component: MarathonComponent,
    },
    {
        path: ':id/success',
        component: MarathonSuccessComponent,
    },
    {
        path: ':id/timeout',
        component: MarathonTimeoutComponent,
    },
];
