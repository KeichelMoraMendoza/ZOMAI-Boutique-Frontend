import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth-service';
import { routes } from '../../app.routes';
import { Router } from '@angular/router';

@Component({
  selector: 'app-app-header-component',
  imports: [],
  templateUrl: './app-header-component.html',
  styleUrl: './app-header-component.css',
})
export class AppHeaderComponent {

  private auth = inject(AuthService);  
  private router = inject(Router); 

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/login']); 
  }
}
