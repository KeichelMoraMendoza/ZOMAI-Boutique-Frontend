
export interface CategoriaListaResponse {
  data           : Categoria[];
  totalRecords   : number;
  pageNumber     : number;
  pageSize       : number;
  totalPages     : number;
}


export interface Categoria {
  ID_CATEGORIA    : number;   //
  NOMBRECATEGORIA : string;   //
  DESCRIPCION     : string;   //
}


export interface CategoriaRequest {
  PROCESO         : number;  
  ID_CATEGORIA    : number;
  NOMBRECATEGORIA : string;
  DESCRIPCION     : string;
  RESPUESTA?      : string;  
}