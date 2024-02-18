import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { UserModuleDto } from '@api/index';
import { ModuleService } from '@api/services';
import { ProgressBarModule } from 'primeng/progressbar';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'coded-module',
    standalone: true,
    imports: [ProgressBarModule, CardModule, RouterModule, CommonModule],
    templateUrl: './module.component.html',
    styleUrl: './module.component.scss',
})
export class ModuleComponent implements OnInit {
    module: UserModuleDto | undefined;

    constructor(
        private moduleService: ModuleService,
        private activeRoute: ActivatedRoute,
    ) {}
    ngOnInit(): void {
        this.activeRoute.params.subscribe(({ id }) => {
            this.moduleService.readUserModule({ id }).subscribe((m) => {
                this.module = m;
            });
        });
    }
}
