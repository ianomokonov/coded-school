import { Routes } from '@angular/router';

export const PAGES: Routes = [
    {
        path: '',
        redirectTo: 'editor',
        pathMatch: 'full',
    },
    {
        path: 'editor',
        loadComponent: () => import('./editor/editor.component').then((c) => c.EditorComponent),
    },
];
