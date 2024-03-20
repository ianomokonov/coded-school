import { Component, OnInit } from '@angular/core';
import { MarathonService } from '@api/services';
import { MarathonInfoDto } from '@api/index';
import { InputTextModule } from 'primeng/inputtext';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'coded-admin-marathon',
    standalone: true,
    imports: [InputTextModule, ReactiveFormsModule, ButtonModule, RouterModule],
    templateUrl: './admin-marathon.component.html',
})
export class AdminMarathonComponent implements OnInit {
    marathons: MarathonInfoDto[] = [];
    nameControl = new FormControl<string | null>(null, Validators.required);
    constructor(private marathonService: MarathonService) {}

    ngOnInit(): void {
        this.getMarathons();
    }

    getMarathons() {
        this.marathonService.getAllMarathons().subscribe((marathons) => {
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
            .subscribe(() => {
                this.nameControl.reset();
                this.getMarathons();
            });
    }
}
