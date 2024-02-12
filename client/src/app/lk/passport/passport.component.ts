import { Component, OnInit } from '@angular/core';
import { UserService } from '@api/services/user.service';
import { Observable, takeUntil } from 'rxjs';
import { DestroyService } from '@core/destroy.service';
import { PassportUserDto } from '@api/models/passport-user-dto';
import { AvatarComponent } from '@shared/components/avatar/avatar.component';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';

import { DropdownModule } from 'primeng/dropdown';
import { ReactiveFormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { AccountDataComponent } from './account-data/account-data.component';
import { PasswordChangeComponent } from './password-change/password-change.component';
import { AvatarModule } from 'primeng/avatar';
import { RouterLink } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AsyncPipe } from '@angular/common';

@Component({
    selector: 'coded-passport',
    standalone: true,
    imports: [
        AvatarComponent,
        InputTextModule,
        CalendarModule,
        DropdownModule,
        ReactiveFormsModule,
        CardModule,
        AccountDataComponent,
        PasswordChangeComponent,
        AvatarModule,
        RouterLink,
        AsyncPipe,
    ],
    providers: [DestroyService],
    templateUrl: './passport.component.html',
    styleUrl: './passport.component.scss',
})
export class PassportComponent implements OnInit {
    passport$!: Observable<PassportUserDto>;

    constructor(
        private userService: UserService,
        private messageService: MessageService,
        private destroy$: DestroyService,
    ) {}

    ngOnInit(): void {
        this.passport$ = this.userService.getPassportInfo();
    }

    saveUser(data: PassportUserDto): void {
        this.userService
            .patchPassport({ body: data })
            .pipe(takeUntil(this.destroy$))
            .subscribe(() => {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Данные обновлены',
                });
            });
    }
}
