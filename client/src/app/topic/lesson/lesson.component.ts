import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { LessonDto, SaveNoteDto } from '@api/index';
import { LessonService, NotesService } from '@api/services';
import { CardModule } from 'primeng/card';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { CommentsComponent } from '../comments/comments.component';
import { ContextMenuModule } from 'primeng/contextmenu';
import { MenuItem } from 'primeng/api';
import { DialogModule } from 'primeng/dialog';
import { EditNoteComponent } from '@app/notes/note/edit-note/edit-note.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { takeUntil } from 'rxjs';
import { DestroyService } from '@core/destroy.service';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { EditorModule } from 'primeng/editor';
import { markInvalidFields } from '@app/utils/mark-invalid-fileds';
import { EditorHelper } from '@app/utils/editor-helper';
import { FileUploadService } from '@app/services/file-upload.service';

@Component({
    selector: 'coded-lesson',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        InputTextModule,
        InputTextareaModule,
        DialogModule,
        ContextMenuModule,
        ButtonModule,
        CardModule,
        RouterModule,
        AvatarModule,
        CommentsComponent,
        EditNoteComponent,
        EditorModule,
    ],
    providers: [DestroyService],
    templateUrl: './lesson.component.html',
})
export class LessonComponent implements OnInit {
    @ViewChild('text') text: ElementRef | undefined;
    lesson: LessonDto | undefined;
    content: SafeHtml | undefined;
    quote: string | undefined;
    showNoteModal: boolean = false;
    menuItems: MenuItem[] = [
        {
            label: 'Создать заметку',
            command: () => {
                this.noteForm.patchValue({ content: this.selection || '' });
                this.showNoteModal = true;
            },
        },
        {
            label: 'Использовать в комментарии',
            command: () => {
                this.quote = this.selection;
                document
                    .querySelector('.create-comment-form')
                    ?.scrollIntoView({ behavior: 'smooth' });
            },
        },
    ];

    noteForm: FormGroup;
    selection: string = '';

    @HostListener('document:selectionchange', ['$event']) documentSelectionEvent() {
        this.onSelectionChanged();
    }

    constructor(
        private lessonService: LessonService,
        private activeRoute: ActivatedRoute,
        private router: Router,
        private dom: DomSanitizer,
        private fb: FormBuilder,
        private notesService: NotesService,
        private destroy$: DestroyService,
        private filesUploadService: FileUploadService,
    ) {
        this.noteForm = this.fb.group({
            name: ['', Validators.required],
            content: [''],
        });
    }
    ngOnInit(): void {
        this.activeRoute.params.subscribe(({ id }) => {
            this.lessonService.readLesson({ id }).subscribe((m) => {
                this.lesson = m;
                this.content = this.dom.bypassSecurityTrustHtml(m.content);
            });
        });
    }

    onSelectionChanged(): void {
        const selection = document.getSelection();

        const cloned = document.createElement('div');

        if (selection) {
            for (let i = 0; i < selection.rangeCount; i++) {
                cloned.append(selection.getRangeAt(i).cloneContents());
            }
        }

        this.selection = cloned.innerHTML || '';
    }

    completeLesson(): void {
        if (!this.lesson) {
            return;
        }
        this.lessonService.completeLesson({ id: this.lesson?.id }).subscribe(() => {
            if (this.lesson?.nextLessonId) {
                this.router.navigate(['/lesson', this.lesson.nextLessonId]);
                return;
            }
            this.router.navigate(['/module', this.lesson?.moduleId]);
        });
    }

    sendForm(): void {
        if (this.noteForm.invalid) {
            markInvalidFields(this.noteForm);
            return;
        }
        if (!this.lesson) {
            return;
        }

        const note: SaveNoteDto = this.noteForm.getRawValue();

        const [, newFiles, newContent] = EditorHelper.getFilesDelta(
            note.content!,
            (index, ext) => `${index}.${ext}`,
        );

        const formData = new FormData();
        formData.append('moduleId', this.lesson.moduleId.toString());
        formData.append('name', note.name);
        formData.append('content', newContent);
        newFiles?.forEach((f) => {
            formData.append('files', f);
        });
        this.filesUploadService
            .createNote(formData)
            .pipe(takeUntil(this.destroy$))
            .subscribe(() => {
                this.showNoteModal = false;
            });
    }
}
