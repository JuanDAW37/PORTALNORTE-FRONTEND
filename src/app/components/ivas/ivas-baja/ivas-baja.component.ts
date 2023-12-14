import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Iva } from 'src/app/models/ivas.models';
import { IvasService } from 'src/app/services/ivas.service';

@Component({
  selector: 'app-ivas-baja',
  templateUrl: './ivas-baja.component.html',
  styleUrls: ['./ivas-baja.component.css']
})
export class IvasBajaComponent {
id!:number;
datos!:any;
iva=new Iva();
titulo="Borrado de IVA";
error="";

constructor( private route: ActivatedRoute, private router: Router, public service:IvasService){
  this.id=this.route.snapshot.params['id'];
}

/**
 *Elimina el tipo de IVA, verificando antes que no tenga asociadas actividades
 * @param number id
 * @return void
 */
borrar(id:number):void{
      this.service.delete(id).subscribe((data)=>{
        if(!data.status){
          console.log(data);
          this.error=data.mensaje;
        }else{
          this.service.get().subscribe(()=>{});
          this.router.navigate(['/ivas']);
          return;
        }
      });
  }

  /**
   * Sale al listado
   * @return void
   */
  salir():void{
    this.router.navigate(['/ivas']);
  }
}
