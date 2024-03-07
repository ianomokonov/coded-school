import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TabMenuModule } from 'primeng/tabmenu';
import { CommonModule } from '@angular/common';
import { AvatarModule } from 'primeng/avatar';
import { MenuItem } from 'primeng/api';

@Component({
    selector: 'coded-admin',
    standalone: true,
    imports: [TabMenuModule, RouterModule, CommonModule, AvatarModule],
    templateUrl: './admin.component.html',
})
export class AdminComponent {
    menuItems: MenuItem[] = [
        {
            label: 'Модуль',
            routerLink: ['/admin'],
        },
        {
            label: 'Марафон',
        },
        {
            label: 'Достижение',
        },
    ];
}
