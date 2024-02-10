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
                const error: ErrorModel = httpError.error;
                switch (error.statusCode) {
                    case 401:
                        throw httpError;
                    case 500:
                        messageService.add({
                            severity: 'error',
                            summary: `Ошибка сервера`,
                            detail: 'Произошла ошибка, повторите попытку позже',
                        });
                        break;
                    default:
                        messageService.add({
                            severity: 'error',
                            summary: `Ошибка ${error.statusCode}`,
                            detail: error.message,
                        });
                }
                throw httpError;
            },
        }),
    );
};
