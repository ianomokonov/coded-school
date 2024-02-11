import { Component, Input } from '@angular/core';
import { AvatarModule } from 'primeng/avatar';
import { Avatar } from '@shared/components/avatar/avatar.model';

@Component({
    selector: 'coded-avatar',
    standalone: true,
    imports: [AvatarModule],
    templateUrl: './avatar.component.html',
    styleUrl: './avatar.component.scss',
})
export class AvatarComponent {
    @Input({ required: true })
    model!: Avatar;

    get displayedUserName(): string {
        const firstName = this.model.firstName[0];
        if (this.model.secondName) {
            return this.model.secondName[0].toUpperCase() + firstName.toLowerCase();
        }
        return firstName?.toUpperCase();
    }
}
