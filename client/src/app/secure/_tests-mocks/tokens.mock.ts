import { TokenResponse } from '@jwt/model';

export const tokensMock: TokenResponse = {
    token: 'Token',
    refreshToken: 'RefreshToken',
};

export const refreshedTokensMock: TokenResponse = {
    token: 'newToken',
    refreshToken: 'newRefreshToken',
};
