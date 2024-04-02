import { Routes } from '@angular/router';
import { TrainerComponent } from './task/trainer.component';
import { TestComponent } from './test/test.component';

export const TRAINER_ROUTES: Routes = [
    {
        path: ':id/trainer',
        component: TrainerComponent,
    },
    {
        path: ':id/test',
        component: TestComponent,
    },
];
