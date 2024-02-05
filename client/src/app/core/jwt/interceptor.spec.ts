import { HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http';
import { TokenInterceptor } from '@jwt/interceptor';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { JwtService } from '@jwt/service';
import { refreshedTokensMock, tokensMock } from '../../secure/_tests-mocks/tokens.mock';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

describe('TokenInterceptor', () => {
    let httpTestingController: HttpTestingController;
    let httpClient: HttpClient;
    let fakeTokenService: jasmine.SpyObj<JwtService>;
    let router: Router;
    let isRefreshError = false;

    beforeEach(() => {
        fakeTokenService = jasmine.createSpyObj('JwtService', {
            getRefreshToken: tokensMock.refreshToken,
            getToken: tokensMock.token,
            storeTokens: () => {},
            removeTokens: () => {},
            refreshToken: new Observable((observer) => {
                isRefreshError ? observer.error('error123') : observer.next(refreshedTokensMock);
                observer.complete();
            }),
        });
        TestBed.configureTestingModule({
            providers: [
                provideHttpClient(withInterceptors([TokenInterceptor])),
                provideHttpClientTesting(),
                { provide: JwtService, useValue: fakeTokenService },
            ],
        });
        httpTestingController = TestBed.inject(HttpTestingController);
        httpClient = TestBed.inject(HttpClient);
        router = TestBed.inject(Router);
    });

    afterEach(() => {
        httpTestingController.verify();
    });

    it('should intercept /api requests', () => {
        const url = '/api/user';

        httpClient.get(url).subscribe();

        const req = httpTestingController.expectOne(url);

        expect(req.request.headers.get('Authorization')).toEqual(`Bearer ${tokensMock.token}`);
    });

    it('should refresh tokens if access token expired', () => {
        const url = '/api/user';
        isRefreshError = false;

        httpClient.get(url).subscribe();

        httpTestingController.expectOne(url).error(new ProgressEvent('error'), { status: 401 });

        expect(fakeTokenService.refreshToken).toHaveBeenCalledTimes(1);

        const req = httpTestingController.expectOne(url);

        expect(req.request.headers.get('Authorization')).toEqual(
            `Bearer ${refreshedTokensMock.token}`,
        );
    });

    // it('should redirect to login form if refresh token expired', () => {
    //     const url = '/api/user';
    //     isRefreshError = true;
    //
    //     httpClient.get(url).subscribe();
    //
    //     httpTestingController.expectOne(url).error(new ProgressEvent('error'), { status: 401 });
    //
    //     expect(fakeTokenService.refreshToken).toThrowError('error123');
    //
    //     const navigateSpy = spyOn(router, 'navigate').and.returnValue({} as any);
    //
    //     expect(navigateSpy).toHaveBeenCalledTimes(1);
    //     expect(navigateSpy).toHaveBeenCalledWith(['/sign-in']);
    // });
});
