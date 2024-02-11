import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignInComponent } from './sign-in.component';
import { provideRouter, Router } from '@angular/router';
import { of } from 'rxjs';
import { tokensMock } from '../_tests-mocks/tokens.mock';
import { provideLocationMocks } from '@angular/common/testing';
import { APP_ROUTES } from '../../app.routes';
import { UserService } from '@api/services';
import { MessageService } from 'primeng/api';

describe('SignInComponent', () => {
    let component: SignInComponent;
    let fixture: ComponentFixture<SignInComponent>;
    let fakeUserService: jasmine.SpyObj<UserService>;
    let router: Router;

    beforeEach(async () => {
        fakeUserService = jasmine.createSpyObj('UserService', ['signIn']);
        fakeUserService.signIn.and.returnValue(of(tokensMock));
        await TestBed.configureTestingModule({
            imports: [SignInComponent],
            providers: [
                { provide: UserService, useValue: fakeUserService },
                MessageService,
                provideRouter(APP_ROUTES),
                provideLocationMocks(),
            ],
        }).compileComponents();

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
