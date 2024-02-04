import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignInComponent } from '../sign-in/sign-in.component';
import { provideRouter } from '@angular/router';
import { Observable, of } from 'rxjs';
import { TokenResponse } from '@jwt/model';
import { tokensMock } from './mocks/tokens.mock';
import { FormBuilder } from '@angular/forms';
import { Location } from '@angular/common';
import { SecureService } from '../secure.service';
import { provideLocationMocks } from '@angular/common/testing';
import { routes } from '../../app.routes';

class SecureMockService {
    signIn(): Observable<TokenResponse> {
        return of(tokensMock);
    }
}

describe('SignInComponent', () => {
    let component: SignInComponent;
    let fixture: ComponentFixture<SignInComponent>;
    let fakeSecureService: jasmine.SpyObj<SecureMockService>;

    beforeEach(async () => {
        fakeSecureService = jasmine.createSpyObj('SecureMockService', ['signIn']);
        fakeSecureService.signIn.and.returnValue(of(tokensMock));
        await TestBed.configureTestingModule({
            imports: [SignInComponent],
            providers: [
                { provide: SecureService, useValue: fakeSecureService },
                provideRouter(routes),
                provideLocationMocks(),
            ],
        })
            .overrideComponent(SignInComponent, {
                remove: { providers: [SecureService] },
                add: { providers: [SecureMockService] },
            })
            .compileComponents();

        fixture = TestBed.createComponent(SignInComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    // it('should authorize user', () => {
    //     component.userForm = TestBed.inject(FormBuilder).group({
    //         email: ['email'],
    //         password: ['password'],
    //     });
    //     component.signIn();
    //     fixture.whenStable().then(() => {
    //         const location = TestBed.inject(Location);

    //         expect(location.path()).toBe('/lk');
    //     });
    // });
});
