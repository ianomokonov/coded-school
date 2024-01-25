import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SecureService } from '../secure.service';
import { finalize } from 'rxjs';

@Component({
    selector: 'coded-sign-in',
    standalone: true,
    imports: [ReactiveFormsModule],
    providers: [SecureService],
    templateUrl: './sign-in.component.html',
    styleUrl: './sign-in.component.scss',
})
export class SignInComponent {
    public userForm: FormGroup;
    public isLoading = false;

    constructor(
        private fb: FormBuilder,
        private secureService: SecureService,
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
        this.secureService
            .signIn(user)
            .pipe(
                finalize(() => {
                    this.isLoading = false;
                }),
            )
            .subscribe(() => {});
    }
}
