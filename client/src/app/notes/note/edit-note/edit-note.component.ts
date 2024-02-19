import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DestroyService } from '@core/destroy.service';
import { takeUntil } from 'rxjs';
import { NotesService } from '@api/services/notes.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { PaginatorModule } from 'primeng/paginator';
import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { SaveNoteDto } from '@api/models/save-note-dto';

@Component({
    selector: 'coded-edit-note',
    standalone: true,
    imports: [
        ButtonModule,
        CardModule,
        PaginatorModule,
        PasswordModule,
        ReactiveFormsModule,
        InputTextModule,
        InputTextareaModule,
    ],
    providers: [DestroyService],
    templateUrl: './edit-note.component.html',
    styleUrl: './edit-note.component.scss',
})
export class EditNoteComponent implements OnInit {
    noteId?: number;

    noteForm: FormGroup;

    constructor(
        private notesService: NotesService,
        private fb: FormBuilder,
        private router: Router,
        private route: ActivatedRoute,
        private destroy$: DestroyService,
    ) {
        this.route.params.pipe(takeUntil(this.destroy$)).subscribe((params) => {
            this.noteId = params['id'];
        });
        this.noteForm = this.fb.group({
            name: ['', Validators.required],
            content: [''],
        });
    }

    ngOnInit() {
        if (this.noteId) {
            this.notesService
                .readNote({ id: this.noteId })
                .pipe(takeUntil(this.destroy$))
                .subscribe((note) => {
                    this.noteForm.patchValue(note);
                });
        }
    }

    sendForm(): void {
        if (this.noteForm.invalid) return;
        if (this.noteId) {
            const note: SaveNoteDto = this.noteForm.getRawValue();
            this.notesService
                .updateNote({ id: this.noteId, body: note })
                .pipe(takeUntil(this.destroy$))
                .subscribe(() => this.redirectToNote());
        } else {
            const note: SaveNoteDto = this.noteForm.getRawValue();
            this.notesService
                .createNote({ body: note })
                .pipe(takeUntil(this.destroy$))
                .subscribe(() => this.redirectToNotes());
        }
    }

    private redirectToNotes(): void {
        this.router.navigate(['/notes']);
    }

    private redirectToNote(): void {
        this.router.navigate(['/notes', this.noteId]);
    }
}
