import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MenuModule } from 'primeng/menu';
import { CommonModule } from '@angular/common';
import { AvatarModule } from 'primeng/avatar';

@Component({
    selector: 'coded-topic-edit',
    standalone: true,
    imports: [MenuModule, RouterModule, CommonModule, AvatarModule],
    template: 'Topic edit',
})
export class TopicEditComponent {}
