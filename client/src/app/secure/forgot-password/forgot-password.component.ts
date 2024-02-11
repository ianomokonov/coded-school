import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntil } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { DestroyService } from '@core/destroy.service';
import {
    FormBuilder,
    FormGroup,
    FormsModule,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { matchValidator } from '@core/form-validators/password-match.validator';
import { ButtonModule } from 'primeng/button';
import { PasswordModule } from 'primeng/password';
import { CardModule } from 'primeng/card';
import { UserService } from '@api/services/user.service';
import { JwtService } from '@jwt/service';

@Component({
    selector: 'coded-forgot-password',
    standalone: true,
    imports: [
        AsyncPipe,
        ButtonModule,
        FormsModule,
        PasswordModule,
        ReactiveFormsModule,
        CardModule,
    ],
    templateUrl: './forgot-password.component.html',
    styleUrl: './forgot-password.component.scss',
    providers: [DestroyService],
})
export class ForgotPasswordComponent {
    private token!: string;

    passwordForm!: FormGroup;

    constructor(
        private userService: UserService,
        private activeRoute: ActivatedRoute,
        private tokenService: JwtService,
        private fb: FormBuilder,
        private router: Router,
        private destroy$: DestroyService,
    ) {
        this.activeRoute.params.pipe(takeUntil(this.destroy$)).subscribe((res) => {
            this.token = res['token'];
            this.tokenService.removeTokens();
        });
        this.passwordForm = this.fb.group({
            password: ['', [Validators.required, matchValidator('confirmPassword', true)]],
            confirmPassword: ['', [Validators.required, matchValidator('password')]],
        });
    }

    savePassword(): void {
        if (this.passwordForm.invalid) return;
        const { password } = this.passwordForm.getRawValue();
        this.userService
            .updateForgottenPassword({ body: { password, uniqueId: this.token! } })
            .pipe(takeUntil(this.destroy$))
            .subscribe(() => {
                this.router.navigate(['sign-in']);
            });
    }
}
