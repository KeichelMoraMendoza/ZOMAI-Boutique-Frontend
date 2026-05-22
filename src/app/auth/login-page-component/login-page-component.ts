import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth-service';
import { Router } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-page-component',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login-page-component.html',
  styleUrl: './login-page-component.css',
})
export class LoginPageComponent {
  private auth = inject(AuthService);
  private router = inject(Router);
  private fb = inject(FormBuilder);

  public loginForm = this.fb.group({
    usuario: ['CARLOS', Validators.required],
    clave: ['CARLOS', Validators.required],
  });

  login() {
    if (this.loginForm.invalid) return;

    const loginData = {
      usuario: this.loginForm.value.usuario,
      clave: this.loginForm.value.clave
    };

    this.auth.login(loginData).subscribe({
      next: () => {
        console.log("¡Acceso concedido a ZOMAI!");
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        console.error("Error al iniciar sesión. Verifica que la API esté en 'Play'", err);
      }
    });
  }
}