import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TopicDto, TopicService } from '@api/index';

@Component({
    selector: 'coded-topic-edit',
    standalone: true,
    imports: [ReactiveFormsModule, InputTextModule, ButtonModule, RouterModule],
    templateUrl: './topic-edit.component.html',
})
export class TopicEditComponent implements OnInit {
    lesson: TopicDto | undefined;
    form: FormGroup;

    constructor(
        private topicService: TopicService,
        private activeRoute: ActivatedRoute,
        private fb: FormBuilder,
        private router: Router,
    ) {
        this.form = fb.group({
            name: [null, Validators.required],
        });
    }
    ngOnInit(): void {
        this.activeRoute.params.subscribe(({ id }) => {
            if (id === 'create') {
                this.form.patchValue({ name: null });
                this.lesson = undefined;
                return;
            }
            this.topicService.readTopic({ id }).subscribe((m) => {
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

        const { name } = this.form.getRawValue();

        if (this.lesson) {
            this.topicService
                .updateTopic({
                    id: this.lesson.id,
                    body: { name },
                })
                .subscribe(() => {
                    if (!this.lesson) {
                        return;
                    }
                    this.lesson.name = name;
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
            .subscribe((id) => {
                this.router.navigate([`../${id}`], { relativeTo: this.activeRoute });
            });
    }
}
