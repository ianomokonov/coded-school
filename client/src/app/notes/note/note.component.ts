import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { NoteDto } from '@api/models/note-dto';
import { NotesService } from '@api/services/notes.service';
import { DestroyService } from '@core/destroy.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Observable, takeUntil, tap } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
    selector: 'coded-note',
    standalone: true,
    imports: [ButtonModule, RouterLink, AsyncPipe],
    providers: [DestroyService],
    templateUrl: './note.component.html',
    styleUrl: './note.component.scss',
})
export class NoteComponent implements OnInit {
    note$!: Observable<NoteDto>;
    noteId!: number;
    content?: SafeHtml;

    constructor(
        private notesService: NotesService,
        private destroy$: DestroyService,
        public readonly route: ActivatedRoute,
        private dom: DomSanitizer,
    ) {
        this.route.params.pipe(takeUntil(this.destroy$)).subscribe((params) => {
            this.noteId = params['id'];
        });
    }

    ngOnInit(): void {
        this.note$ = this.notesService.readNote({ id: this.noteId }).pipe(
            tap((n) => {
                if (n.content) {
                    this.content = this.dom.bypassSecurityTrustHtml(n.content);
                }
            }),
        );
    }
}
