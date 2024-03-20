import { HttpInterceptorFn } from '@angular/common/http';
import { retry } from 'rxjs';
import { ErrorModel } from '@core/error/model';
import { inject } from '@angular/core';
import { MessageService } from 'primeng/api';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
    const messageService = inject(MessageService);
    return next(req).pipe(
        retry({
            delay: (httpError) => {
                const error: ErrorModel =
                    typeof httpError.error === 'string'
                        ? JSON.parse(httpError.error)
                        : httpError.error;
                switch (error?.statusCode) {
                    case 401:
                        throw httpError;
                    case 500:
                        messageService.add({
                            severity: 'error',
                            detail: 'Произошла ошибка на сервере, повторите попытку позже',
                        });
                        break;
                    default:
                        messageService.add({
                            severity: 'error',
                            detail:
                                error?.message ||
                                'Произошла ошибка на сервере, повторите попытку позже',
                        });
                }
                throw httpError;
            },
        }),
    );
};
