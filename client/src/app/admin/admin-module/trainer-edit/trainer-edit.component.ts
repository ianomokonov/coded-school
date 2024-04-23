import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TaskDto, TrainerTaskService } from '@api/index';
import { EditorModule } from 'primeng/editor';
import { FileSelectEvent, FileUpload, FileUploadModule } from 'primeng/fileupload';
import { markInvalidFields } from '@app/utils/mark-invalid-fileds';
import { FileUploadService } from '@app/services/file-upload.service';
import { EditorHelper } from '@app/utils/editor-helper';
import { DestroyService } from '@core/destroy.service';
import { takeUntil } from 'rxjs';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { AdminModuleService } from '../admin-module.service';
import { MessageService } from 'primeng/api';

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
        InputGroupModule,
        InputGroupAddonModule,
        CheckboxModule,
        InputTextareaModule,
    ],
    providers: [DestroyService],
    templateUrl: './trainer-edit.component.html',
})
export class TrainerEditComponent implements OnInit {
    trainer: TaskDto | undefined;
    form: FormGroup;

    @ViewChild('uploader') uploader: FileUpload | undefined;

    get patterns(): FormGroup[] {
        return (this.form.get('patterns') as FormArray).controls as FormGroup[];
    }

    constructor(
        private taskService: TrainerTaskService,
        private withUploadService: FileUploadService,
        private activeRoute: ActivatedRoute,
        private fb: FormBuilder,
        private router: Router,
        private destroy$: DestroyService,
        private adminModuleService: AdminModuleService,

        private toastService: MessageService,
    ) {
        this.form = fb.group({
            name: [null, Validators.required],
            templatesDir: [null, Validators.required],
            task: [null, Validators.required],
            files: [null, Validators.required],
            resultFiles: [null, Validators.required],
            patterns: this.fb.array([]),
        });
    }
    ngOnInit(): void {
        this.activeRoute.params.pipe(takeUntil(this.destroy$)).subscribe(({ id }) => {
            this.updateTrainer(id);
        });
    }

    updateTrainer(id: number | string) {
        this.uploader?.clear();
        if (id === 'create') {
            this.form.patchValue({
                name: null,
                templatesDir: null,
                task: null,
                files: null,
                resultFiles: null,
                patterns: [],
            });
            this.form.get('files')?.setValidators(Validators.required);
            this.form.get('resultFiles')?.setValidators(Validators.required);
            this.trainer = undefined;
            return;
        }
        this.form.get('files')?.setValidators([]);
        this.form.get('resultFiles')?.setValidators([]);
        this.taskService
            .getTrainerFull({ id: id as number })
            .pipe(takeUntil(this.destroy$))
            .subscribe((m) => {
                this.trainer = m;
                this.form.patchValue({ ...m, files: null, resultFiles: null });
                this.form.setControl(
                    'patterns',
                    this.fb.array(
                        m.patterns?.map((p) =>
                            this.fb.group({
                                pattern: [p.pattern, Validators.required],
                                shouldExist: [p.shouldExist],
                                comment: [p.comment, Validators.required],
                            }),
                        ) || [],
                    ),
                );
            });
    }

    onUpload(event: FileSelectEvent, controlName: string) {
        this.form.patchValue({ [controlName]: event.currentFiles });
    }

    onAddPattern() {
        (this.form.get('patterns') as FormArray).push(
            this.fb.group({
                pattern: [null, Validators.required],
                shouldExist: [false],
                comment: [null, Validators.required],
            }),
        );
    }

    onDeletePattern(index: number) {
        (this.form.get('patterns') as FormArray).removeAt(index);
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
        if (formValue.patterns?.length) {
            formData.append('patterns', JSON.stringify(formValue.patterns));
        }

        if (this.trainer) {
            prevFiles.forEach((p) => {
                formData.append('filesToDelete[]', p);
            });
            this.withUploadService
                .updateTrainer(this.trainer.id, formData)
                .pipe(takeUntil(this.destroy$))
                .subscribe(() => {
                    this.adminModuleService.treeUpdated$.next();
                    this.updateTrainer(this.trainer!.id);
                    this.toastService.add({
                        severity: 'success',
                        detail: 'Тренажер сохранен',
                    });
                });
            return;
        }

        if (this.activeRoute.snapshot.queryParams['parentId']) {
            formData.append('topicId', this.activeRoute.snapshot.queryParams['parentId']);
        }

        this.withUploadService
            .createTrainer(formData)
            .pipe(takeUntil(this.destroy$))
            .subscribe((id) => {
                this.toastService.add({
                    severity: 'success',
                    detail: 'Тренажер сохранен',
                });
                if (this.activeRoute.snapshot.queryParams['marathonId']) {
                    this.router.navigate([
                        `/admin`,
                        'marathons',
                        this.activeRoute.snapshot.queryParams['marathonId'],
                    ]);
                    return;
                }

                this.adminModuleService.treeUpdated$.next();
                this.router.navigate([`../${id}`], { relativeTo: this.activeRoute });
            });
    }
}
