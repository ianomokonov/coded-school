import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { finalize } from 'rxjs';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '@api/services';

@Component({
    selector: 'coded-sign-in',
    standalone: true,
    imports: [ReactiveFormsModule, InputTextModule, PasswordModule, ButtonModule, RouterLink],
    providers: [UserService],
    templateUrl: './sign-in.component.html',
    styleUrl: './sign-in.component.scss',
})
export class SignInComponent {
    public userForm: FormGroup;
    public isLoading = false;

    constructor(
        private fb: FormBuilder,
        private userService: UserService,
        private router: Router,
    ) {
        this.userForm = fb.group({
            email: ['', Validators.required],
            password: ['', Validators.required],
        });
    }

    public signIn(): void {
        if (this.userForm.invalid) {
            return;
        }
        const user = this.userForm.getRawValue();
        this.isLoading = true;
        this.userService
            .logIn({ body: user })
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
