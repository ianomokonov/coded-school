import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ModuleDto, ModuleService } from '@api/index';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DestroyService } from '@core/destroy.service';
import { takeUntil } from 'rxjs';
import { AdminModuleService } from '../admin-module.service';

@Component({
    selector: 'coded-module-edit',
    standalone: true,
    providers: [DestroyService],
    imports: [ReactiveFormsModule, InputTextModule, ButtonModule, RouterModule],
    templateUrl: './module-edit.component.html',
})
export class ModuleEditComponent implements OnInit {
    module: ModuleDto | undefined;
    form: FormGroup;

    constructor(
        private moduleService: ModuleService,
        private activeRoute: ActivatedRoute,
        private fb: FormBuilder,
        private router: Router,
        private destroy$: DestroyService,
        private adminModuleService: AdminModuleService,
    ) {
        this.form = fb.group({
            name: [null, Validators.required],
        });
    }
    ngOnInit(): void {
        this.activeRoute.params.pipe(takeUntil(this.destroy$)).subscribe(({ id }) => {
            if (id === 'create') {
                this.form.patchValue({ name: null });
                this.module = undefined;
                return;
            }
            this.moduleService
                .readModule({ id })
                .pipe(takeUntil(this.destroy$))
                .subscribe((m) => {
                    this.module = m;
                    this.form.patchValue(m);
                });
        });
    }

    onSave(): void {
        if (this.form.invalid) {
            this.form.get('name')?.markAsDirty();
            return;
        }

        const { name } = this.form.getRawValue();

        if (this.module) {
            this.moduleService
                .updateUserModule({
                    id: this.module.id,
                    body: { name },
                })
                .pipe(takeUntil(this.destroy$))
                .subscribe(() => {
                    this.adminModuleService.treeUpdated$.next();
                    if (!this.module) {
                        return;
                    }
                    this.module.name = name;
                });
            return;
        }

        this.moduleService
            .createUserModule({ body: { name } })
            .pipe(takeUntil(this.destroy$))
            .subscribe((id) => {
                this.adminModuleService.treeUpdated$.next();
                this.router.navigate([`../${id}`], { relativeTo: this.activeRoute });
            });
    }
}
