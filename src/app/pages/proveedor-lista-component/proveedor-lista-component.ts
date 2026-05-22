import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { ProveedorService } from '../../services/proveedor.service'; 
import { Proveedor } from '../proveedor.interface'; 
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-proveedor-lista-component',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './proveedor-lista-component.html',
  styleUrl: './proveedor-lista-component.css',
})
export class ProveedorListaComponent implements OnInit {

  private proveedorService = inject(ProveedorService);
  private cdr = inject(ChangeDetectorRef);
  private router = inject(Router);

  pageNumber: number = 1; 
  pageSize: number = 10;
  proveedores: Proveedor[] = [];

  ngOnInit(): void {
    this.cargarProveedores();
  }

  cargarProveedores() {
    this.proveedorService.getProveedores().subscribe({
      next: (response: any) => {
        console.log("Respuesta cruda de la API ZOMAI (Proveedores):", response);

        if (response && response.data) {
          this.proveedores = response.data;
        } else if (Array.isArray(response)) {
          this.proveedores = response;
        } else if (response && response.resultado) {
          this.proveedores = response.resultado;
        } else {
          this.proveedores = [];
        }

        console.log("Proveedores procesados para la tabla:", this.proveedores);
        this.cdr.detectChanges(); 
      },
      error: (error) => {
        console.error("Error al cargar proveedores de ZOMAI:", error);
        this.proveedores = [];
      }
    });
  }

  eliminarProveedor(idRecibido: any) { 
    const idLimpio = parseInt(idRecibido.toString().split(':')[0], 10);

    if (isNaN(idLimpio) || idLimpio <= 0) {
      console.error("El ID procesado no es válido:", idLimpio);
      return;
    }

    if (confirm(`¿Seguro que deseas eliminar el proveedor #${idLimpio}?`)) {
      this.proveedorService.eliminarProveedor(idLimpio).subscribe({
        next: () => {
          console.log("✅ Proveedor eliminado con éxito");
          this.cargarProveedores(); 
        },
        error: (err) => {
          console.error("❌ Error en la API de proveedores:", err);
        }
      });
    }
  }

  editarProveedor(id: number) {
    this.router.navigate(['/Proveedor-form', id]);
  }

  nuevoProveedor() {
    this.router.navigate(['/Proveedor-form']);
  }
}