import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { HttpClient } from '@angular/common/http';
import { accessToken, refreshToken } from '@jwt/const';
import { Observable, tap } from 'rxjs';
import { TokenResponse } from '@jwt/model';

@Injectable({
    providedIn: null,
})
export class JwtService {
    private baseUrl = environment.baseURL;

    constructor(private http: HttpClient) {}

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

    public refreshToken(token: string): Observable<TokenResponse> {
        return this.http.post<TokenResponse>(`${this.baseUrl}/user/refresh`, { token }).pipe(
            tap((tokens: TokenResponse) => {
                this.storeTokens(tokens);
            }),
        );
    }

    public checkToken(): boolean {
        return !!this.getToken();
    }
}
