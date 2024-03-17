import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { LessonDto, LessonService } from '@api/index';
import { EditorModule } from 'primeng/editor';
import { dataURItoBlob } from '@app/utils/data-to-blob';
import { FileUploadService } from '@app/services/file-upload.service';

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

        const wrapper = document.createElement('div');
        wrapper.innerHTML = content;

        const prevWrapper = document.createElement('div');
        let prevFiles: string[] = [];
        if (this.lesson) {
            prevWrapper.innerHTML = this.lesson.content;
            prevFiles = Array.from(prevWrapper.querySelectorAll('img')).map(
                (el) => el.getAttribute('src') as string,
            );
        }

        const formData = new FormData();
        wrapper.querySelectorAll('img').forEach((el, index) => {
            const src = el.getAttribute('src');
            if (!src) {
                return;
            }
            if (src?.includes('data:image')) {
                const blob = dataURItoBlob(src);
                const [, ext] = blob.type.split('/');
                formData.append('files', new File([blob], `${this.lesson?.id}_${index}.${ext}`));
                el.setAttribute('src', index.toString());
                return;
            }
            prevFiles = prevFiles?.filter((p) => p !== src);
        });

        formData.append('name', name);
        formData.append('content', wrapper.innerHTML);

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
