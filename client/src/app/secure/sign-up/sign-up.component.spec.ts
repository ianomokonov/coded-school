import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpComponent } from './sign-up.component';
import { tokensMock } from '../_tests-mocks/tokens.mock';
import { Observable, of } from 'rxjs';
import { TokenResponse } from '@jwt/model';
import { SecureService } from '../secure.service';
import { Router, provideRouter } from '@angular/router';
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
    let router: Router;

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
        router = TestBed.inject(Router);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should register user', () => {
        component.userForm.patchValue({
            name: 'name',
            email: 'email',
            password: 'password',
        });
        const navigateSpy = spyOn(router, 'navigate').and.returnValue({} as any);
        component.signUp();
        fixture.whenStable().then(() => {
            expect(navigateSpy).toHaveBeenCalledTimes(1);
            expect(navigateSpy).toHaveBeenCalledWith(['/lk']);
        });
    });
});
