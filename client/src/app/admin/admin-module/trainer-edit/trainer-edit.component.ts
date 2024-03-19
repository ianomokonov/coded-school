import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TrainerDto, TrainerService } from '@api/index';
import { EditorModule } from 'primeng/editor';
import { FileSelectEvent, FileUpload, FileUploadModule } from 'primeng/fileupload';
import { markInvalidFields } from '@app/utils/mark-invalid-fileds';
import { FileUploadService } from '@app/services/file-upload.service';
import { EditorHelper } from '@app/utils/editor-helper';

@Component({
    selector: 'coded-trainer-edit',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        EditorModule,
        InputTextModule,
        ButtonModule,
        RouterModule,
        FileUploadModule,
    ],
    templateUrl: './trainer-edit.component.html',
})
export class TrainerEditComponent implements OnInit {
    trainer: TrainerDto | undefined;
    form: FormGroup;

    @ViewChild('uploader') uploader: FileUpload | undefined;

    constructor(
        private trainerService: TrainerService,
        private withUploadService: FileUploadService,
        private activeRoute: ActivatedRoute,
        private fb: FormBuilder,
        private router: Router,
    ) {
        this.form = fb.group({
            name: [null, Validators.required],
            templatesDir: [null, Validators.required],
            task: [null, Validators.required],
            files: [null, Validators.required],
            resultFiles: [null, Validators.required],
        });
    }
    ngOnInit(): void {
        this.activeRoute.params.subscribe(({ id }) => {
            this.uploader?.clear();
            if (id === 'create') {
                this.form.patchValue({
                    name: null,
                    templatesDir: null,
                    task: null,
                    files: null,
                    resultFiles: null,
                });
                this.form.get('files')?.setValidators(Validators.required);
                this.form.get('resultFiles')?.setValidators(Validators.required);
                this.trainer = undefined;
                return;
            }
            this.form.get('files')?.setValidators([]);
            this.form.get('resultFiles')?.setValidators([]);
            this.trainerService.getTrainerFull({ id }).subscribe((m) => {
                this.trainer = m;
                this.form.patchValue({ ...m, files: null, resultFiles: null });
            });
        });
    }

    onUpload(event: FileSelectEvent, controlName: string) {
        this.form.patchValue({ [controlName]: event.currentFiles });
    }

    onSave(): void {
        if (this.form.invalid) {
            markInvalidFields(this.form);
            return;
        }

        const formValue = this.form.getRawValue();

        const [prevFiles, newFiles, newContent] = EditorHelper.getFilesDelta(
            formValue.task,
            (index, ext) => `${this.trainer?.id}_${index}.${ext}`,
            this.trainer?.task,
        );
        const formData = new FormData();
        newFiles.forEach((f) => {
            formData.append('contentFiles', f);
        });

        formData.append('name', formValue.name);
        formData.append('task', newContent);
        formData.append('templatesDir', formValue.templatesDir);
        if (formValue.files?.length) {
            formValue.files.forEach((f: File) => {
                formData.append('files', f);
            });
        }
        if (formValue.resultFiles?.length) {
            formValue.resultFiles.forEach((f: File) => {
                formData.append('resultFiles', f);
            });
        }

        if (this.trainer) {
            prevFiles.forEach((p) => {
                formData.append('filesToDelete[]', p);
            });
            this.withUploadService.updateTrainer(this.trainer.id, formData).subscribe(() => {});
            return;
        }

        if (this.activeRoute.snapshot.queryParams['parentId']) {
            formData.append('topicId', this.activeRoute.snapshot.queryParams['parentId']);
        }

        this.withUploadService.createTrainer(formData).subscribe((id) => {
            if (this.activeRoute.snapshot.queryParams['marathonId']) {
                this.router.navigate([
                    `/admin`,
                    'marathons',
                    this.activeRoute.snapshot.queryParams['marathonId'],
                ]);
                return;
            }
            this.router.navigate([`../${id}`], { relativeTo: this.activeRoute });
        });
    }
}
