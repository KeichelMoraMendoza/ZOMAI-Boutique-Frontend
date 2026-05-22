export interface ProductoListaResponse {
  data           : Producto[];
  totalRecords   : number;
  pageNumber     : number;
  pageSize       : number;
  totalPages     : number;
}


export interface Producto {
  ID_PRODUCTO    : number;
  NOMBRE         : string;
  DESCRIPCION    : string;
  PRECIO         : number;
  STOCKMINIMO    : number;
  STOCKACTUAL    : number;
  TALLA          : string;
  COLOR          : string;
  IMAGEN         : string;
  ID_CATEGORIA   : number;
  ID_PROVEEDOR   : number;
}


export interface ProductoRequest {
  PROCESO        : number; 
  ID_PRODUCTO    : number;
  NOMBRE         : string;
  DESCRIPCION    : string;
  PRECIO         : number;
  STOCKMINIMO    : number;
  STOCKACTUAL    : number;
  TALLA          : string;
  COLOR          : string;
  IMAGEN         : string;
  ID_CATEGORIA   : number;
  ID_PROVEEDOR   : number;
  RESPUESTA?     : string; 
}