import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { LessonDto, LessonService } from '@api/index';
import { EditorModule } from 'primeng/editor';
import { FileUploadService } from '@app/services/file-upload.service';
import { EditorHelper } from '@app/utils/editor-helper';

@Component({
    selector: 'coded-lesson-edit',
    standalone: true,
    imports: [EditorModule, ReactiveFormsModule, InputTextModule, ButtonModule, RouterModule],
    templateUrl: './lesson-edit.component.html',
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
    ) {
        this.form = fb.group({
            name: [null, Validators.required],
            content: [null, Validators.required],
        });
    }
    ngOnInit(): void {
        this.activeRoute.params.subscribe(({ id }) => {
            if (id === 'create') {
                this.form.patchValue({ name: null });
                this.lesson = undefined;
                return;
            }
            this.lessonService.readLesson({ id }).subscribe((m) => {
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
            this.fileUploadService.updateLesson(this.lesson.id, formData).subscribe(() => {
                if (!this.lesson) {
                    return;
                }
                this.lessonService.readLesson({ id: this.lesson.id }).subscribe((m) => {
                    this.lesson = m;
                    this.form.patchValue(m);
                });
            });
            return;
        }

        if (!this.activeRoute.snapshot.queryParams['parentId']) {
            return;
        }

        formData.append('topicId', this.activeRoute.snapshot.queryParams['parentId']);

        this.fileUploadService.createLesson(formData).subscribe((id) => {
            this.router.navigate([`../${id}`], { relativeTo: this.activeRoute });
        });
    }
}
