import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TestDto, TrainerTestService } from '@api/index';
import { markInvalidFields } from '@app/utils/mark-invalid-fileds';
import { DestroyService } from '@core/destroy.service';
import { takeUntil } from 'rxjs';
import { CheckboxModule } from 'primeng/checkbox';

@Component({
    selector: 'coded-test-edit',
    standalone: true,
    imports: [ReactiveFormsModule, InputTextModule, ButtonModule, RouterModule, CheckboxModule],
    providers: [DestroyService],
    templateUrl: './test-edit.component.html',
})
export class TestEditComponent implements OnInit {
    test: TestDto | undefined;
    form: FormGroup;

    constructor(
        private testService: TrainerTestService,
        private activeRoute: ActivatedRoute,
        private fb: FormBuilder,
        private router: Router,
        private destroy$: DestroyService,
    ) {
        this.form = fb.group({
            name: [null, Validators.required],
            questions: fb.array([]),
        });
    }
    ngOnInit(): void {
        this.activeRoute.params.pipe(takeUntil(this.destroy$)).subscribe(({ id }) => {
            if (id === 'create') {
                this.form.reset();
                this.test = undefined;
                return;
            }
            this.testService
                .getTestFull({ id })
                .pipe(takeUntil(this.destroy$))
                .subscribe((m) => {
                    this.test = m;
                    this.form.patchValue({ name: m.name });

                    const questionsArr = m.questions.map((q) => {
                        return this.fb.group({
                            id: q.id,
                            question: [q.question, Validators.required],
                            answers: this.fb.array(
                                q.answers.map((answer) =>
                                    this.fb.group({
                                        label: [answer.label, Validators.required],
                                        isCorrect: [answer.isCorrect],
                                    }),
                                ),
                            ),
                        });
                    });

                    this.form.setControl('questions', this.fb.array(questionsArr));
                });
        });
    }

    getQuestionControls() {
        return (this.form.get('questions') as FormArray).controls as FormGroup[];
    }

    getAnswerControls(question: FormGroup) {
        return (question.get('answers') as FormArray).controls as FormGroup[];
    }

    addQuestion() {
        (this.form.get('questions') as FormArray).push(
            this.fb.group({
                question: [null, Validators.required],
                answers: this.fb.array([]),
            }),
        );
    }

    addAddAnswer(questionForm: FormGroup) {
        (questionForm.get('answers') as FormArray).push(
            this.fb.group({
                label: [null, Validators.required],
                isCorrect: [false],
            }),
        );
    }

    onSave(): void {
        if (this.form.invalid) {
            markInvalidFields(this.form);
            return;
        }

        const formValue = this.form.getRawValue();

        if (this.test) {
            this.testService
                .updateTest({ id: this.test.id, body: formValue })
                .pipe(takeUntil(this.destroy$))
                .subscribe(() => {});
            return;
        }

        if (this.activeRoute.snapshot.queryParams['parentId']) {
            formValue.topicId = this.activeRoute.snapshot.queryParams['parentId'];
        }

        console.log(formValue);

        this.testService
            .createTest({ body: formValue })
            .pipe(takeUntil(this.destroy$))
            .subscribe((id) => {
                this.router.navigate([`../${id}`], { relativeTo: this.activeRoute });
            });
    }
}
