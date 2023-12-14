import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Actividades } from 'src/app/models/actividades.models';
import { ActividadesService } from 'src/app/services/actividades.service';
import { Actividades_Ubicaciones } from '../../../models/actividades_ubicaciones.models';
import { ActividadesMateriales } from '../../../models/actividades_materiales.models';
import { ActividadesTrabajadores } from '../../../models/activiades_trabajadores_models';
import { Trabajadores } from 'src/app/models/trabajadores.models';
import { Ubicaciones } from 'src/app/models/ubicaciones.models';
import { Materiales } from 'src/app/models/materiales.models';

@Component({
  selector: 'app-actividades-baja',
  templateUrl: './actividades-baja.component.html',
  styleUrls: ['./actividades-baja.component.css']
})
export class ActividadesBajaComponent {
  public id!:number;
  public titulo:string="Eliminar Actividad";
  public actividades!:Actividades[];
  public trabajador!:Trabajadores[];
  public ubicacion!:Ubicaciones[];
  public material!:Materiales[];
  public error!:string;

  constructor(private route: ActivatedRoute, private router: Router, public actividades_service : ActividadesService){
    this.actividades=[];
    this.id=this.route.snapshot.params['id'];
  }



  /**
   * Intenta eliminar la actividad, en caso de que la actividad tenga datos asociados, no la borra ni hace los detach
   * @param id
   * @returns void
   */
  borrar(id: number):void{
    //Leo de actividades para recuperar los id de trabajador, ubicacion y material, tablas pivote
    this.actividades_service.leer(id).subscribe(data=>{
      this.trabajador=data.guias;
      this.ubicacion=data.ubicacion;
      this.material=data.material;
      //Hago los detach
      for (let i = 0; i < this.trabajador.length; i++) {
        let acti_trab=new ActividadesTrabajadores();
        acti_trab.actividade_id=id;
        acti_trab.trabajadore_id=this.trabajador[i].id;
        this.actividades_service.detachTrabajadores(acti_trab).subscribe();
      }
      for (let i = 0; i < this.ubicacion.length; i++) {
        let acti_ubi=new Actividades_Ubicaciones();
        acti_ubi.actividade_id=id;
        acti_ubi.ubicacione_id=this.ubicacion[i].id;
        this.actividades_service.detachUbicaciones(acti_ubi).subscribe();
      }
      for (let i = 0; i < this.material.length; i++) {
        let acti_mat=new ActividadesMateriales();
        acti_mat.actividade_id=id;
        acti_mat.materiale_id=this.material[i].id;
        this.actividades_service.detachMaterial(acti_mat).subscribe();
      }
      //Intento borrar la actividad
      this.actividades_service.delete(id).subscribe(data=>{

        if(!data.status){
          this.error=data.mensaje;
        }else{
          this.router.navigate(['/actividades']);
          return;
        }
      });
    });
  }

  /**
   * Sale al listado
   * @return void
   */
  salir():void{
    this.router.navigate(['/actividades']);
    return;
  }

}
