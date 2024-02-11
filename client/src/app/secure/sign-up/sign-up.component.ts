import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { finalize } from 'rxjs';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '@api/services/user.service';

@Component({
    selector: 'coded-sign-up',
    standalone: true,
    imports: [ReactiveFormsModule, InputTextModule, PasswordModule, ButtonModule, RouterLink],
    providers: [UserService],
    templateUrl: './sign-up.component.html',
    styleUrl: './sign-up.component.scss',
})
export class SignUpComponent {
    public userForm: FormGroup;
    public isLoading = false;

    constructor(
        private fb: FormBuilder,
        private userService: UserService,
        private router: Router,
    ) {
        this.userForm = fb.group({
            name: ['', Validators.required],
            email: ['', Validators.required],
            password: ['', Validators.required],
        });
    }

    public signUp(): void {
        if (this.userForm.invalid) {
            return;
        }
        const user = this.userForm.getRawValue();
        this.isLoading = true;
        this.userService
            .signUp({ body: user })
            .pipe(
                finalize(() => {
                    this.isLoading = false;
                }),
            )
            .subscribe(() => {
                this.router.navigate(['/lk']);
            });
    }
}
