import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MarathonDto } from '@api/index';
import { MarathonService } from '@api/services';
import { CardModule } from 'primeng/card';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'coded-marathon',
    standalone: true,
    imports: [ButtonModule, CardModule, RouterModule, AvatarModule],
    templateUrl: './marathon.component.html',
    styleUrl: './marathon.component.scss',
})
export class MarathonComponent implements OnInit {
    marathon: MarathonDto | undefined;

    constructor(
        private marathonService: MarathonService,
        private activeRoute: ActivatedRoute,
        private router: Router,
    ) {}
    ngOnInit(): void {
        this.activeRoute.params.subscribe(({ id }) => {
            this.marathonService.readUserMarathon({ id }).subscribe((m) => {
                this.marathon = m;
            });
        });
    }

    /** TODO: временное решение для перехода на страницу успешного прохождения */
    onSuccess(): void {
        if (!this.marathon) {
            return;
        }
        this.marathonService.completeUserMarathon({ id: this.marathon.id }).subscribe(() => {
            this.router.navigate(['success'], { relativeTo: this.activeRoute });
        });
    }
}
