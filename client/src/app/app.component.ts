import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PrimeNGConfig } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { translation } from './translation.const';

@Component({
    selector: 'coded-root',
    standalone: true,
    imports: [RouterOutlet, ToastModule],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
    title = 'coded-school';

    constructor(private ngPrimeConfig: PrimeNGConfig) {}

    ngOnInit(): void {
        this.ngPrimeConfig.setTranslation(translation);
    }
}
