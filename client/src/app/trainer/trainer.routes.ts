import { Routes } from '@angular/router';
import { TrainerComponent } from './trainer.component';

export const TRAINER_ROUTES: Routes = [
    {
        path: ':id',
        component: TrainerComponent,
    },
];
