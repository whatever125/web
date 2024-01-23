import {inject} from '@angular/core';
import { Router } from '@angular/router';
import {AxiosService} from "../axios.service";

export const authGuard = () => {
  const axiosService = inject(AxiosService);
  const router = inject(Router);

  if (axiosService.isAuthenticated()) {
    return true;
  } else {
    return router.parseUrl('/');
  }
};
