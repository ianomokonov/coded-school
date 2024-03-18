import { Component, OnInit } from '@angular/core';
import { MarathonService, TrainerService } from '@api/services';
import { InputTextModule } from 'primeng/inputtext';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { PickListModule } from 'primeng/picklist';
import { MarathonInfoDto, TrainerShortDto } from '@api/index';
import { forkJoin } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { InputNumberModule } from 'primeng/inputnumber';
import { DropdownModule } from 'primeng/dropdown';

@Component({
    selector: 'coded-marathon-edit',
    standalone: true,
    imports: [
        InputTextModule,
        ReactiveFormsModule,
        ButtonModule,
        PickListModule,
        InputNumberModule,
        DropdownModule,
    ],
    templateUrl: './marathon-edit.component.html',
    styleUrl: './marathon-edit.component.scss',
})
export class MarathonEditComponent implements OnInit {
    targetItems: TrainerShortDto[] = [];
    sourceItems: TrainerShortDto[] = [];
    marathon: MarathonInfoDto | undefined;
    marathonForm: FormGroup;
    difficulties = [
        {
            name: 'junior',
            id: 'junior',
        },
        {
            name: 'middle',
            id: 'middle',
        },
        {
            name: 'senior',
            id: 'senior',
        },
    ];
    constructor(
        private trainerService: TrainerService,
        private marathonService: MarathonService,
        private activatedRoute: ActivatedRoute,
        private fb: FormBuilder,
    ) {
        this.marathonForm = this.fb.group({
            name: [null, Validators.required],
            difficulty: [null, Validators.required],
            points: [null, Validators.required],
        });
    }

    ngOnInit(): void {
        this.activatedRoute.params.subscribe(({ id }) => {
            if (!id) {
                return;
            }
            this.initData(id);
        });
    }

    initData(id: number) {
        forkJoin([
            this.trainerService.getAllTrainers(),
            this.marathonService.readMarathonInfo({ id }),
        ]).subscribe(([trainers, marathon]) => {
            this.marathon = marathon;
            this.marathonForm.patchValue(marathon);
            this.sourceItems = trainers.filter(
                (t) => !marathon.trainers?.find((tt) => t.id === tt.id),
            );
            this.targetItems = marathon.trainers || [];
        });
    }

    onSave() {
        const formValue = this.marathonForm.getRawValue();

        this.marathonService
            .updateUserMarathon({
                id: this.marathon!.id,
                body: {
                    ...formValue,
                    trainers: this.targetItems,
                },
            })
            .subscribe(() => {
                this.initData(this.marathon!.id);
            });
    }
}
