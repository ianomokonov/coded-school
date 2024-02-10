import { Component, Input, OnInit } from '@angular/core';
import { NoteDto } from '@api/models/note-dto';
import { NotesService } from '@api/services/notes.service';
import { DestroyService } from '@core/destroy.service';
import { takeUntil } from 'rxjs';
import { AsyncPipe, NgForOf, NgIf } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
    selector: 'coded-notes',
    standalone: true,
    imports: [NgForOf, AsyncPipe, NgIf, ButtonModule, RouterLink],
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
}
