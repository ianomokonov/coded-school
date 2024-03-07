import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CardModule } from 'primeng/card';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'coded-marathon-success',
    standalone: true,
    imports: [ButtonModule, CardModule, RouterModule, AvatarModule],
    templateUrl: './marathon-timeout.component.html',
})
export class MarathonTimeoutComponent {}
