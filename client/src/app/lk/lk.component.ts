import { NgFor, NgIf, NgSwitch, NgSwitchCase } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { Router, RouterLink } from '@angular/router';
import { UserFullInfoDto, UserService } from '@api/index';
import { CardModule } from 'primeng/card';
import { SidebarModule } from 'primeng/sidebar';
import { AvatarModule } from 'primeng/avatar';
import { AvatarComponent } from '@shared/components/avatar/avatar.component';
import { DestroyService } from '@core/destroy.service';
import { takeUntil } from 'rxjs';
import { InputTextModule } from 'primeng/inputtext';
import { PaginatorModule } from 'primeng/paginator';
import { ReactiveFormsModule } from '@angular/forms';
import { TooltipModule } from 'primeng/tooltip';
import { MessageService } from 'primeng/api';
import { ClipboardService } from 'ngx-clipboard';
import { NotesComponent } from './notes/notes.component';

export enum SideBarBlockDisplayed {
    PERSONAL_CABINET_MENU = 'PERSONAL_CABINET_MENU',
    NOTES = 'NOTES',
    CREATE_NOTE = 'CREATE_NOTE',
}

@Component({
    selector: 'coded-personal-cabinet',
    standalone: true,
    imports: [
        CardModule,
        ButtonModule,
        NgIf,
        NgFor,
        RouterLink,
        SidebarModule,
        AvatarModule,
        AvatarComponent,
        InputTextModule,
        PaginatorModule,
        ReactiveFormsModule,
        TooltipModule,
        NgSwitch,
        NgSwitchCase,
        NotesComponent,
    ],
    providers: [DestroyService],
    templateUrl: './lk.component.html',
    styleUrl: './lk.component.scss',
})
export class PersonalCabinetComponent implements OnInit {
    userInfo!: UserFullInfoDto;

    sideBarVisible: boolean = false;
    sideBarBlocks: SideBarBlockDisplayed = SideBarBlockDisplayed.PERSONAL_CABINET_MENU;

    constructor(
        private userService: UserService,
        private messageService: MessageService,
        private clipboardService: ClipboardService,
        private destroy$: DestroyService,
        private router: Router,
    ) {}

    ngOnInit(): void {
        this.userService
            .getUserFullInfo()
            .pipe(takeUntil(this.destroy$))
            .subscribe((info) => {
                this.userInfo = info;
            });
    }

    logOut(): void {
        this.userService.logout().subscribe(() => {
            this.router.navigate(['/sign-in']);
        });
    }

    copyReferLink(): void {
        this.clipboardService.copy(this.userInfo.referralCode);
        this.messageService.add({
            severity: 'success',
            summary: 'Ссылка скопирована',
            detail: 'Теперь Вы можете отправить ссылку другу!',
        });
    }

    getDisplayedRefLink(): string {
        const link = this.userInfo.referralCode.split('=');
        return link[link.length - 1];
    }

    preventEvent(event: Event) {
        event.preventDefault();
    }

    protected readonly SideBarBlockDisplayed = SideBarBlockDisplayed;
}
