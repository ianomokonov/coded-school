import { Component, Input, OnInit } from '@angular/core';
import { NoteDto } from '@api/models/note-dto';
import { NotesService } from '@api/services/notes.service';
import { takeUntil } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DestroyService } from '@core/destroy.service';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'coded-notes',
    standalone: true,
    imports: [AsyncPipe, ButtonModule, RouterLink],
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
        public readonly route: ActivatedRoute,
    ) {}

    ngOnInit(): void {
        this.notesService
            .getAllNotes({ isFavorite: this.isSidebar })
            .pipe(takeUntil(this.destroy$))
            .subscribe((notes) => {
                this.notes = notes;
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
