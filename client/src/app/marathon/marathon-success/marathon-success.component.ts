import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MarathonDto } from '@api/index';
import { MarathonService } from '@api/services';
import { CardModule } from 'primeng/card';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { DestroyService } from '@core/destroy.service';
import { takeUntil } from 'rxjs';

@Component({
    selector: 'coded-marathon-success',
    standalone: true,
    providers: [DestroyService],
    imports: [ButtonModule, CardModule, RouterModule, AvatarModule],
    templateUrl: './marathon-success.component.html',
})
export class MarathonSuccessComponent implements OnInit {
    marathon: MarathonDto | undefined;

    constructor(
        private marathonService: MarathonService,
        private activeRoute: ActivatedRoute,
        private destroy$: DestroyService,
    ) {}
    ngOnInit(): void {
        this.activeRoute.params.pipe(takeUntil(this.destroy$)).subscribe(({ id }) => {
            this.marathonService
                .readUserMarathon({ id })
                .pipe(takeUntil(this.destroy$))
                .subscribe((m) => {
                    this.marathon = m;
                });
        });
    }
}
