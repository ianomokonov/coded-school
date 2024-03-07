import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MenuModule } from 'primeng/menu';
import { CommonModule } from '@angular/common';
import { AvatarModule } from 'primeng/avatar';

@Component({
    selector: 'coded-module-edit',
    standalone: true,
    imports: [MenuModule, RouterModule, CommonModule, AvatarModule],
    template: 'Module edit',
})
export class ModuleEditComponent {}
