import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth-service';

export const authGuardGuard: CanActivateFn = (route, state) => {
  
  const auth = inject( AuthService); // inyecta el servicio de autenticacion para verificar el 
  const router = inject(Router); // inyecta el servicio de enrutamiento para redirigir al usuario

  const token = auth.getToken(); // obtiene el token de autenticacion amacenado

  if(!token){ // si no hay token el usuario no esta autenticado
    router.navigate(["/login"]); // redirifge al usuario a la pagina de inicio de sesion
    return false; // retorna false para impedir el acceso a la ruta protegida
  }
  
  return true;
};
