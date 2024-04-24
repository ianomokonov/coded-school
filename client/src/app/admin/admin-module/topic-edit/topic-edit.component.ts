import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TopicDto, TopicService } from '@api/index';
import { DestroyService } from '@core/destroy.service';
import { takeUntil } from 'rxjs';
import { AdminModuleService } from '../admin-module.service';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'coded-topic-edit',
    standalone: true,
    providers: [DestroyService],
    imports: [ReactiveFormsModule, InputTextModule, ButtonModule, RouterModule],
    templateUrl: './topic-edit.component.html',
})
export class TopicEditComponent implements OnInit {
    lesson: TopicDto | undefined;
    form: FormGroup;
    isSaving = false;

    constructor(
        private topicService: TopicService,
        private activeRoute: ActivatedRoute,
        private fb: FormBuilder,
        private router: Router,
        private destroy$: DestroyService,
        private adminModuleService: AdminModuleService,
        private toastService: MessageService,
    ) {
        this.form = fb.group({
            name: [null, Validators.required],
        });
    }
    ngOnInit(): void {
        this.activeRoute.params.pipe(takeUntil(this.destroy$)).subscribe(({ id }) => {
            if (id === 'create') {
                this.form.patchValue({ name: null });
                this.lesson = undefined;
                return;
            }
            this.topicService
                .readTopic({ id })
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
            return;
        }
        this.isSaving = true;

        const { name } = this.form.getRawValue();

        if (this.lesson) {
            this.topicService
                .updateTopic({
                    id: this.lesson.id,
                    body: { name },
                })
                .pipe(takeUntil(this.destroy$))
                .subscribe({
                    next: () => {
                        this.adminModuleService.treeUpdated$.next();
                        this.lesson!.name = name;
                        this.toastService.add({
                            severity: 'success',
                            detail: 'Тема сохранена',
                        });
                        this.isSaving = false;
                    },
                    error: () => {
                        this.isSaving = false;
                    },
                });
            return;
        }

        if (!this.activeRoute.snapshot.queryParams['parentId']) {
            return;
        }

        this.topicService
            .createTopic({
                body: { name, moduleId: this.activeRoute.snapshot.queryParams['parentId'] },
            })
            .pipe(takeUntil(this.destroy$))
            .subscribe({
                next: (id) => {
                    this.adminModuleService.treeUpdated$.next();
                    this.toastService.add({
                        severity: 'success',
                        detail: 'Тема сохранена',
                    });
                    this.router.navigate([`../${id}`], { relativeTo: this.activeRoute });
                    this.isSaving = false;
                },
                error: () => {
                    this.isSaving = false;
                },
            });
    }
}
