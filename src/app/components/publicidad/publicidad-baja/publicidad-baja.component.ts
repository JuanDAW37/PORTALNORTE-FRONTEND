import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Publicidades } from 'src/app/models/publicidades.models';
import { PublicidadService } from 'src/app/services/publicidad.service';

@Component({
  selector: 'app-publicidad-baja',
  templateUrl: './publicidad-baja.component.html',
  styleUrls: ['./publicidad-baja.component.css']
})

export class PublicidadBajaComponent {
  public id!:number;
  public publicidad!:Publicidades[];
  public titulo="Baja de Anuncio";
  public mensaje!:string;

  constructor(private route: ActivatedRoute, private router: Router, private publi_service: PublicidadService){
      this.id=this.route.snapshot.params['id'];
      this.publicidad=[];
  }

  /**
   * Recibe el id del menú y borrar el registro
   * @param id
   */
  borrar(id:number){
    //Con el parámetro recibido, accedo al anuncio y lo elimino.
    this.publi_service.delete(id).subscribe((respuesta)=>{
      if(!respuesta.status){
        this.mensaje=respuesta.mensaje;
      }else{
        this.publi_service.get().subscribe((data)=>{
          this.publicidad=data;
          this.router.navigate(['/publicidad']);
          return;
        })
      }
    })
  }

  /**
   * Cierra y sale al listado
   * @returns void
   */
  salir():void{
    this.router.navigate(['/publicidad']);
    return;
  }
}
