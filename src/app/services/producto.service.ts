import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductoListaResponse, ProductoRequest } from '../pages/producto.interface';
import { AuthService } from './auth-service';

@Injectable({
  providedIn: 'root',
})
export class ProductoService {
  
  private readonly ApiUrl = 'https://localhost:7023/api/Producto'; 
  private http = inject(HttpClient);
  private authService = inject(AuthService);

  private getHeaders() {
    const token = this.authService.getToken();
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  getProductos(pageNumber?: number, pageSize?: number): Observable<ProductoListaResponse> { 
    let params = new HttpParams();
    if (pageNumber) params = params.set('pageNumber', pageNumber);
    if (pageSize) params = params.set('pageSize', pageSize);

    return this.http.get<ProductoListaResponse>(this.ApiUrl, { params, headers: this.getHeaders() });
  }

  accionProducto(data: ProductoRequest): Observable<any> {
    return this.http.post(this.ApiUrl, data, { headers: this.getHeaders() });
  }

  eliminarProducto(id: number): Observable<any> {
  const url = `${this.ApiUrl}/${id}`;
  const params = new HttpParams().set('IDProducto', id);
  console.log("URL Final que sale al servidor:", url); // Esto es para que verifiques en consola
  return this.http.delete(url, { headers: this.getHeaders() });  }
}