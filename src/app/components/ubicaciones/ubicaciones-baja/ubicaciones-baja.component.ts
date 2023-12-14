import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Ubicaciones } from 'src/app/models/ubicaciones.models';
import { UbicacionesService } from 'src/app/services/ubicaciones.service';
import { Actividades_Ubicaciones } from 'src/app/models/actividades_ubicaciones.models';
import { ActividadesService } from './../../../services/actividades.service';


@Component({
  selector: 'app-ubicaciones-baja',
  templateUrl: './ubicaciones-baja.component.html',
  styleUrls: ['./ubicaciones-baja.component.css']
})
export class UbicacionesBajaComponent {
  id!:number;
  ubi:Ubicaciones[];
  titulo="Baja de Ubicación";

  constructor( private route: ActivatedRoute, private router: Router, public service:UbicacionesService, private actividad:
    ActividadesService){
    this.id=this.route.snapshot.params['id'];
    this.ubi=[];
  }

  /**
   *Elimina la ubicación, haciendo antes detach de las actividades asociadas a ella
   * @param id
   * @returns void
   */
  public borrar(id:number):void{
    //Leo para recuperar las actividades de esa Ubicación
    this.service.leer(id).subscribe((data)=>{
      for (let k=0; k<data.actividades.length;k++) {
        let acti_ubi=new Actividades_Ubicaciones();
        acti_ubi.actividade_id=data.actividades[k].id;
        acti_ubi.ubicacione_id=this.id;
        //Hago el detach
        this.actividad.detachUbicaciones(acti_ubi).subscribe(()=>{});
      }
    })
    //Elimino la ubicación
    this.service.delete(this.id).subscribe(()=>{})
    //Refresco el listado
    this.service.get().subscribe((data)=>{
      this.ubi=data;
      this.router.navigate(['/ubicaciones']);
      return;
    });
  }

  /**
   * Cierra y sale
   * @returns void
   */
  salir():void{
    this.router.navigate(['/ubicaciones']);
    return;
  }
}
