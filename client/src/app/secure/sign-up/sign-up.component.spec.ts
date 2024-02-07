import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpComponent } from './sign-up.component';
import { tokensMock } from '../_tests-mocks/tokens.mock';
import { Observable, of } from 'rxjs';
import { Router, provideRouter } from '@angular/router';
import { provideLocationMocks } from '@angular/common/testing';
import { JwtDto } from '@api/models/jwt-dto';
import { UserService } from '@api/services';
import { APP_ROUTES } from '../../app.routes';

class UserMockService {
    signIn(): Observable<JwtDto> {
        return of(tokensMock);
    }
}

describe('SignUpComponent', () => {
    let component: SignUpComponent;
    let fixture: ComponentFixture<SignUpComponent>;
    let fakeUserService: jasmine.SpyObj<UserMockService>;
    let router: Router;

    beforeEach(async () => {
        fakeUserService = jasmine.createSpyObj('SecureMockService', ['signIn']);
        fakeUserService.signIn.and.returnValue(of(tokensMock));
        await TestBed.configureTestingModule({
            imports: [SignUpComponent],
            providers: [
                { provide: UserService, useValue: fakeUserService },
                provideRouter(APP_ROUTES),
                provideLocationMocks(),
            ],
        })
            .overrideComponent(SignUpComponent, {
                remove: { providers: [UserService] },
                add: { providers: [UserMockService] },
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
