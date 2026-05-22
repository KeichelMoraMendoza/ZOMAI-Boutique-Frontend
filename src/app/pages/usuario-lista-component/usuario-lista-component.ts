import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service'; //
import { Usuario } from '../usuario.interface'; //
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-usuario-lista-component',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './usuario-lista-component.html',
  styleUrl: './usuario-lista-component.css',
})
export class UsuarioListaComponent implements OnInit {

  private usuarioService = inject(UsuarioService);
  private cdr = inject(ChangeDetectorRef);
  private router = inject(Router);

  pageNumber: number = 1; 
  pageSize: number = 10;
  usuarios: Usuario[] = [];

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  cargarUsuarios() {
    this.usuarioService.getUsuarios(this.pageNumber, this.pageSize).subscribe({
      next: (response: any) => {
        console.log("Respuesta cruda de la API ZOMAI (Usuarios):", response);

        if (response && response.data) {
          this.usuarios = response.data;
        } else if (Array.isArray(response)) {
          this.usuarios = response;
        } else if (response && response.resultado) {
          this.usuarios = response.resultado;
        } else {
          this.usuarios = [];
        }

        console.log("Usuarios procesados para la tabla:", this.usuarios);
        this.cdr.detectChanges(); 
      },
      error: (error) => {
        console.error("Error al cargar usuarios de ZOMAI:", error);
        this.usuarios = [];
      }
    });
  }

  eliminarUsuario(idRecibido: any) { 
    const idLimpio = parseInt(idRecibido.toString().split(':')[0], 10);

    if (isNaN(idLimpio) || idLimpio <= 0) {
      console.error("El ID procesado no es válido:", idLimpio);
      return;
    }

    if (confirm(`¿Seguro que deseas eliminar el usuario #${idLimpio}?`)) {
      this.usuarioService.eliminarUsuario(idLimpio).subscribe({
        next: () => {
          console.log("✅ Usuario eliminado con éxito");
          this.cargarUsuarios(); 
        },
        error: (err) => {
          console.error("❌ Error en la API de Usuarios:", err);
        }
      });
    }
  }

  editarUsuario(id: number) {
    this.router.navigate(['/Usuario-form', id]); 
  }

  nuevoUsuario() {
    this.router.navigate(['/Usuario-form']);
  }
}