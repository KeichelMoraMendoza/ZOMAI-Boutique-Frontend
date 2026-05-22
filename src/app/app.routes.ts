import { Proveedor } from './pages/proveedor.interface';
import { Routes } from '@angular/router';
import { DashboardPageComponent } from './pages/dashboard-page-component/dashboard-page-component';
import { NoPageFoundComponent } from './no-page-found-component/no-page-found-component';
import { LoginPageComponent } from './auth/login-page-component/login-page-component';
import { PagesComponent } from './pages/pages-component';
import { authGuardGuard } from './guards/auth-guard-guard';
import { loginGuard } from './guards/login-guard';
import { ProductoListaComponent } from './pages/producto-lista-component/producto-lista-component';
import { ProductoFormComponent } from './pages/producto-form-component/producto-form-component';
import { ProveedorListaComponent } from './pages/proveedor-lista-component/proveedor-lista-component';
import { ProveedorFormComponent } from './pages/proveedor-form-component/proveedor-form-component';
import { CategoriaListaComponent } from './pages/categoria-lista-component/categoria-lista-component';
import { CategoriaFormComponent } from './pages/categoria-form-component/categoria-form-component';
import { UsuarioListaComponent } from './pages/usuario-lista-component/usuario-lista-component';
import { UsuarioFormComponent } from './pages/usuario-form-component/usuario-form-component';



export const routes: Routes = [
    {
        path: 'login',
        component: LoginPageComponent, 
        canActivate : [ loginGuard], 
    
    },
    {
        path: '',
        component: PagesComponent, 
        canActivate: [ authGuardGuard], 
        children: [ 
            {
                path:'dashboard', 
                component: DashboardPageComponent 
            },
            {
                path: 'Producto-lista', 
                component: ProductoListaComponent
            },
            {
                path: 'Producto-form', 
                component: ProductoFormComponent
            },
            {   path: 'Producto-form/:id',
                component: ProductoFormComponent 
            },
            {   path: 'Proveedor-lista',
                component: ProveedorListaComponent
            },
            {   path: 'Proveedor-form', 
                component: ProveedorFormComponent 
            },
            {   path: 'Proveedor-form/:id', 
                component: ProveedorFormComponent 
            },
            {   path: 'Categoria-lista',
                component: CategoriaListaComponent
            },
            {   path: 'Categoria-form', 
                component: CategoriaFormComponent 
            },
            {   path: 'Categoria-form/:id', 
                component: CategoriaFormComponent 
            },
            {   path: 'Usuario-lista',
                component: UsuarioListaComponent
            },
            {   path: 'Usuario-form', 
                component: UsuarioFormComponent 
            },
            {   path: 'Usuario-form/:id', 
                component: UsuarioFormComponent 
            },
            {
                path:'', 
                redirectTo: 'dashboard', 
                pathMatch: 'full' 
            },
        ]
    },
    {
        path: '""',
        component: NoPageFoundComponent 
    }
    
];
