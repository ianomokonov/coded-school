import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { SecureService } from '../secure/secure.service';
import { Router } from '@angular/router';
import { UserFullInfoDto, UserService } from '@api/index';
import { CardModule } from 'primeng/card';

@Component({
    selector: 'coded-personal-cabinet',
    standalone: true,
    imports: [CardModule, ButtonModule, CommonModule],
    templateUrl: './lk.component.html',
    styleUrl: './lk.component.scss',
})
export class PersonalCabinetComponent implements OnInit {
    public userInfo!: UserFullInfoDto;

    constructor(
        private userService: UserService,
        private secureService: SecureService,
        private router: Router,
    ) {}

    ngOnInit(): void {
        this.userService.getUserFullInfo().subscribe((info) => {
            this.userInfo = info;
        });
    }

    logOut(): void {
        this.secureService.logOut().subscribe(() => {
            this.router.navigate(['/sign-in']);
        });
    }
}
