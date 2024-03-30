import { Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { AdminModuleComponent } from './admin-module/admin-module.component';
import { ModuleEditComponent } from './admin-module/module-edit/module-edit.component';
import { TopicEditComponent } from './admin-module/topic-edit/topic-edit.component';
import { LessonEditComponent } from './admin-module/lesson-edit/lesson-edit.component';
import { AdminCommentsComponent } from './admin-comments/admin-comments.component';
import { TrainerEditComponent } from './admin-module/trainer-edit/trainer-edit.component';
import { AdminMarathonComponent } from './admin-marathon/admin-marathon.component';
import { MarathonEditComponent } from './admin-marathon/marathon-edit/marathon-edit.component';
import { TestEditComponent } from './admin-module/test-edit/test-edit.component';

export const ADMIN_ROUTES: Routes = [
    {
        path: '',
        component: AdminComponent,
        children: [
            {
                path: '',
                component: AdminModuleComponent,
                children: [
                    {
                        path: 'module/:id',
                        component: ModuleEditComponent,
                    },
                    {
                        path: 'topic/:id',
                        component: TopicEditComponent,
                    },
                    {
                        path: 'lesson/:id',
                        component: LessonEditComponent,
                    },
                    {
                        path: 'trainer/:id',
                        component: TrainerEditComponent,
                    },
                    {
                        path: 'test/:id',
                        component: TestEditComponent,
                    },
                ],
            },
            { path: 'comments', component: AdminCommentsComponent },
            { path: 'marathons', component: AdminMarathonComponent },
            { path: 'marathons/:id', component: MarathonEditComponent },
        ],
    },
];
