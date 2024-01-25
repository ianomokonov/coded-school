import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SecureService } from '../secure.service';
import { finalize } from 'rxjs';

@Component({
    selector: 'coded-sign-up',
    standalone: true,
    imports: [ReactiveFormsModule],
    providers: [SecureService],
    templateUrl: './sign-up.component.html',
    styleUrl: './sign-up.component.scss',
})
export class SignUpComponent {
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

    public signUp(): void {
        if (this.userForm.invalid) {
            return;
        }
        const user = this.userForm.getRawValue();
        this.isLoading = true;
        this.secureService
            .signUp(user)
            .pipe(
                finalize(() => {
                    this.isLoading = false;
                }),
            )
            .subscribe(() => {});
    }
}
