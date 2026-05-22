
// Una interfaz que define la estructura de una solicitud de inicio de sesion
export interface LoginRequest{

    usuario      : string; // El nombre del usuario que intenta iniciar sesion
    clave        : string; // La contraseña del usuario que intenta iniciar sesion
    modulo       : string; // El modulo al que ell usuario desea acceder
    unidad       : string; // La  unidad a la que el usuario pertenece
    respuesta    : string; // La respuesta a una pregunta de seguridad o captura para verificar que el usuario no es un bot
  
}

// una interface que define la estructura de una solicurud de inicio de sesion
export interface LoginResponse{

    token        : string; // El token de autenticacion que se devuelve al usuario despues de un inicio de sesion exitoso
    usuario      : Usuario[]; // El nombre de usuario del usuario que ha 
}

export interface Usuario{

    usuario      : string; // El nombre de usuario de usuario
    claveSecreta : string; // La contraseña del usuario
    nombre       : string; // El nombre completo del usuario
    modulo       : string; // El moduo al que el usuario tiene acceso
}