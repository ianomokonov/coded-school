import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { NoteDto } from '@api/models/note-dto';
import { NotesService } from '@api/services/notes.service';
import { DestroyService } from '@core/destroy.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { takeUntil } from 'rxjs';
import { NgIf } from '@angular/common';

@Component({
    selector: 'coded-note',
    standalone: true,
    imports: [ButtonModule, RouterLink, NgIf],
    providers: [DestroyService],
    templateUrl: './note.component.html',
    styleUrl: './note.component.scss',
})
export class NoteComponent implements OnInit {
    note: NoteDto | undefined;
    noteId!: number;

    constructor(
        private notesService: NotesService,
        private destroy$: DestroyService,
        public readonly route: ActivatedRoute,
    ) {
        this.route.params.pipe(takeUntil(this.destroy$)).subscribe((params) => {
            this.noteId = params['id'];
        });
    }

    ngOnInit(): void {
        this.notesService
            .readNote({ id: this.noteId })
            .pipe(takeUntil(this.destroy$))
            .subscribe((note) => {
                this.note = note;
            });
    }
}
