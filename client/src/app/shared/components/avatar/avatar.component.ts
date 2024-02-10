import { Component, Input } from '@angular/core';
import { AvatarModule } from 'primeng/avatar';
import { UserFullInfoDto } from '@api/models/user-full-info-dto';
import { PassportUserDto } from '@api/models/passport-user-dto';

@Component({
    selector: 'coded-avatar',
    standalone: true,
    imports: [AvatarModule],
    templateUrl: './avatar.component.html',
    styleUrl: './avatar.component.scss',
})
export class AvatarComponent {
    @Input({ required: true })
    userInfo!: UserFullInfoDto | PassportUserDto;

    get displayedUserName(): string {
        const firstName = this.userInfo.firstName[0];
        if (this.userInfo.secondName) {
            return this.userInfo.secondName[0].toUpperCase() + firstName.toLowerCase();
        }
        return firstName?.toUpperCase();
    }
}
