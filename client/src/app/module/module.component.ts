import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { UserModuleDto } from '@api/index';
import { ModuleService } from '@api/services';
import { ProgressBarModule } from 'primeng/progressbar';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';
import { AvatarModule } from 'primeng/avatar';
import { DestroyService } from '@core/destroy.service';
import { takeUntil } from 'rxjs';

@Component({
    selector: 'coded-module',
    standalone: true,
    providers: [DestroyService],
    imports: [ProgressBarModule, CardModule, RouterModule, CommonModule, AvatarModule],
    templateUrl: './module.component.html',
    styleUrl: './module.component.scss',
})
export class ModuleComponent implements OnInit {
    module: UserModuleDto | undefined;

    constructor(
        private moduleService: ModuleService,
        private activeRoute: ActivatedRoute,
        private destroy$: DestroyService,
    ) {}
    ngOnInit(): void {
        this.activeRoute.params.pipe(takeUntil(this.destroy$)).subscribe(({ id }) => {
            this.moduleService
                .readUserModule({ id })
                .pipe(takeUntil(this.destroy$))
                .subscribe((m) => {
                    this.module = m;
                });
        });
    }
}
