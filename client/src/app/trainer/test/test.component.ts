import { Component, OnInit } from '@angular/core';
import { TrainerTestService } from '@api/index';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { DestroyService } from '@core/destroy.service';
import { takeUntil } from 'rxjs';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { Test } from './models/test';
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'coded-test',
    standalone: true,
    templateUrl: './test.component.html',
    imports: [ButtonModule, RouterModule, CardModule, CheckboxModule, FormsModule],
    providers: [DestroyService],
    styleUrl: './test.component.scss',
})
export class TestComponent implements OnInit {
    test: Test | undefined;
    constructor(
        private testService: TrainerTestService,
        private destroy$: DestroyService,
        private activatedRoute: ActivatedRoute,
        private messageService: MessageService,
    ) {}

    ngOnInit() {
        this.activatedRoute.params.pipe(takeUntil(this.destroy$)).subscribe(({ id }) => {
            this.testService
                .getTest({ id })
                .pipe(takeUntil(this.destroy$))
                .subscribe((m) => {
                    this.test = m;
                });
        });
    }

    onCheck() {
        this.testService
            .checkTest({
                id: this.test!.id,
                body: {
                    answerIds: this.test!.questions.flatMap((q) => q.answers)
                        .filter((a) => a.isChecked)
                        .map((a) => a.id!),
                },
            })
            .pipe(takeUntil(this.destroy$))
            .subscribe((r) => {
                if (!r) {
                    this.messageService.add({
                        severity: 'error',
                        detail: 'Некоторые ответы неверные',
                    });
                }
                this.test!.isChecked = r;
            });
    }
}
