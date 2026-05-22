import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoriaListaResponse, CategoriaRequest } from '../pages/categoria.interface'; 
import { AuthService } from './auth-service';

@Injectable({
  providedIn: 'root',
})
export class CategoriaService {
  
  private readonly ApiUrl = 'https://localhost:7023/api/Categoria'; 
  private http = inject(HttpClient);
  private authService = inject(AuthService);

  private getHeaders() {
    const token = this.authService.getToken();
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  getCategorias(pageNumber?: number, pageSize?: number): Observable<CategoriaListaResponse> { 
    let params = new HttpParams();
    if (pageNumber) params = params.set('pageNumber', pageNumber);
    if (pageSize) params = params.set('pageSize', pageSize);

    return this.http.get<CategoriaListaResponse>(this.ApiUrl, { params, headers: this.getHeaders() });
  }

  accionCategoria(data: CategoriaRequest): Observable<any> {
    return this.http.post(this.ApiUrl, data, { headers: this.getHeaders() });
  }

  eliminarCategoria(id: number): Observable<any> {
    const url = `${this.ApiUrl}/${id}`;
    console.log("URL Final de Categoría enviada al servidor:", url); 
    return this.http.delete(url, { headers: this.getHeaders() });
  }
}