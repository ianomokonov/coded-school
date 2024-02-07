import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignInComponent } from './sign-in.component';
import { provideRouter, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { tokensMock } from '../_tests-mocks/tokens.mock';
import { provideLocationMocks } from '@angular/common/testing';
import { APP_ROUTES } from '../../app.routes';
import { UserService } from '@api/services';
import { JwtDto } from '@api/models/jwt-dto';

class UserMockService {
    logIn(): Observable<JwtDto> {
        return of(tokensMock);
    }
}

describe('SignInComponent', () => {
    let component: SignInComponent;
    let fixture: ComponentFixture<SignInComponent>;
    let fakeUserService: jasmine.SpyObj<UserMockService>;
    let router: Router;

    beforeEach(async () => {
        fakeUserService = jasmine.createSpyObj('UserMockService', ['logIn']);
        fakeUserService.logIn.and.returnValue(of(tokensMock));
        await TestBed.configureTestingModule({
            imports: [SignInComponent],
            providers: [
                { provide: UserService, useValue: fakeUserService },
                provideRouter(APP_ROUTES),
                provideLocationMocks(),
            ],
        })
            .overrideComponent(SignInComponent, {
                remove: { providers: [UserService] },
                add: { providers: [UserMockService] },
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
