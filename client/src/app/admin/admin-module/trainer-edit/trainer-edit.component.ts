import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TrainerDto, TrainerService } from '@api/index';
import { EditorModule } from 'primeng/editor';
import { FileSelectEvent, FileUploadModule } from 'primeng/fileupload';
import { markInvalidFields } from '@app/utils/mark-invalid-fileds';
import { WithFileUploadService } from '@app/services/file-upload.service';

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
    lesson: TrainerDto | undefined;
    form: FormGroup;

    constructor(
        private trainerService: TrainerService,
        private withUploadService: WithFileUploadService,
        private activeRoute: ActivatedRoute,
        private fb: FormBuilder,
        private router: Router,
    ) {
        this.form = fb.group({
            name: [null, Validators.required],
            templatesDir: [null, Validators.required],
            task: [null, Validators.required],
            files: [null, Validators.required],
        });
    }
    ngOnInit(): void {
        this.activeRoute.params.subscribe(({ id }) => {
            if (id === 'create') {
                this.form.patchValue({ name: null, task: null, files: null });
                this.lesson = undefined;
                return;
            }
            this.trainerService.getTrainer({ id }).subscribe((m) => {
                this.lesson = m;
                this.form.patchValue(m);
            });
        });

        this.form.valueChanges.subscribe((v) => {
            console.log(v);
        });
    }

    onUpload(event: FileSelectEvent) {
        this.form.patchValue({ files: event.currentFiles });
    }

    onSave(): void {
        if (this.form.invalid) {
            markInvalidFields(this.form);
            return;
        }

        const formValue = this.form.getRawValue();

        if (this.lesson) {
            // this.trainerService
            //     .updateTopic({
            //         id: this.lesson.id,
            //         body: { name },
            //     })
            //     .subscribe(() => {
            //         if (!this.lesson) {
            //             return;
            //         }
            //         this.lesson.name = name;
            //     });
            return;
        }

        if (!this.activeRoute.snapshot.queryParams['parentId']) {
            return;
        }

        const formData = new FormData();

        formData.append('name', formValue.name);
        formData.append('topicId', this.activeRoute.snapshot.queryParams['parentId']);
        formData.append('task', formValue.task);
        formData.append('templatesDir', formValue.templatesDir);
        formValue.files.forEach((f: File) => {
            formData.append('files', f);
        });

        this.withUploadService.createTrainer(formData).subscribe((id) => {
            console.log(id);

            // this.router.navigate([`../${id}`], { relativeTo: this.activeRoute });
        });
    }
}
