import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpComponent } from '../sign-up/sign-up.component';
import { FormBuilder } from '@angular/forms';
import { tokensMock } from './mocks/tokens.mock';
import { Observable, of } from 'rxjs';
import { Location } from '@angular/common';
import { TokenResponse } from '@jwt/model';
import { SecureService } from '../secure.service';
import { provideRouter } from '@angular/router';
import { provideLocationMocks } from '@angular/common/testing';
import { routes } from '../../app.routes';

class SecureMockService {
    signUp(): Observable<TokenResponse> {
        return of(tokensMock);
    }
}

describe('SignUpComponent', () => {
    let component: SignUpComponent;
    let fixture: ComponentFixture<SignUpComponent>;
    let fakeSecureService: jasmine.SpyObj<SecureMockService>;

    beforeEach(async () => {
        fakeSecureService = jasmine.createSpyObj('SecureMockService', ['signUp']);
        fakeSecureService.signUp.and.returnValue(of(tokensMock));
        await TestBed.configureTestingModule({
            imports: [SignUpComponent],
            providers: [
                { provide: SecureService, useValue: fakeSecureService },
                provideRouter(routes),
                provideLocationMocks(),
            ],
        })
            .overrideComponent(SignUpComponent, {
                remove: { providers: [SecureService] },
                add: { providers: [SecureMockService] },
            })
            .compileComponents();

        fixture = TestBed.createComponent(SignUpComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should register user', () => {
        component.userForm = TestBed.inject(FormBuilder).group({
            name: ['name'],
            email: ['email'],

            password: ['password'],
        });
        component.signUp();
        fixture.whenStable().then(() => {
            const location = TestBed.inject(Location);

            expect(location.path()).toBe('/lk');
        });
    });
});
