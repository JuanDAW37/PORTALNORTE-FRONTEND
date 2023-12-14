import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { GuiasService } from 'src/app/services/guias.service';
import { Trabajadores } from 'src/app/models/trabajadores.models';
import { Actividades } from '../../../models/actividades.models';
import { ActividadesService } from './../../../services/actividades.service';
import { ActividadesTrabajadores } from 'src/app/models/activiades_trabajadores_models';
import { Telefonos } from 'src/app/models/telefonos.models';
import { TelefonosService } from 'src/app/services/telefonos.service';
import { Emails } from 'src/app/models/emails.models';
import { EmailService } from 'src/app/services/email.service';


@Component({
  selector: 'app-guias-baja',
  templateUrl: './guias-baja.component.html',
  styleUrls: ['./guias-baja.component.css']
})
export class GuiasBajaComponent {

  public id!:number;
  public guia:Trabajadores[];
  public emails!:Emails[];
  public telefonos!:Telefonos[];
  public actividades!:Actividades[]
  public titulo="Baja de Trabajador / Guia";
  public error="";

  constructor(private route: ActivatedRoute, private router: Router, public guias_service: GuiasService,
    private actividad_trabajador_service: ActividadesService, private telefono_service: TelefonosService,
    private email_service: EmailService){
      this.id=route.snapshot.params['id'];
      this.guia=[];
  }
  /**
   * Nos lleva al listado
   * @return void
   */
  salir():void{
    this.router.navigate(['/guias']);
  }

  /**
   * Elimina el trabajador junto con sus teléfonos y emails, así como hace el detach
   * @param id
   * @return void
   */
  borrar(id: number):void{
    //Leo para recuperar las actividades de ese Trabajador
    this.guias_service.leer(id).subscribe((data)=>{
      this.actividades=data.actividades;
      for (let k=0; k < this.actividades.length;k++) {
        let acti_trab=new ActividadesTrabajadores();
        acti_trab.actividade_id=this.actividades[k].id;
        acti_trab.trabajadore_id=this.id;
        //Hago el detach
        this.actividad_trabajador_service.detachTrabajadores(acti_trab).subscribe(()=>{});
      }
    });
    //Guardo en las tablas de teléfonos y emails, los teléfonos y los emails del guía
    this.guias_service.leer(id).subscribe(data=>{
      this.telefonos=data.telefonos;
      this.emails=data.emails;
    });
    //Elimino el guía, si hay errores por integridad referencial, los presento.
    this.guias_service.delete(this.id).subscribe((data)=>{
      if(!data.status){
        this.error=data.mensaje;
      }
      else{
        //Elimino los teléfonos asociados al guía
        for (let i = 0; i < this.telefonos.length; i++) {
          this.telefono_service.delete(this.telefonos[i].id).subscribe();
        }
        //Elimino los emails asociados al guía
        for (let i = 0; i < this.emails.length; i++) {
          this.email_service.delete(this.emails[i].id).subscribe();
        }
        //Refresco el listado
        this.guias_service.get().subscribe((data)=>{
          this.guia=data;
          this.router.navigate(['/guias']);
          return;
        });
      }
    });
  }
}
