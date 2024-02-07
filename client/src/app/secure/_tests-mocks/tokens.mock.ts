import { JwtDto } from '@api/models/jwt-dto';

export const tokensMock: JwtDto = {
    token: 'Token',
    refreshToken: 'RefreshToken',
};

export const refreshedTokensMock: JwtDto = {
    token: 'newToken',
    refreshToken: 'newRefreshToken',
};
