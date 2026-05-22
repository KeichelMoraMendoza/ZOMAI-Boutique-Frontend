import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { UsuarioListaResponse, UsuarioRequest } from '../pages/usuario.interface'; //
import { AuthService } from './auth-service';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  
  private readonly ApiUrl = 'https://localhost:7023/api/Usuario'; 
  private http = inject(HttpClient);
  private authService = inject(AuthService);

  private getHeaders() {
    const token = this.authService.getToken();
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  getUsuarios(pageNumber?: number, pageSize?: number): Observable<UsuarioListaResponse> { 
    let params = new HttpParams();
    if (pageNumber) params = params.set('pageNumber', pageNumber);
    if (pageSize) params = params.set('pageSize', pageSize);

    return this.http.get<UsuarioListaResponse>(this.ApiUrl, { params, headers: this.getHeaders() });
  }

  accionUsuario(data: UsuarioRequest): Observable<any> {
    return this.http.post(this.ApiUrl, data, { headers: this.getHeaders() });
  }

  eliminarUsuario(id: number): Observable<any> {
    const url = `${this.ApiUrl}/${id}`;
    console.log("URL de eliminación de Usuario:", url); 
    return this.http.delete(url, { headers: this.getHeaders() });
  }
}