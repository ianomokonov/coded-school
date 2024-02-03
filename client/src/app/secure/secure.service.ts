import { Injectable } from '@angular/core';
import { JwtService } from '@jwt/service';
import { User } from '@core/models/user.model';
import { Observable, tap } from 'rxjs';
import { TokenResponse } from '@jwt/model';
import { UserService } from '@api/services/user.service';

@Injectable({
    providedIn: 'root',
})
export class SecureService {
    constructor(
        private userService: UserService,
        private tokenService: JwtService,
    ) {}

    public signIn(user: User): Observable<TokenResponse> {
        return this.userService.logIn({ body: user }).pipe(
            tap((tokens: TokenResponse) => {
                this.tokenService.storeTokens(tokens);
            }),
        );
    }

    public signUp(user: User): Observable<TokenResponse> {
        return this.userService.signIn({ body: user }).pipe(
            tap((tokens: TokenResponse) => {
                this.tokenService.storeTokens(tokens);
            }),
        );
    }

    public logOut(): Observable<void> {
        return this.userService.logout().pipe(
            tap(() => {
                this.tokenService.removeTokens();
            }),
        );
    }
}
