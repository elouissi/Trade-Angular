import { inject } from '@angular/core';
import { Router } from '@angular/router';
import {AuthService} from "../service/auth/auth.service";

export const traderGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (  authService.getRole()=="TRADER" ) {
    return true;
  }else {
    return router.parseUrl('/home');
  }


};
