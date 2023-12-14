import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './components/inicio/inicio/inicio.component';
import { ClientesMenuComponent } from './components/clientes/clientes-menu/clientes-menu.component';
import { ClientesAltaComponent } from './components/clientes/clientes-alta/clientes-alta.component';
import { ClientesModifComponent } from './components/clientes/clientes-modif/clientes-modif.component';
import { ClientesBajaComponent } from './components/clientes/clientes-baja/clientes-baja.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { LoginComponent } from './components/login/login/login.component';
import { ActividadesMenuComponent } from './components/actividades/actividades-menu/actividades-menu.component';
import { ActividadesAltaComponent } from './components/actividades/actividades-alta/actividades-alta.component';
import { ActividadesModifComponent } from './components/actividades/actividades-modif/actividades-modif.component';
import { ActividadesBajaComponent } from './components/actividades/actividades-baja/actividades-baja.component';
import { TiposActividadMenuComponent } from './components/tipos-actividad/tipos-actividad-menu/tipos-actividad-menu.component';
import { TiposActividadAltaComponent } from './components/tipos-actividad/tipos-actividad-alta/tipos-actividad-alta.component';
import { TiposActividadModifComponent } from './components/tipos-actividad/tipos-actividad-modif/tipos-actividad-modif.component';
import { TiposActividadBajaComponent } from './components/tipos-actividad/tipos-actividad-baja/tipos-actividad-baja.component';
import { EmpresaMenuComponent } from './components/empresa/empresa-menu/empresa-menu.component';
import { EmpresaAltaComponent } from './components/empresa/empresa-alta/empresa-alta.component';
import { EmpresaModifComponent } from './components/empresa/empresa-modif/empresa-modif.component';
import { MaterialesMenuComponent } from "./components/materiales/materiales-menu/materiales-menu.component";
import { MaterialesAltaComponent } from './components/materiales/materiales-alta/materiales-alta.component';
import { MaterialesModifComponent } from './components/materiales/materiales-modif/materiales-modif.component';
import { MaterialesBajaComponent } from './components/materiales/materiales-baja/materiales-baja.component';
import { UbicacionesMenuComponent } from "./components/ubicaciones/ubicaciones-menu/ubicaciones-menu.component";
import { UbicacionesAltaComponent } from "./components/ubicaciones/ubicaciones-alta/ubicaciones-alta.component";
import { UbicacionesBajaComponent } from "./components/ubicaciones/ubicaciones-baja/ubicaciones-baja.component";
import { UbicacionesModifComponent } from './components/ubicaciones/ubicaciones-modif/ubicaciones-modif.component';
import { IvasMenuComponent } from './components/ivas/ivas-menu/ivas-menu.component';
import { IvasAltaComponent } from './components/ivas/ivas-alta/ivas-alta.component';
import {IvasBajaComponent} from './components/ivas/ivas-baja/ivas-baja.component';
import { IvasModifComponent } from './components/ivas/ivas-modif/ivas-modif.component';
import { GuiasMenuComponent } from './components/guias/guias-menu/guias-menu.component';
import { GuiasAltaComponent } from './components/guias/guias-alta/guias-alta.component';
import { GuiasModifComponent } from './components/guias/guias-modif/guias-modif.component';
import { GuiasBajaComponent } from './components/guias/guias-baja/guias-baja.component';
import { ReservasMenuComponent } from './components/reservas/reservas-menu/reservas-menu.component';
import { ReservasAltaComponent } from './components/reservas/reservas-alta/reservas-alta.component';
import { ReservasModifComponent } from './components/reservas/reservas-modif/reservas-modif.component';
import { ReservasBajaComponent } from './components/reservas/reservas-baja/reservas-baja.component';
import { FacturasMenuComponent } from './components/facturas/facturas-menu/facturas-menu.component';
import { FacturasModifComponent } from './components/facturas/facturas-modif/facturas-modif.component';
import { GestorsMenuComponent } from './components/gestors/gestors-menu/gestors-menu.component';
import { GestorsModifComponent } from './components/gestors/gestors-modif/gestors-modif.component';
import { GestorsAltaComponent } from './components/gestors/gestors-alta/gestors-alta.component';
import { GestorsBajaComponent } from './components/gestors/gestors-baja/gestors-baja.component';
import { PublicidadMenuComponent } from './components/publicidad/publicidad-menu/publicidad-menu.component';
import { PublicidadAltaComponent } from './components/publicidad/publicidad-alta/publicidad-alta.component';
import { PublicidadModifComponent } from './components/publicidad/publicidad-modif/publicidad-modif.component';
import { PublicidadBajaComponent } from './components/publicidad/publicidad-baja/publicidad-baja.component';
import { loginGuard } from 'src/guards/login.guard';

