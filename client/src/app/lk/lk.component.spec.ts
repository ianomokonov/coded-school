import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalCabinetComponent } from './lk.component';
import { UserService } from '@api/services';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { JwtService } from '@jwt/service';

describe('LkComponent', () => {
    let component: PersonalCabinetComponent;
    let fixture: ComponentFixture<PersonalCabinetComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [PersonalCabinetComponent],
            providers: [UserService, HttpClient, HttpHandler, JwtService],
        }).compileComponents();

        fixture = TestBed.createComponent(PersonalCabinetComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
