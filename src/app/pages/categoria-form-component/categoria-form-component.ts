import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CategoriaService } from '../../services/categoria.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CategoriaRequest } from '../categoria.interface';

@Component({
  selector: 'app-categoria-form-component',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './categoria-form-component.html',
})
export class CategoriaFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private categoriaService = inject(CategoriaService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  public idCategoria: number = 0;
  public esEdicion: boolean = false;

  public categoriaForm: FormGroup = this.fb.group({
    NOMBRECATEGORIA: ['', [Validators.required]],
    DESCRIPCION: ['', [Validators.required]]
  });

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.idCategoria = parseInt(idParam);
      this.esEdicion = true;
      this.cargarDatosCategoria(this.idCategoria);
    }
  }

  cargarDatosCategoria(id: number) {
    this.categoriaService.getCategorias().subscribe((res: any) => {    
      const categoriasArray = Array.isArray(res) ? res : res.data; 

      if (categoriasArray) {
        const cat = categoriasArray.find((c: any) => c.ID_CATEGORIA === id);
        if (cat) {
          this.categoriaForm.patchValue(cat);
          console.log("Categoría cargada para edición:", cat);
        }
      }
    }); 
  }

  guardarCategoria() {
    if (this.categoriaForm.invalid) return;

    const datosCategoria: CategoriaRequest = {
      ...this.categoriaForm.value,
      PROCESO: this.esEdicion ? 2 : 1, 
      ID_CATEGORIA: this.idCategoria,
      RESPUESTA: ''
    };

    this.categoriaService.accionCategoria(datosCategoria).subscribe({
      next: (res) => {
        console.log("Acción en Categoría exitosa:", res);
        this.router.navigate(['/Categoria-lista']); 
      },
      error: (err) => console.error("Error en ZOMAI Categorías:", err)
    });
  }

  cancelar() {
    this.router.navigate(['/Categoria-lista']);
  }
}