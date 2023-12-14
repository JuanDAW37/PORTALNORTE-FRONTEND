import { Component } from '@angular/core';
import { Reservas } from 'src/app/models/reservas.models';
import { ReservasService } from 'src/app/services/reservas.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reservas-baja',
  templateUrl: './reservas-baja.component.html',
  styleUrls: ['./reservas-baja.component.css']
})
export class ReservasBajaComponent {
  public titulo:string="Borrar Reserva";
  public id!:number;
  public facturada!:boolean;
  public sofactur!:string;
  public mensaje!:string;

  constructor(public reserva_service : ReservasService, private router: Router, private route: ActivatedRoute){
    this.id=this.route.snapshot.params['id'];
  }

  /**
   * Elimina la reserva, comprobando antes de que no se haya facturado
   *  @returns void
  */
  borrar(id:number):void{
    this.reserva_service.leer(id).subscribe((data)=>{
      if(data.facturada){
        this.mensaje="No se puede eliminar una reserva que ha sido facturada";
      }else{
        this.reserva_service.delete(id).subscribe();
        this.router.navigate(['/reservas']);
      }
    });
  }

  /**
   * Vuelve al listado
   *  @returns void
   */
  salir():void{
    this.router.navigate(['/reservas']);
  }
}
