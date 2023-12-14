import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgxPaginationModule } from 'ngx-pagination';

import { ClientesAltaComponent } from './components/clientes/clientes-alta/clientes-alta.component';
import { ClientesModifComponent } from './components/clientes/clientes-modif/clientes-modif.component';
import { ClientesMenuComponent } from './components/clientes/clientes-menu/clientes-menu.component';
import { LoginComponent } from './components/login/login/login.component';
import { MenuComponent } from './components/menu/menu.component';
import { InicioComponent } from './components/inicio/inicio/inicio.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ActividadesMenuComponent } from './components/actividades/actividades-menu/actividades-menu.component';
import { ActividadesAltaComponent } from './components/actividades/actividades-alta/actividades-alta.component';
import { ActividadesModifComponent } from './components/actividades/actividades-modif/actividades-modif.component';
import { TiposActividadAltaComponent } from './components/tipos-actividad/tipos-actividad-alta/tipos-actividad-alta.component';
import { TiposActividadMenuComponent } from './components/tipos-actividad/tipos-actividad-menu/tipos-actividad-menu.component';
import { TiposActividadModifComponent } from './components/tipos-actividad/tipos-actividad-modif/tipos-actividad-modif.component';
import { MaterialesAltaComponent } from './components/materiales/materiales-alta/materiales-alta.component';
import { MaterialesMenuComponent } from './components/materiales/materiales-menu/materiales-menu.component';
import { MaterialesModifComponent } from './components/materiales/materiales-modif/materiales-modif.component';
import { UbicacionesAltaComponent } from './components/ubicaciones/ubicaciones-alta/ubicaciones-alta.component';
import { UbicacionesMenuComponent } from './components/ubicaciones/ubicaciones-menu/ubicaciones-menu.component';
import { UbicacionesModifComponent } from './components/ubicaciones/ubicaciones-modif/ubicaciones-modif.component';
import { IvasAltaComponent } from './components/ivas/ivas-alta/ivas-alta.component';
import { IvasMenuComponent } from './components/ivas/ivas-menu/ivas-menu.component';
import { IvasModifComponent } from './components/ivas/ivas-modif/ivas-modif.component';
import { GuiasAltaComponent } from './components/guias/guias-alta/guias-alta.component';
import { GuiasMenuComponent } from './components/guias/guias-menu/guias-menu.component';
import { GuiasModifComponent } from './components/guias/guias-modif/guias-modif.component';
import { ReservasAltaComponent } from './components/reservas/reservas-alta/reservas-alta.component';
import { ReservasMenuComponent } from './components/reservas/reservas-menu/reservas-menu.component';
import { ReservasModifComponent } from './components/reservas/reservas-modif/reservas-modif.component';
import { FacturasModifComponent } from './components/facturas/facturas-modif/facturas-modif.component';
import { FacturasMenuComponent } from './components/facturas/facturas-menu/facturas-menu.component';
import { PublicidadAltaComponent } from './components/publicidad/publicidad-alta/publicidad-alta.component';
import { PublicidadModifComponent } from './components/publicidad/publicidad-modif/publicidad-modif.component';
import { PublicidadMenuComponent } from './components/publicidad/publicidad-menu/publicidad-menu.component';
import { PublicidadBajaComponent } from './components/publicidad/publicidad-baja/publicidad-baja.component';
import { EmpresaAltaComponent } from './components/empresa/empresa-alta/empresa-alta.component';
import { EmpresaModifComponent } from './components/empresa/empresa-modif/empresa-modif.component';
import { EmpresaMenuComponent } from './components/empresa/empresa-menu/empresa-menu.component';
import { GestorsMenuComponent } from './components/gestors/gestors-menu/gestors-menu.component';
import { GestorsAltaComponent } from './components/gestors/gestors-alta/gestors-alta.component';
import { GestorsModifComponent } from './components/gestors/gestors-modif/gestors-modif.component';
import { MapModule } from './modules/map/Map.module';
import { EspereComponent } from './components/espere/espere.component';
import { MapComponent } from './components/map/map.component';
import { IvasBajaComponent } from './components/ivas/ivas-baja/ivas-baja.component';
import { UbicacionesBajaComponent } from './components/ubicaciones/ubicaciones-baja/ubicaciones-baja.component';
import { GestorsBajaComponent } from './components/gestors/gestors-baja/gestors-baja.component';
import { ClientesBajaComponent } from './components/clientes/clientes-baja/clientes-baja.component';
import { TiposActividadBajaComponent } from './components/tipos-actividad/tipos-actividad-baja/tipos-actividad-baja.component';
import { MaterialesBajaComponent } from './components/materiales/materiales-baja/materiales-baja.component';
import { GuiasBajaComponent } from './components/guias/guias-baja/guias-baja.component';
import { MisPipesPipe } from './pipes/mis-pipes.pipe';
import { ActividadesBajaComponent } from './components/actividades/actividades-baja/actividades-baja.component';
import { ReservasBajaComponent } from './components/reservas/reservas-baja/reservas-baja.component';
import { CrearGestorComponent } from './components/login/crear-gestor/crear-gestor.component';

@NgModule({
  declarations: [
    AppComponent,
    ClientesAltaComponent,
    ClientesModifComponent,
    ClientesMenuComponent,
    LoginComponent,
    MenuComponent,
    InicioComponent,
    PageNotFoundComponent,
    ActividadesMenuComponent,
    ActividadesAltaComponent,
    ActividadesModifComponent,
    TiposActividadAltaComponent,
    TiposActividadMenuComponent,
    TiposActividadModifComponent,
    MaterialesAltaComponent,
    MaterialesMenuComponent,
    MaterialesModifComponent,
    UbicacionesAltaComponent,
    UbicacionesMenuComponent,
    UbicacionesModifComponent,
    IvasAltaComponent,
    IvasMenuComponent,
    IvasModifComponent,
    GuiasAltaComponent,
    GuiasMenuComponent,
    GuiasModifComponent,
    ReservasAltaComponent,
    ReservasMenuComponent,
    ReservasModifComponent,
    FacturasModifComponent,
    FacturasMenuComponent,
    PublicidadAltaComponent,
    PublicidadModifComponent,
    PublicidadMenuComponent,
    PublicidadBajaComponent,
    EmpresaAltaComponent,
    EmpresaModifComponent,
    EmpresaMenuComponent,
    GestorsMenuComponent,
    GestorsAltaComponent,
    GestorsModifComponent,
    EspereComponent,
    MapComponent,
    IvasBajaComponent,
    UbicacionesBajaComponent,
    GestorsBajaComponent,
    ClientesBajaComponent,
    PublicidadBajaComponent,
    TiposActividadBajaComponent,
    MaterialesBajaComponent,
    GuiasBajaComponent,
    MisPipesPipe,
    ActividadesBajaComponent,
    ReservasBajaComponent,
    CrearGestorComponent,    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    MapModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
