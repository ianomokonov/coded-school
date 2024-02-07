import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { Router, RouterLink } from '@angular/router';
import { UserFullInfoDto, UserService } from '@api/index';
import { CardModule } from 'primeng/card';
import { SidebarModule } from 'primeng/sidebar';

@Component({
    selector: 'coded-personal-cabinet',
    standalone: true,
    imports: [CardModule, ButtonModule, NgIf, NgFor, RouterLink, SidebarModule],
    templateUrl: './lk.component.html',
    styleUrl: './lk.component.scss',
})
export class PersonalCabinetComponent implements OnInit {
    userInfo!: UserFullInfoDto;

    sideBarVisible: boolean = false;

    constructor(
        private userService: UserService,
        private router: Router,
    ) {}

    ngOnInit(): void {
        this.userService.getUserFullInfo().subscribe((info) => {
            this.userInfo = info;
        });
    }

    logOut(): void {
        this.userService.logout().subscribe(() => {
            this.router.navigate(['/sign-in']);
        });
    }
}
