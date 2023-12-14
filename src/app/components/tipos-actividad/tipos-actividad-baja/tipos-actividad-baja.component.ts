import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { TiposActividades } from 'src/app/models/tiposactividades.models';
import { TiposActividadService } from 'src/app/services/tipos-actividad.service';

@Component({
  selector: 'app-tipos-actividad-baja',
  templateUrl: './tipos-actividad-baja.component.html',
  styleUrls: ['./tipos-actividad-baja.component.css']
})
export class TiposActividadBajaComponent {
  id!:number;
  error:string="";
  tipos:TiposActividades[];
  titulo="Borrado de tipo de actividad";

  constructor(private route: ActivatedRoute, private router: Router, public servicio_tipos: TiposActividadService){
    this.tipos=[];
    this.id=this.route.snapshot.params['id'];
    }

  /**
   *Elimina el tipo de actividad
   * @param id
   * @returns void
   */
  public borrar(id:number):void{
    //Elimina el tipo de actividad, si hay errores por integridad referencial, los presento.
    this.servicio_tipos.delete(id).subscribe((data)=>{
      if(!data.status){
        this.error=data.mensaje;
      }
      else{
        //Refresco el listado
        this.servicio_tipos.get().subscribe((data)=>{
          this.tipos=data;
          this.router.navigate(['/tipos']);
          return;
        });
      }
    });
  }

  /**
   * Cierra y sale
   * @returns void
   */
  salir():void{
    this.router.navigate(['/tipos']);
    return;
  }
}
