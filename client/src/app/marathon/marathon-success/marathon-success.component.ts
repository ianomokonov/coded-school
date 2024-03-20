import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MarathonDto } from '@api/index';
import { MarathonService } from '@api/services';
import { CardModule } from 'primeng/card';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'coded-marathon-success',
    standalone: true,
    imports: [ButtonModule, CardModule, RouterModule, AvatarModule],
    templateUrl: './marathon-success.component.html',
})
export class MarathonSuccessComponent implements OnInit {
    marathon: MarathonDto | undefined;

    constructor(
        private marathonService: MarathonService,
        private activeRoute: ActivatedRoute,
    ) {}
    ngOnInit(): void {
        this.activeRoute.params.subscribe(({ id }) => {
            this.marathonService.readUserMarathon({ id }).subscribe((m) => {
                this.marathon = m;
            });
        });
    }
}
