import { Routes } from '@angular/router';
import { ModuleComponent } from './module.component';

export const MODULE_ROUTES: Routes = [
    {
        path: ':id',
        component: ModuleComponent,
    },
];
