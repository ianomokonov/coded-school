import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { APP_ROUTES } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { JwtService } from '@jwt/service';
import { provideAnimations } from '@angular/platform-browser/animations';
import { ModuleService } from '@api/index';
import { storeTokensInterceptor, tokenInterceptor } from '@jwt/interceptors';
import { MessageService } from 'primeng/api';
import { errorInterceptor } from '@core/error/interceptor';

export const appConfig: ApplicationConfig = {
    providers: [
        provideRouter(APP_ROUTES),
        provideHttpClient(
            withInterceptors([tokenInterceptor, storeTokensInterceptor, errorInterceptor]),
        ),
        provideAnimations(),
        JwtService,
        ModuleService,
        MessageService,
    ],
};
