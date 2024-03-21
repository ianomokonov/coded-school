import { Component, Input, OnInit } from '@angular/core';
import { NoteDto } from '@api/models/note-dto';
import { NotesService } from '@api/services/notes.service';
import { takeUntil } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DestroyService } from '@core/destroy.service';
import { MessageService } from 'primeng/api';
import { AvatarComponent } from '@shared/components/avatar/avatar.component';
import { AvatarModule } from 'primeng/avatar';

@Component({
    selector: 'coded-notes',
    standalone: true,
    imports: [AsyncPipe, ButtonModule, RouterLink, AvatarComponent, AvatarModule],
    templateUrl: './notes.component.html',
    styleUrl: './notes.component.scss',
    providers: [DestroyService],
})
export class NotesComponent implements OnInit {
    notes: NoteDto[] = [];

    @Input()
    isSidebar: boolean = false;

    constructor(
        private notesService: NotesService,
        private messageService: MessageService,
        private destroy$: DestroyService,
        private activeRoute: ActivatedRoute,
        public readonly route: ActivatedRoute,
    ) {}

    ngOnInit(): void {
        this.activeRoute.queryParams.pipe(takeUntil(this.destroy$)).subscribe(({ moduleId }) => {
            this.notesService
                .getAllNotes({ isFavorite: this.isSidebar, moduleId })
                .pipe(takeUntil(this.destroy$))
                .subscribe((notes) => {
                    this.notes = notes;
                });
        });
    }

    changeFavoriteStatus(note: NoteDto): void {
        this.notesService
            .updateNote({ id: note.id, body: { isFavorite: !note.isFavorite } })
            .pipe(takeUntil(this.destroy$))
            .subscribe(() => {
                note.isFavorite = !note.isFavorite;
            });
    }

    deleteNote(noteId: number, index: number): void {
        this.notesService
            .deleteNote({ id: noteId })
            .pipe(takeUntil(this.destroy$))
            .subscribe(() => {
                this.notes.splice(index, 1);
                this.messageService.add({
                    severity: 'success',
                    summary: 'Заметка удалена',
                });
            });
    }
}
