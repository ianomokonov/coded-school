import { Component, OnInit } from '@angular/core';
import { UserService } from '@api/services/user.service';
import { takeUntil } from 'rxjs';
import { DestroyService } from '@core/destroy.service';
import { PassportUserDto } from '@api/models/passport-user-dto';

@Component({
    selector: 'coded-passport',
    standalone: true,
    imports: [],
    providers: [DestroyService],
    templateUrl: './passport.component.html',
    styleUrl: './passport.component.scss',
})
export class PassportComponent implements OnInit {
    passport!: PassportUserDto;

    constructor(
        private userService: UserService,
        private destroy$: DestroyService,
    ) {}

    ngOnInit(): void {
        this.userService
            .getPassportInfo()
            .pipe(takeUntil(this.destroy$))
            .subscribe((passportData) => {
                this.passport = passportData;
            });
    }
}
