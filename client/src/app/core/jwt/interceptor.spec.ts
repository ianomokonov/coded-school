import { HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http';
import { TokenInterceptor } from '@jwt/interceptor';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { JwtService } from '@jwt/service';
import { refreshedTokensMock, tokensMock } from '../../secure/_tests-mocks/tokens.mock';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';

describe('TokenInterceptor', () => {
    let httpTestingController: HttpTestingController;
    let httpClient: HttpClient;
    const fakeTokenService: JwtService = {
        getRefreshToken: () => tokensMock.refreshToken,
        getToken: () => tokensMock.token,
        storeTokens: () => {},
        removeTokens: () => {},
        refreshToken: () => of(refreshedTokensMock),
    } as any;
    let router: Router;

    beforeEach(() => {
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

    it('should intercept /api requests', () => {
        const url = '/api/user';

        httpClient.get(url).subscribe();

        const req = httpTestingController.expectOne(url);

        expect(req.request.headers.get('Authorization')).toEqual(`Bearer ${tokensMock.token}`);
    });

    it('should refresh tokens if access token expired', () => {
        const url = '/api/user';
        const refreshSpy = spyOn(fakeTokenService, 'refreshToken').and.returnValue(
            of(refreshedTokensMock),
        );

        httpClient.get(url).subscribe();

        httpTestingController.expectOne(url).error(new ProgressEvent('error'), { status: 401 });

        expect(refreshSpy).toHaveBeenCalledTimes(1);

        const req = httpTestingController.expectOne(url);

        expect(req.request.headers.get('Authorization')).toEqual(
            `Bearer ${refreshedTokensMock.token}`,
        );
    });

    it('should redirect to login form if refresh token expired', () => {
        const url = '/api/user';
        spyOn(fakeTokenService, 'refreshToken').and.returnValue(throwError(() => 'error123'));
        const navigateSpy = spyOn(router, 'navigate').and.returnValue({} as any);

        httpClient.get(url).subscribe({ error: () => {} });

        httpTestingController.expectOne(url).error(new ProgressEvent('error'), { status: 401 });

        expect(navigateSpy).toHaveBeenCalledTimes(1);
        expect(navigateSpy).toHaveBeenCalledWith(['/sign-in']);
    });
});
