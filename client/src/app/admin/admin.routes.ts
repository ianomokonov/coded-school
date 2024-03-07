import { Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { AdminModuleComponent } from './admin-module/admin-module.component';
import { ModuleEditComponent } from './admin-module/module-edit/module-edit.component';
import { TopicEditComponent } from './admin-module/topic-edit/topic-edit.component';
import { LessonEditComponent } from './admin-module/lesson-edit/lesson-edit.component';

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
                ],
            },
        ],
    },
];
