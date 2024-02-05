import { Injectable } from '@angular/core';
import { accessToken, refreshToken } from '@jwt/const';
import { Observable, tap } from 'rxjs';
import { TokenResponse } from '@jwt/model';
import { UserService } from '@api/services/user.service';

@Injectable({
    providedIn: null,
})
export class JwtService {
    constructor(private userService: UserService) {}

    public getRefreshToken() {
        return localStorage.getItem(refreshToken);
    }

    public getToken() {
        return localStorage.getItem(accessToken);
    }

    public storeTokens(tokens: TokenResponse) {
        localStorage.setItem(accessToken, tokens.token);
        localStorage.setItem(refreshToken, tokens.refreshToken);
    }

    public removeTokens() {
        localStorage.removeItem(accessToken);
        localStorage.removeItem(refreshToken);
    }

    public refreshToken(): Observable<TokenResponse> {
        return this.userService.refreshTokens().pipe(
            tap((tokens: TokenResponse) => {
                this.storeTokens(tokens);
            }),
        );
    }

    public checkToken(): boolean {
        return !!this.getToken();
    }
}
