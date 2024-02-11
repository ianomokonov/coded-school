import { Routes } from '@angular/router';

export const NOTES_ROUTES: Routes = [
    {
        path: '',
        loadComponent: () => import('./notes.component').then((c) => c.NotesComponent),
    },
    {
        path: 'create',
        loadComponent: () =>
            import('./note/edit-note/edit-note.component').then((c) => c.EditNoteComponent),
    },
    {
        path: ':id/edit',
        loadComponent: () =>
            import('./note/edit-note/edit-note.component').then((c) => c.EditNoteComponent),
    },
    {
        path: ':id',
        loadComponent: () => import('./note/note.component').then((c) => c.NoteComponent),
    },
];
