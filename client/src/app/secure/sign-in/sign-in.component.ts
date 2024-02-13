import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { takeUntil } from 'rxjs';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '@api/services';
import { DestroyService } from '@core/destroy.service';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'coded-sign-in',
    standalone: true,
    imports: [ReactiveFormsModule, InputTextModule, PasswordModule, ButtonModule, RouterLink],
    providers: [DestroyService],
    templateUrl: './sign-in.component.html',
    styleUrl: './sign-in.component.scss',
})
export class SignInComponent {
    userForm: FormGroup;

    constructor(
        private fb: FormBuilder,
        private userService: UserService,
        private destroy$: DestroyService,
        private messageService: MessageService,
        private router: Router,
    ) {
        this.userForm = this.fb.group({
            email: ['', Validators.required],
            password: ['', Validators.required],
        });
    }

    signIn(): void {
        if (this.userForm.invalid) return;
        this.userService
            .signIn({ body: this.userForm.getRawValue() })
            .pipe(takeUntil(this.destroy$))
            .subscribe(() => {
                this.router.navigate(['/lk']);
            });
    }

    resetPassword(): void {
        const email = this.userForm.getRawValue().email;
        if (!email) {
            this.userForm.get('email')?.setErrors({ requiredForReset: true });
            this.messageService.add({
                severity: 'error',
                summary: 'Требуются данные',
                detail: 'Для восстановления пароля требуется Ваш email',
            });
            return;
        }
        this.userService
            .forgotPassword({ email })
            .pipe(takeUntil(this.destroy$))
            .subscribe(() => {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Письмо отправлено',
                    detail: 'Письмо со ссылкой на восстановление пароля отправлено на Email',
                });
            });
    }
}
