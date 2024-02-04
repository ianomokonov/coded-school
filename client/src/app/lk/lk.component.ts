import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { SecureService } from '../secure/secure.service';
import { Router } from '@angular/router';

@Component({
    selector: 'coded-personal-cabinet',
    standalone: true,
    imports: [ButtonModule],
    providers: [SecureService],
    templateUrl: './lk.component.html',
    styleUrl: './lk.component.scss',
})
export class PersonalCabinetComponent {
    constructor(
        private secureService: SecureService,
        private router: Router,
    ) {}
    logOut(): void {
        this.secureService.logOut().subscribe(() => {
            this.router.navigate(['/sign-in']);
        });
    }
}
