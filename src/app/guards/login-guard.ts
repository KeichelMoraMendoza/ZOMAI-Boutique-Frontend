import { inject } from '@angular/core';
import { CanActivateFn, RouteConfigLoadEnd, Router } from '@angular/router';
import { AuthService } from '../services/auth-service';

export const loginGuard: CanActivateFn = (route, state) => {

  const auth = inject(AuthService);
  const router = inject(Router);

  const token = auth.getToken();

  if (token){
    router.navigate(['/dashboard']);
    return false;
  }


  return true;
};
