import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { takeUntil } from 'rxjs';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { DestroyService } from '@core/destroy.service';
import { UserService } from '@api/services/user.service';
import { environment } from '@environments/environment';

@Component({
    selector: 'coded-sign-up',
    standalone: true,
    imports: [ReactiveFormsModule, InputTextModule, PasswordModule, ButtonModule, RouterLink],
    providers: [DestroyService],
    templateUrl: './sign-up.component.html',
    styleUrl: './sign-up.component.scss',
})
export class SignUpComponent {
    public userForm: FormGroup;

    constructor(
        private fb: FormBuilder,
        private userService: UserService,
        private router: Router,
        private route: ActivatedRoute,
        private destroy$: DestroyService,
    ) {
        this.route.queryParams.pipe(takeUntil(this.destroy$)).subscribe((params) => {
            const refLink = params['ref'];
            if (environment.devMode) {
                console.log(refLink);
            }
        });
        this.userForm = this.fb.group({
            name: ['', Validators.required],
            email: ['', Validators.required],
            password: ['', Validators.required],
        });
    }

    public signUp(): void {
        if (this.userForm.invalid) return;
        this.userService
            .signUp({ body: this.userForm.getRawValue() })
            .pipe(takeUntil(this.destroy$))
            .subscribe(() => {
                this.router.navigate(['/lk']);
            });
    }
}
