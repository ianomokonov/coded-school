import { Injectable } from '@angular/core';
import { accessToken, refreshToken } from '@jwt/const';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { UserService } from '@api/services/user.service';
import { JwtDto } from '@api/models/jwt-dto';

@Injectable({
    providedIn: null,
})
export class JwtService {
    constructor(private userService: UserService) {}

    public getRefreshToken() {
        return localStorage.getItem(refreshToken);
    }

    public getToken() {
        return sessionStorage.getItem(accessToken);
    }

    public storeTokens(tokens: JwtDto) {
        sessionStorage.setItem(accessToken, tokens.token);
        localStorage.setItem(refreshToken, tokens.refreshToken);
    }

    public removeTokens() {
        sessionStorage.removeItem(accessToken);
        localStorage.removeItem(refreshToken);
    }

    public refreshToken(): Observable<JwtDto> {
        return this.userService.refreshTokens().pipe(
            tap((tokens: JwtDto) => {
                this.storeTokens(tokens);
            }),
            catchError((err) => {
                this.removeTokens();
                return throwError(() => err);
            }),
        );
    }

    public checkToken(): boolean {
        return !!this.getToken();
    }
}
