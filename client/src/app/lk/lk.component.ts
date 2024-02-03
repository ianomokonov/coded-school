import { Component, OnInit } from '@angular/core';
import { UserFullInfoDto, UserService } from '@api/index';
import { CardModule } from 'primeng/card';

@Component({
    selector: 'coded-personal-cabinet',
    standalone: true,
    imports: [CardModule],
    templateUrl: './lk.component.html',
    styleUrl: './lk.component.scss',
})
export class PersonalCabinetComponent implements OnInit {
    public userInfo!: UserFullInfoDto;

    constructor(private userService: UserService) {}

    ngOnInit(): void {
        this.userService.getUserFullInfo().subscribe((info) => {
            this.userInfo = info;
        });
    }
}
