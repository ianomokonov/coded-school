import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { LessonDto, LessonService } from '@api/index';
import { EditorModule } from 'primeng/editor';
import { FileUploadService } from '@app/services/file-upload.service';
import { EditorHelper } from '@app/utils/editor-helper';
import { DestroyService } from '@core/destroy.service';
import { takeUntil } from 'rxjs';
import { AdminModuleService } from '../admin-module.service';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'coded-lesson-edit',
    standalone: true,
    providers: [DestroyService],
    imports: [EditorModule, ReactiveFormsModule, InputTextModule, ButtonModule, RouterModule],
    templateUrl: './lesson-edit.component.html',
    styles: `
        .editor {
            max-height: calc(100% - 130px);
        }

        ::ng-deep {
            .p-editor-container {
                height: 100%;
            }
        }
    `,
})
export class LessonEditComponent implements OnInit {
    lesson: LessonDto | undefined;
    form: FormGroup;

    constructor(
        private lessonService: LessonService,
        private activeRoute: ActivatedRoute,
        private fb: FormBuilder,
        private router: Router,
        private fileUploadService: FileUploadService,
        private destroy$: DestroyService,
        private adminModuleService: AdminModuleService,
        private toastService: MessageService,
    ) {
        this.form = fb.group({
            name: [null, Validators.required],
            content: [null, Validators.required],
        });
    }
    ngOnInit(): void {
        this.activeRoute.params.pipe(takeUntil(this.destroy$)).subscribe(({ id }) => {
            if (id === 'create') {
                this.form.reset();
                this.lesson = undefined;
                return;
            }
            this.lessonService
                .readLesson({ id })
                .pipe(takeUntil(this.destroy$))
                .subscribe((m) => {
                    this.lesson = m;
                    this.form.patchValue(m);
                });
        });
    }

    onSave(): void {
        if (this.form.invalid) {
            this.form.get('name')?.markAsDirty();
            this.form.get('content')?.markAsDirty();
            return;
        }

        const { name, content } = this.form.getRawValue();

        const [prevFiles, newFiles, newContent] = EditorHelper.getFilesDelta(
            content,
            (index, ext) => `${this.lesson?.id}_${index}.${ext}`,
            this.lesson?.content,
        );

        const formData = new FormData();
        formData.append('name', name);
        formData.append('content', newContent);
        newFiles.forEach((f) => {
            formData.append('files', f);
        });

        if (this.lesson) {
            prevFiles.forEach((p) => {
                formData.append('filesToDelete[]', p);
            });
            this.fileUploadService
                .updateLesson(this.lesson.id, formData)
                .pipe(takeUntil(this.destroy$))
                .subscribe(() => {
                    this.adminModuleService.treeUpdated$.next();
                    this.lessonService
                        .readLesson({ id: this.lesson!.id })
                        .pipe(takeUntil(this.destroy$))
                        .subscribe((m) => {
                            this.lesson = m;
                            this.form.patchValue(m);
                            this.toastService.add({
                                severity: 'success',
                                detail: 'Урок сохранен',
                            });
                        });
                });
            return;
        }

        if (!this.activeRoute.snapshot.queryParams['parentId']) {
            return;
        }

        formData.append('topicId', this.activeRoute.snapshot.queryParams['parentId']);

        this.fileUploadService
            .createLesson(formData)
            .pipe(takeUntil(this.destroy$))
            .subscribe((id) => {
                this.adminModuleService.treeUpdated$.next();
                this.toastService.add({
                    severity: 'success',
                    detail: 'Урок сохранен',
                });
                this.router.navigate([`../${id}`], { relativeTo: this.activeRoute });
            });
    }
}
