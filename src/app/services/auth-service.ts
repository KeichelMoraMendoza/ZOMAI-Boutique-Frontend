import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { LoginRequest, LoginResponse, Usuario } from '../interface/auth/auth.interface';
import { Observable, tap, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  

  private UrlBase: string = 'https://localhost:7023/api/Login'; 
  private tokenKey: string = 'authToken'; 
  
  private http = inject(HttpClient);

  login(data: any): Observable<Usuario> {
    return this.http.post<LoginResponse>(this.UrlBase, data).pipe(
      tap(response => {

        if (response && response.token) {
          localStorage.setItem(this.tokenKey, response.token);
        }
      }),
      map(res => res.usuario[0])
    );
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
  }
}