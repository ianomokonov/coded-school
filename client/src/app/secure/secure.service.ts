import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { HttpClient } from '@angular/common/http';
import { JwtService } from '@jwt/service';
import { User } from '@core/models/user.model';
import { Observable, tap } from 'rxjs';
import { TokenResponse } from '@jwt/model';

@Injectable({
    providedIn: 'root',
})
export class SecureService {
    private baseUrl = `${environment.baseURL}/user`;

    constructor(
        private httpClient: HttpClient,
        private tokenService: JwtService,
    ) {}

    public signIn(user: User): Observable<TokenResponse> {
        return this.httpClient.post<TokenResponse>(`${this.baseUrl}/sign-in`, user).pipe(
            tap((tokens: TokenResponse) => {
                this.tokenService.storeTokens(tokens);
            }),
        );
    }

    public signUp(user: User): Observable<TokenResponse> {
        return this.httpClient.post<TokenResponse>(`${this.baseUrl}/sign-up`, user).pipe(
            tap((tokens: TokenResponse) => {
                this.tokenService.storeTokens(tokens);
            }),
        );
    }

    public logOut(): Observable<any> {
        return this.httpClient.post(`${this.baseUrl}/logout`, {}).pipe(
            tap(() => {
                this.tokenService.removeTokens();
            }),
        );
    }
}
