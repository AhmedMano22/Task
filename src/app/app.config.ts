import { APP_INITIALIZER, ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { routes } from './app.routes';
import {  AuthConfig, OAuthModule, OAuthStorage, provideOAuthClient } from 'angular-oauth2-oidc';
import { provideHttpClient, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';
import { authConfig } from './core/config/auth.config';
import { StorageService } from './core/services/storage.service';
import { StatehandlerService, StatehandlerServiceImpl } from './core/services/statehandler.service';
import { StatehandlerProcessorService, StatehandlerProcessorServiceImpl } from './core/services/statehandler-processor.service';
const stateHandlerFn = (stateHandler: StatehandlerService) => {
  return () => {
    return stateHandler.initStateHandler();
  };
};
export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),
    
    provideOAuthClient({
      ...authConfig,
      resourceServer: {
        allowedUrls: [],
        sendAccessToken: true
      }
    }),
     provideAnimationsAsync(),
     importProvidersFrom(BrowserAnimationsModule),
     provideAnimations(),
      {
            provide: APP_INITIALIZER,
            useFactory: stateHandlerFn,
            multi: true,
            deps: [StatehandlerService],
        },
        {
            provide: AuthConfig,
            useValue: authConfig,
        },
        {
            provide: StatehandlerProcessorService,
            useClass: StatehandlerProcessorServiceImpl,
        },
        {
            provide: StatehandlerService,
            useClass: StatehandlerServiceImpl,
        },
        {
            provide: OAuthStorage,
            useClass: StorageService,
        },
        provideHttpClient(withInterceptorsFromDi()),
  ]
};
