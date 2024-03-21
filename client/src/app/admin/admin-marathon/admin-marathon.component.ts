import { Component, OnInit } from '@angular/core';
import { MarathonService } from '@api/services';
import { MarathonInfoDto } from '@api/index';
import { InputTextModule } from 'primeng/inputtext';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';
import { DestroyService } from '@core/destroy.service';
import { takeUntil } from 'rxjs';

@Component({
    selector: 'coded-admin-marathon',
    standalone: true,
    providers: [DestroyService],
    imports: [InputTextModule, ReactiveFormsModule, ButtonModule, RouterModule],
    templateUrl: './admin-marathon.component.html',
})
export class AdminMarathonComponent implements OnInit {
    marathons: MarathonInfoDto[] = [];
    nameControl = new FormControl<string | null>(null, Validators.required);
    constructor(
        private marathonService: MarathonService,
        private destroy$: DestroyService,
    ) {}

    ngOnInit(): void {
        this.getMarathons();
    }

    getMarathons() {
        this.marathonService
            .getAllMarathons()
            .pipe(takeUntil(this.destroy$))
            .subscribe((marathons) => {
                this.marathons = marathons;
            });
    }

    onCreate(): void {
        if (!this.nameControl.value || this.nameControl.invalid) {
            this.nameControl.markAsDirty();
            return;
        }

        this.marathonService
            .createMarathon({
                body: { name: this.nameControl.value, difficulty: 'junior', points: 0 },
            })
            .pipe(takeUntil(this.destroy$))
            .subscribe(() => {
                this.nameControl.reset();
                this.getMarathons();
            });
    }
}
