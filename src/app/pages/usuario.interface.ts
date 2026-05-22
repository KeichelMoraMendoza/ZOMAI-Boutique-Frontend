
export interface UsuarioListaResponse {
  data           : Usuario[];
  totalRecords   : number;
  pageNumber     : number;
  pageSize       : number;
  totalPages     : number;
}


export interface Usuario {
  ID_USUARIO        : number;
  NombreUsuario     : string;
  ContrasenaHash    : string;
  CorreoElectronico : string;
  NombreCompleto    : string;
  FechaDeCreacion   : string;
  UltimoAcceso      : string;
  Activo            : number; 
  Rol               : string; 
}


export interface UsuarioRequest {
  PROCESO           : number; 
  ID_USUARIO        : number;
  NombreUsuario     : string;
  ContrasenaHash    : string; 
  CorreoElectronico : string;
  NombreCompleto    : string;
  Activo            : number;
  Rol               : string;
  RESPUESTA?        : string;
}