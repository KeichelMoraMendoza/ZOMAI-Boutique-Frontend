import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ProveedorListaResponse, ProveedorRequest } from '../pages/proveedor.interface';
import { AuthService } from './auth-service';

@Injectable({
  providedIn: 'root',
})
export class ProveedorService {
  private readonly ApiUrl = 'https://localhost:7023/api/Proveedor'; 
  private http = inject(HttpClient);
  private authService = inject(AuthService);

  private getHeaders() {
    const token = this.authService.getToken();
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  getProveedores(pageNumber?: number, pageSize?: number): Observable<ProveedorListaResponse> { 
    let params = new HttpParams();
    if (pageNumber) params = params.set('pageNumber', pageNumber);
    if (pageSize) params = params.set('pageSize', pageSize);

    return this.http.get<ProveedorListaResponse>(this.ApiUrl, { params, headers: this.getHeaders() });
  }

  accionProveedor(data: ProveedorRequest): Observable<any> {
    return this.http.post(this.ApiUrl, data, { headers: this.getHeaders() });
  }

  eliminarProveedor(id: number): Observable<any> {
    const params = new HttpParams().set('IDProveedor', id);
    return this.http.delete(this.ApiUrl, { params, headers: this.getHeaders() });
  }
}