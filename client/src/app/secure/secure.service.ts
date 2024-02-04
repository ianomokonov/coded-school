import { Injectable } from '@angular/core';
import { JwtService } from '@jwt/service';
import { Observable, tap } from 'rxjs';
import { TokenResponse } from '@jwt/model';
import { UserService } from '@api/services/user.service';
import { LoginDto } from '@api/models/login-dto';
import { SignInDto } from '@api/models/sign-in-dto';

@Injectable({
    providedIn: 'root',
})
export class SecureService {
    constructor(
        private userService: UserService,
        private tokenService: JwtService,
    ) {}

    public signIn(user: LoginDto): Observable<TokenResponse> {
        return this.userService.logIn({ body: user }).pipe(
            tap((tokens: TokenResponse) => {
                this.tokenService.storeTokens(tokens);
            }),
        );
    }

    public signUp(user: SignInDto): Observable<TokenResponse> {
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
