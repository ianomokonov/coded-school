import { TestBed } from '@angular/core/testing';

import { SecureService } from '../secure.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { tokensMock } from './mocks/tokens.mock';
import { signInMock } from './mocks/sign-in.mock';
import { accessToken, refreshToken } from '@jwt/const';
import { TokenResponse } from '@jwt/model';
import { signUpMock } from './mocks/sign-up.mock';
import { JwtService } from '@jwt/service';

describe('SecureService', () => {
    let service: SecureService;
    let backEnd: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [JwtService],
        });
        service = TestBed.inject(SecureService);
        backEnd = TestBed.inject(HttpTestingController);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should sign-in user', () => {
        service.signIn(signInMock).subscribe((tokens) => {
            const storageTokens: TokenResponse = {
                token: localStorage.getItem(accessToken) || '',
                refreshToken: localStorage.getItem(refreshToken) || '',
            };

            expect(storageTokens).toEqual(tokens);
        });

        backEnd
            .expectOne({
                method: 'POST',
                url: '/api/user/sign-in',
            })
            .flush(tokensMock);
    });

    it('should sign-up user', () => {
        service.signUp(signUpMock).subscribe((tokens) => {
            const storageTokens: TokenResponse = {
                token: localStorage.getItem(accessToken) || '',
                refreshToken: localStorage.getItem(refreshToken) || '',
            };

            expect(storageTokens).toEqual(tokens);
        });
        backEnd
            .expectOne({
                method: 'POST',
                url: '/api/user/sign-up',
            })
            .flush(tokensMock);
    });

    it('should logout user', () => {
        service.logOut().subscribe(() => {
            const token = localStorage.getItem(accessToken);
            const rToken = localStorage.getItem(refreshToken);

            expect(token).toBeNull();
            expect(rToken).toBeNull();
        });
        backEnd
            .expectOne({
                method: 'POST',
                url: '/api/user/logout',
            })
            .flush(null);
    });
});
