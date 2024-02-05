import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignInComponent } from './sign-in.component';
import { provideRouter, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { TokenResponse } from '@jwt/model';
import { tokensMock } from '../_tests-mocks/tokens.mock';
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
    let router: Router;

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
        router = TestBed.inject(Router);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should authorize user', () => {
        component.userForm.patchValue({
            email: 'email',
            password: 'password',
        });
        const navigateSpy = spyOn(router, 'navigate').and.returnValue({} as any);
        component.signIn();
        fixture.whenStable().then(() => {
            expect(navigateSpy).toHaveBeenCalledTimes(1);
            expect(navigateSpy).toHaveBeenCalledWith(['/lk']);
        });
    });
});
