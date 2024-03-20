import { Routes } from '@angular/router';
import { TopicComponent } from './topic.component';

export const TOPIC_ROUTES: Routes = [
    {
        path: ':id',
        component: TopicComponent,
    },
];
