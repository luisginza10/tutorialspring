import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EntidadComponent } from './components/entidad/entidad.component';
import { FormentidadComponent } from './components/entidad/formentidad.component';
import { LoginComponent } from './components/usuarios/login.component';
import { DetallefacturaComponent } from './components/facturas/detallefactura.component';
import { AuthGuard } from './components/usuarios/guards/auth.guard';
import { FacturasComponent } from './components/facturas/facturas.component';


const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'entidad', component: EntidadComponent, canActivate:[AuthGuard]},
  {path: 'entidad/page/:page', component: EntidadComponent},
  {path: 'entidad/formentidad', component: FormentidadComponent},
  {path: 'entidad/formentidad/:id', component: FormentidadComponent},
  {path: 'facturas/:id', component: DetallefacturaComponent},
  {path: 'facturas/form/:entidadId', component: FacturasComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
