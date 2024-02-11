import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'coded-not-found',
    standalone: true,
    imports: [ButtonModule, RouterLink],
    templateUrl: './not-found.component.html',
    styleUrl: './not-found.component.scss',
})
export class NotFoundComponent {}
