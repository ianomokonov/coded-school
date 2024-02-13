import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpComponent } from './sign-up.component';
import { tokensMock } from '../_tests-mocks/tokens.mock';
import { of } from 'rxjs';
import { Router, provideRouter } from '@angular/router';
import { UserService } from '@api/services';
import { APP_ROUTES } from '../../app.routes';
import { MessageService } from 'primeng/api';

describe('SignUpComponent', () => {
    let component: SignUpComponent;
    let fixture: ComponentFixture<SignUpComponent>;
    let fakeUserService: jasmine.SpyObj<UserService>;
    let router: Router;

    beforeEach(async () => {
        fakeUserService = jasmine.createSpyObj('UserMockService', ['signUp']);
        fakeUserService.signUp.and.returnValue(of(tokensMock));
        await TestBed.configureTestingModule({
            imports: [SignUpComponent],
            providers: [
                { provide: UserService, useValue: fakeUserService },
                MessageService,
                provideRouter(APP_ROUTES),
            ],
        }).compileComponents();

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
            firstName: 'name',
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
