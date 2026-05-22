export interface ProveedorListaResponse {
  data: Proveedor[];
  totalRecords: number;
  pageNumber     : number;
  pageSize       : number;
  totalPages     : number;
}

export interface Proveedor {
  ID_PROVEEDOR      : number;
  NOMBREPROVEEDOR   : string;
  TELEFONO          : string;
  EMAIL             : string;
  
}

export interface ProveedorRequest {
  PROCESO           : number; 
  ID_PROVEEDOR      : number;
  NOMBREPROVEEDOR   : string;
  TELEFONO          : string;
  EMAIL             : string;
  RESPUESTA?        : string;
}