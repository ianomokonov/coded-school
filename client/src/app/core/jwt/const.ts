import { HttpRequest } from '@angular/common/http';

export const accessToken = 'coded.access';
export const refreshToken = 'coded.refresh';

export const addToken = (request: HttpRequest<unknown>, token: string) => {
    return request.clone({
        setHeaders: {
            Authorization: `Bearer ${token}`,
        },
    });
};
