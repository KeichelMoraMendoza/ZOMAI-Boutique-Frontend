import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { CategoriaService } from '../../services/categoria.service'; 
import { Categoria } from '../categoria.interface';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categoria-lista-component',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './categoria-lista-component.html',
  styleUrl: './categoria-lista-component.css',
})
export class CategoriaListaComponent implements OnInit {

  private categoriaService = inject(CategoriaService);
  private cdr = inject(ChangeDetectorRef);
  private router = inject(Router);

  pageNumber: number = 1; 
  pageSize: number = 10;
  categorias: Categoria[] = [];

  ngOnInit(): void {
    this.cargarCategorias();
  }

  cargarCategorias() {
    this.categoriaService.getCategorias(this.pageNumber, this.pageSize).subscribe({
      next: (response: any) => {
        console.log("Respuesta cruda de la API ZOMAI (Categorías):", response);

        if (response && response.data) {
          this.categorias = response.data;
        } else if (Array.isArray(response)) {
          this.categorias = response;
        } else if (response && response.resultado) {
          this.categorias = response.resultado;
        } else {
          this.categorias = [];
        }

        console.log("Categorías procesadas para la tabla:", this.categorias);
        this.cdr.detectChanges(); 
      },
      error: (error) => {
        console.error("Error al cargar categorías de ZOMAI:", error);
        this.categorias = [];
      }
    });
  }

  eliminarCategoria(idRecibido: any) { 
    const idLimpio = parseInt(idRecibido.toString().split(':')[0], 10);

    if (isNaN(idLimpio) || idLimpio <= 0) {
      console.error("El ID procesado no es válido:", idLimpio);
      return;
    }

    if (confirm(`¿Seguro que deseas eliminar la categoría #${idLimpio}?`)) {
      this.categoriaService.eliminarCategoria(idLimpio).subscribe({
        next: () => {
          console.log("✅ Categoría eliminada con éxito");
          this.cargarCategorias(); 
        },
        error: (err) => {
          console.error("❌ Error en la API de ZOMAI:", err);
        }
      });
    }
  }

  editarCategoria(id: number) {
    this.router.navigate(['/Categoria-form', id]); 
  }

  nuevaCategoria() {
    this.router.navigate(['/Categoria-form']);
  }
}