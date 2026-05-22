import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { ProductoService } from '../../services/producto.service'; 
import { Producto } from '../producto.interface';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-producto-lista-component',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './producto-lista-component.html',
  styleUrl: './producto-lista-component.css',
})
export class ProductoListaComponent implements OnInit {

  private productoService = inject(ProductoService);
  private cdr = inject(ChangeDetectorRef);
  private router = inject(Router);

  pageNumber: number = 1; 
  pageSize: number = 10;
  productos: Producto[] = [];

  ngOnInit(): void {
    this.cargarProductos();
  }

  cargarProductos() {
    this.productoService.getProductos(this.pageNumber, this.pageSize).subscribe({
      next: (response: any) => {
        console.log("Respuesta cruda de la API ZOMAI:", response);

        if (response && response.data) {
          this.productos = response.data;
        } else if (Array.isArray(response)) {
          this.productos = response;
        } else if (response && response.resultado) {
          this.productos = response.resultado;
        } else {
          this.productos = [];
        }

        console.log("Productos procesados para la tabla:", this.productos);
        this.cdr.detectChanges(); 
      },
      error: (error) => {
        console.error("Error al cargar productos de ZOMAI:", error);
        this.productos = [];
      }
    });
  }

eliminarProducto(idRecibido: any) { 
  const idLimpio = parseInt(idRecibido.toString().split(':')[0], 10);

  if (isNaN(idLimpio) || idLimpio <= 0) {
    console.error("El ID procesado no es válido:", idLimpio);
    return;
  }

  if (confirm(`¿Seguro que deseas eliminar el producto #${idLimpio}?`)) {
    this.productoService.eliminarProducto(idLimpio).subscribe({
      next: () => {
        console.log("✅ Eliminado con éxito");
        this.cargarProductos(); 
      },
      error: (err) => {
        console.error("❌ Error en la API:", err);
      }
    });
  }
}

editarProducto(id: number) {
  this.router.navigate(['/Producto-form', id]); 
}

  nuevaProducto() {
    this.router.navigate(['/Producto-form']);
  }
}