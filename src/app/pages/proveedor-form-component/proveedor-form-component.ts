import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProveedorService } from '../../services/proveedor.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProveedorRequest } from '../proveedor.interface';

@Component({
  selector: 'app-proveedor-form-component',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './proveedor-form-component.html',
})
export class ProveedorFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private proveedorService = inject(ProveedorService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  public idProveedor: number = 0;
  public esEdicion: boolean = false;

  public proveedorForm: FormGroup = this.fb.group({
    NOMBREPROVEEDOR: ['', [Validators.required]],
    TELEFONO: ['', [Validators.required]],
    EMAIL: ['', [Validators.required, Validators.email]],
  });

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.idProveedor = parseInt(idParam);
      this.esEdicion = true;
      this.cargarDatos(this.idProveedor);
    }
  }

  cargarDatos(id: number) {
    this.proveedorService.getProveedores().subscribe((res: any) => {
      const lista = Array.isArray(res) ? res : (res.data || []);
      const prov = lista.find((p: any) => p.ID_PROVEEDOR === id);
      if (prov) this.proveedorForm.patchValue(prov);
    });
  }

  guardar() {
    if (this.proveedorForm.invalid) return;

    const request: ProveedorRequest = {
      ...this.proveedorForm.value,
      PROCESO: this.esEdicion ? 2 : 1,
      ID_PROVEEDOR: this.idProveedor
    };

    this.proveedorService.accionProveedor(request).subscribe({
      next: () => this.router.navigate(['/Proveedor-lista']),
      error: (err) => console.error(err)
    });
  }

  cancelar() {
    this.router.navigate(['/Proveedor-lista']);
  }
}