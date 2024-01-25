import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { HttpClient } from '@angular/common/http';
import { accessToken, refreshToken } from '@jwt/const';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { TokenResponse } from '@jwt/model';

@Injectable({
    providedIn: null,
})
export class JwtService {
    private baseUrl = environment.baseURL;

    private isTokenExists: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    constructor(private http: HttpClient) {
        if (this.getToken()) {
            this.isTokenExists.next(true);
        }
    }

    public getRefreshToken() {
        return localStorage.getItem(refreshToken);
    }

    public getToken() {
        return localStorage.getItem(accessToken);
    }

    public storeTokens(tokens: TokenResponse) {
        localStorage.setItem(accessToken, tokens.token);
        localStorage.setItem(refreshToken, tokens.refreshToken);
        this.isTokenExists.next(true);
    }

    public removeTokens() {
        localStorage.removeItem(accessToken);
        localStorage.removeItem(refreshToken);
        this.isTokenExists.next(false);
    }

    public refreshToken(token: string): Observable<TokenResponse> {
        return this.http.post<TokenResponse>(`${this.baseUrl}/user/refresh`, { token }).pipe(
            tap((tokens: TokenResponse) => {
                this.storeTokens(tokens);
            }),
        );
    }

    public checkToken(): Observable<boolean> {
        return this.isTokenExists;
    }
}
