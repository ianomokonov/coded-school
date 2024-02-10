import { Component, Input } from '@angular/core';
import { PasswordModule } from 'primeng/password';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { UserService } from '@api/services/user.service';
import { takeUntil } from 'rxjs';
import { DestroyService } from '@core/destroy.service';
import { AsyncPipe, NgClass, NgIf } from '@angular/common';
import {
    FormBuilder,
    FormGroup,
    FormsModule,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { matchValidator } from '@core/form-validators/password-match.validator';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'coded-password-change',
    standalone: true,
    imports: [
        PasswordModule,
        CardModule,
        ButtonModule,
        NgClass,
        AsyncPipe,
        FormsModule,
        NgIf,
        ReactiveFormsModule,
    ],
    providers: [DestroyService],
    templateUrl: './password-change.component.html',
    styleUrl: './password-change.component.scss',
})
export class PasswordChangeComponent {
    passwordForm: FormGroup;

    @Input({ required: true })
    email!: string;

    constructor(
        private userService: UserService,
        private fb: FormBuilder,
        private destroy$: DestroyService,
        private messageService: MessageService,
    ) {
        this.passwordForm = this.fb.group({
            currentPassword: ['', Validators.required],
            newPassword: ['', [Validators.required, matchValidator('confirmPassword', true)]],
            confirmPassword: ['', [Validators.required, matchValidator('newPassword')]],
        });
    }

    checkPassword() {
        const control = this.passwordForm.get('currentPassword');
        this.userService
            .isPasswordCorrect({ password: control?.value })
            .pipe(takeUntil(this.destroy$))
            .subscribe((res) => {
                if (!res) {
                    control?.setErrors({ incorrect: true });
                }
            });
    }

    changePassword(): void {
        if (this.passwordForm.invalid) return;
        const password = this.passwordForm.getRawValue().newPassword;
        this.userService
            .patchPassword({ body: { password } })
            .pipe(takeUntil(this.destroy$))
            .subscribe(() => {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Данные обновлены',
                    detail: 'Пароль успешно обновлен',
                });
            });
    }

    forgotPassword(): void {
        this.userService
            .forgotPassword({ email: this.email })
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
