import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductoService } from '../../services/producto.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductoRequest } from '../producto.interface';

@Component({
  selector: 'app-producto-form-component',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './producto-form-component.html',
})
export class ProductoFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private productoService = inject(ProductoService);
  private router = inject(Router);
  private route = inject(ActivatedRoute); 

  public idProducto: number = 0; 
  public esEdicion: boolean = false;

  public productoForm: FormGroup = this.fb.group({
    NOMBRE: ['', [Validators.required]],
    DESCRIPCION: ['', [Validators.required]],
    PRECIO: [0, [Validators.required, Validators.min(1)]],
    STOCKMINIMO: [5, [Validators.required]],
    STOCKACTUAL: [0, [Validators.required]],
    TALLA: ['M', [Validators.required]],
    COLOR: ['', [Validators.required]],
    ID_CATEGORIA: [1, [Validators.required]],
    ID_PROVEEDOR: [1, [Validators.required]],
    IMAGEN: ['']
  });

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.idProducto = parseInt(idParam);
      this.esEdicion = true;
      this.cargarDatosProducto(this.idProducto);
    }
  }

cargarDatosProducto(id: number) {
  (this.productoService as any).getProductos().subscribe((res: any) => {    
    const productosArray = Array.isArray(res) ? res : res.data; 

    if (productosArray) {
      const prod = productosArray.find((p: any) => p.ID_PRODUCTO === id);
      if (prod) {
        this.productoForm.patchValue(prod);
        console.log("Producto cargado para edición:", prod);
      }
    }
  }); 
}
  guardarProducto() {
    if (this.productoForm.invalid) return;

    const datosProducto: ProductoRequest = {
      ...this.productoForm.value,
      PROCESO: this.esEdicion ? 2 : 1, 
      ID_PRODUCTO: this.idProducto,
      respuesta: ''
    };

    this.productoService.accionProducto(datosProducto).subscribe({
      next: (res) => {
        console.log("Acción realizada con éxito:", res);
        this.router.navigate(['/Producto-lista']);
      },
      error: (err) => console.error("Error:", err)
    });
  }

  cancelar() {
    this.router.navigate(['/Producto-lista']);
  }
}