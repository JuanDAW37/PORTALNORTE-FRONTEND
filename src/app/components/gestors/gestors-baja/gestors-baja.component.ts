import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Gestors } from 'src/app/models/gestors.models';
import { GestorsService } from 'src/app/services/gestors.service';
import { Telefonos } from 'src/app/models/telefonos.models';
import { TelefonosService } from 'src/app/services/telefonos.service';
import { Emails } from 'src/app/models/emails.models';
import { EmailService } from 'src/app/services/email.service';

@Component({
  selector: 'app-gestors-baja',
  templateUrl: './gestors-baja.component.html',
  styleUrls: ['./gestors-baja.component.css']
})
export class GestorsBajaComponent {
  public id!:number;
  public gestor:Gestors[];
  public telefonos!:Telefonos[];
  public emails!:Emails[];
  public titulo="Baja de Gestor";
  public error="";

  constructor(private route: ActivatedRoute, private router: Router, public servicio_gestor: GestorsService,
    private telefono_service: TelefonosService, private email_service : EmailService){
  this.gestor=[];
  this.telefonos=[];
  this.emails=[];
  this.id=this.route.snapshot.params['id'];
  }

  /**
   *Elimina el gestor
   * @param id
   */
  public borrar(id:number){
    //Guardo en las tablas de teléfonos y emails, los teléfonos y los emails del guía
    this.servicio_gestor.leer(this.id).subscribe(data=>{
      this.telefonos=data.telefono;
      this.emails=data.email;
    })
    //Elimino el gestor, si hay errores por integridad referencial, los presento.
    this.servicio_gestor.delete(id).subscribe((data)=>{
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
        this.servicio_gestor.get().subscribe((data)=>{
          this.gestor=data;
          this.router.navigate(['/gestor']);
          return;
        });
      }
    });
  }

  salir(){
    this.router.navigate(['/gestor']);
    return;
  }
}
