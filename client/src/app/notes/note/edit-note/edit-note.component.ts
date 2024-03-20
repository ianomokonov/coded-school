import { Component } from '@angular/core';
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
import { SaveNoteDto } from '@api/models/save-note-dto';
import { EditorModule } from 'primeng/editor';
import { markInvalidFields } from '@app/utils/mark-invalid-fileds';
import { EditorHelper } from '@app/utils/editor-helper';
import { FileUploadService } from '@app/services/file-upload.service';
import { NoteDto } from '@api/index';

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
        EditorModule,
    ],
    providers: [DestroyService],
    templateUrl: './edit-note.component.html',
    styleUrl: './edit-note.component.scss',
})
export class EditNoteComponent {
    note: NoteDto | undefined;

    noteForm: FormGroup;

    constructor(
        private notesService: NotesService,
        private fb: FormBuilder,
        private router: Router,
        private route: ActivatedRoute,
        private destroy$: DestroyService,
        private fileUploadService: FileUploadService,
    ) {
        this.route.params.pipe(takeUntil(this.destroy$)).subscribe((params) => {
            this.notesService
                .readNote({ id: params['id'] })
                .pipe(takeUntil(this.destroy$))
                .subscribe((note) => {
                    this.note = note;
                    this.noteForm.patchValue(note);
                });
        });
        this.noteForm = this.fb.group({
            name: ['', Validators.required],
            content: [''],
            moduleId: [null],
        });
    }

    sendForm(): void {
        if (this.noteForm.invalid) {
            markInvalidFields(this.noteForm);
            return;
        }

        const note: SaveNoteDto = this.noteForm.getRawValue();
        const [filesToRemove, newFiles, newContent] = EditorHelper.getFilesDelta(
            note.content!,
            (index, ext) => `${index}.${ext}`,
        );

        const formData = new FormData();
        if (this.note?.moduleId) {
            formData.append('moduleId', this.note.moduleId.toString());
        }

        formData.append('name', note.name);
        formData.append('content', newContent);
        newFiles?.forEach((f) => {
            formData.append('files', f);
        });
        filesToRemove?.forEach((f) => {
            formData.append('filesToDelete[]', f);
        });

        if (this.note) {
            this.fileUploadService
                .updateNote(this.note.id, formData)
                .pipe(takeUntil(this.destroy$))
                .subscribe(() => this.redirectToNote());
            return;
        }

        this.fileUploadService
            .createNote(formData)
            .pipe(takeUntil(this.destroy$))
            .subscribe(() => {
                this.redirectToNotes();
            });
    }

    private redirectToNotes(): void {
        this.router.navigate(['/notes']);
    }

    private redirectToNote(): void {
        this.router.navigate(['/notes', this.note?.id]);
    }
}