const routes: Routes = [
  /**Ruta para Login */
  { path: 'login', component: LoginComponent },

  /**Ruta para página de inicio */
  { path: '', component: InicioComponent },

  /**Ruta para Empresa */
  {path: 'empresa', component: EmpresaMenuComponent, canActivate:[loginGuard] },
  { path: 'empresa/alta', component: EmpresaAltaComponent, canActivate:[loginGuard] },
  { path: 'empresa/modif/:id', component: EmpresaModifComponent, canActivate:[loginGuard] },

  /**Ruta para gestor */
  { path: 'gestor', component: GestorsMenuComponent, canActivate:[loginGuard] },
  { path: 'gestor/alta', component: GestorsAltaComponent, canActivate:[loginGuard] },
  { path: 'gestor/modif/:id', component: GestorsModifComponent, canActivate:[loginGuard] },
  { path: 'gestor/baja/:id', component:GestorsBajaComponent, canActivate:[loginGuard]},

  /**Ruta para actividades */
  { path: 'actividades', component: ActividadesMenuComponent },
  { path: 'actividades/alta', component: ActividadesAltaComponent, canActivate:[loginGuard] },
  { path: 'actividades/modif/:id', component: ActividadesModifComponent },
  { path: 'actividades/baja/:id', component: ActividadesBajaComponent, canActivate:[loginGuard] },

  /**Ruta para tipos de actividad */
  { path: 'tipos', component: TiposActividadMenuComponent, canActivate:[loginGuard]},
  { path: 'tipos/alta', component: TiposActividadAltaComponent, canActivate:[loginGuard]},
  { path: 'tipos/modif/:id', component: TiposActividadModifComponent, canActivate:[loginGuard] },
  { path: 'tipos/baja/:id', component: TiposActividadBajaComponent, canActivate:[loginGuard] },
  
  /**Ruta para materiales */
  { path: 'materiales', component: MaterialesMenuComponent },
  { path: 'materiales/alta', component: MaterialesAltaComponent, canActivate:[loginGuard] },
  { path: 'materiales/modif/:id', component: MaterialesModifComponent },
  { path: 'materiales/baja/:id', component: MaterialesBajaComponent, canActivate:[loginGuard] },

  /**Ruta para ubicaciones */
  { path: 'ubicaciones', component: UbicacionesMenuComponent  },
  { path: 'ubicaciones/alta', component: UbicacionesAltaComponent, canActivate:[loginGuard] },
  { path: 'ubicaciones/modif/:id', component: UbicacionesModifComponent },
  { path: 'ubicaciones/baja/:id', component: UbicacionesBajaComponent, canActivate:[loginGuard] },

  /**Ruta para ivas */
  {path: 'ivas', component: IvasMenuComponent, canActivate:[loginGuard]},
  {path: 'ivas/alta', component: IvasAltaComponent, canActivate:[loginGuard]},
  {path: 'ivas/modif/:id', component: IvasModifComponent, canActivate:[loginGuard]},
  {path: 'ivas/baja/:id', component: IvasBajaComponent, canActivate:[loginGuard]},

  /**Ruta para guias */
  { path: 'guias', component: GuiasMenuComponent, canActivate:[loginGuard] },
  { path: 'guias/alta', component: GuiasAltaComponent, canActivate:[loginGuard] },
  { path: 'guias/modif/:id', component: GuiasModifComponent, canActivate:[loginGuard] },
  { path: 'guias/baja/:id', component: GuiasBajaComponent, canActivate:[loginGuard] },

  /**Ruta para reservas */
  { path: 'reservas', component: ReservasMenuComponent },
  { path: 'reservas/alta', component: ReservasAltaComponent, canActivate:[loginGuard] },
  { path: 'reservas/modif/:id', component: ReservasModifComponent },
  { path: 'reservas/baja/:id', component: ReservasBajaComponent, canActivate:[loginGuard] },

  /**Ruta para facturas */
  { path: 'facturas', component: FacturasMenuComponent, canActivate:[loginGuard] },
  { path: 'facturas/modif/:id', component: FacturasModifComponent, canActivate:[loginGuard] },

  /**Ruta para clientes */
  { path: 'clientes', component: ClientesMenuComponent, canActivate:[loginGuard] },
  { path: 'clientes/alta', component: ClientesAltaComponent, canActivate:[loginGuard] },
  { path: 'clientes/modif/:id', component: ClientesModifComponent, canActivate:[loginGuard] },
  { path: 'clientes/baja/:id', component:ClientesBajaComponent, canActivate:[loginGuard]},

  /**Ruta para publicidad */
  { path: 'publicidad', component: PublicidadMenuComponent, canActivate:[loginGuard] },
  { path: 'publicidad/alta', component: PublicidadAltaComponent, canActivate:[loginGuard] },
  { path: 'publicidad/modif/:id', component: PublicidadModifComponent, canActivate:[loginGuard] },
  { path: 'publicidad/baja/:id', component: PublicidadBajaComponent, canActivate:[loginGuard] },

  /**Ruta para Página no Encontrada */
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
