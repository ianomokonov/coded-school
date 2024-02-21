import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { Router, RouterLink } from '@angular/router';
import { UserFullInfoDto, UserService } from '@api/index';
import { CardModule } from 'primeng/card';
import { SidebarModule } from 'primeng/sidebar';
import { AvatarModule } from 'primeng/avatar';
import { AvatarComponent } from '@shared/components/avatar/avatar.component';
import { DestroyService } from '@core/destroy.service';
import { InputTextModule } from 'primeng/inputtext';
import { PaginatorModule } from 'primeng/paginator';
import { ReactiveFormsModule } from '@angular/forms';
import { TooltipModule } from 'primeng/tooltip';
import { MessageService } from 'primeng/api';
import { ClipboardService } from 'ngx-clipboard';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { NotesComponent } from '../notes/notes.component';

export enum SideBarBlockDisplayed {
    PERSONAL_CABINET_MENU = 'PERSONAL_CABINET_MENU',
    NOTES = 'NOTES',
}

@Component({
    selector: 'coded-personal-cabinet',
    standalone: true,
    imports: [
        CardModule,
        ButtonModule,
        RouterLink,
        SidebarModule,
        AvatarModule,
        AvatarComponent,
        InputTextModule,
        PaginatorModule,
        ReactiveFormsModule,
        TooltipModule,
        NotesComponent,
        AsyncPipe,
    ],
    providers: [DestroyService],
    templateUrl: './lk.component.html',
    styleUrl: './lk.component.scss',
})
export class PersonalCabinetComponent implements OnInit {
    userInfo$!: Observable<UserFullInfoDto>;

    sideBarVisible: boolean = false;
    sideBarBlocks: SideBarBlockDisplayed = SideBarBlockDisplayed.PERSONAL_CABINET_MENU;

    protected readonly SideBarBlockDisplayed = SideBarBlockDisplayed;

    constructor(
        private userService: UserService,
        private messageService: MessageService,
        private clipboardService: ClipboardService,
        private router: Router,
    ) {}

    ngOnInit(): void {
        this.userInfo$ = this.userService.getUserFullInfo();
    }

    logOut(): void {
        this.userService.logout().subscribe(() => {
            this.router.navigate(['/sign-in']);
        });
    }

    copyReferLink(link: string): void {
        this.clipboardService.copy(link);
        this.messageService.add({
            severity: 'success',
            summary: 'Ссылка скопирована',
            detail: 'Теперь Вы можете отправить ссылку другу!',
        });
    }

    getDisplayedRefLink(link: string): string {
        const splitLink = link.split('=');
        return splitLink[splitLink.length - 1];
    }

    preventEvent(event: Event) {
        event.preventDefault();
    }
}
