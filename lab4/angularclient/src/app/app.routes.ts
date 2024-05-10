import { Routes } from '@angular/router';

import {StartComponent} from "./start/start.component";
import {MainComponent} from "./main/main.component";
import {authGuard} from "./auth/auth.guard";
import {Error404Component} from "./error/error404/error404.component";

export const routes: Routes = [
  {
    path: '',
    title: 'Start Page',
    component: StartComponent,
  },
  {
    path: 'main',
    title: 'Main Page',
    component: MainComponent,
    canActivate: [authGuard],
  },
  {
    path: '**',
    title: 'Page Not Found',
    component: Error404Component,
  }
];
