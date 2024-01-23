import {ApplicationConfig, ErrorHandler, importProvidersFrom} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import {InternalErrorComponent} from "./error/internal-error/internal-error.component";
import {MobileService} from "./services/mobile.service";
import {MessageService} from "primeng/api";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), provideAnimations(), importProvidersFrom(HttpClientModule), provideAnimations(),
    {provide: ErrorHandler, useClass: InternalErrorComponent}, MobileService, MessageService
  ],
};
