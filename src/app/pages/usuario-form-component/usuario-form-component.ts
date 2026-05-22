import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UsuarioRequest } from '../usuario.interface';

@Component({
  selector: 'app-usuario-form-component',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './usuario-form-component.html',
})
export class UsuarioFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private usuarioService = inject(UsuarioService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  public idUsuario: number = 0;
  public esEdicion: boolean = false;

  public usuarioForm: FormGroup = this.fb.group({
    NombreUsuario: ['', [Validators.required]],
    NombreCompleto: ['', [Validators.required]],
    CorreoElectronico: ['', [Validators.required, Validators.email]],
    ContrasenaHash: ['', [Validators.required]], // Para nuevos usuarios
    Rol: ['Vendedor', [Validators.required]],
    Activo: [1, [Validators.required]]
  });

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.idUsuario = parseInt(idParam);
      this.esEdicion = true;
      this.usuarioForm.get('ContrasenaHash')?.clearValidators();
      this.usuarioForm.get('ContrasenaHash')?.updateValueAndValidity();
      this.cargarDatosUsuario(this.idUsuario);
    }
  }

  cargarDatosUsuario(id: number) {
    this.usuarioService.getUsuarios().subscribe((res: any) => {    
      const usuariosArray = Array.isArray(res) ? res : res.data; 

      if (usuariosArray) {
        const user = usuariosArray.find((u: any) => u.ID_USUARIO === id);
        if (user) {
          this.usuarioForm.patchValue(user);
          console.log("Usuario cargado para edición:", user);
        }
      }
    }); 
  }

  guardarUsuario() {
    if (this.usuarioForm.invalid) return;

    const datosUsuario: UsuarioRequest = {
      ...this.usuarioForm.value,
      PROCESO: this.esEdicion ? 2 : 1, 
      ID_USUARIO: this.idUsuario,
      RESPUESTA: ''
    };

    this.usuarioService.accionUsuario(datosUsuario).subscribe({
      next: (res) => {
        console.log("Usuario guardado en ZOMAI:", res);
        this.router.navigate(['/Usuario-lista']);
      },
      error: (err) => console.error("Error en la operación de usuario:", err)
    });
  }

  cancelar() {
    this.router.navigate(['/Usuario-lista']);
  }
}