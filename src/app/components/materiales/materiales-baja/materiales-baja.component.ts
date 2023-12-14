import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Materiales } from 'src/app/models/materiales.models';
import { MaterialesService } from 'src/app/services/materiales.service';
import { ActividadesService } from './../../../services/actividades.service';
import { ActividadesMateriales } from '../../../models/actividades_materiales.models';

@Component({
  selector: 'app-materiales-baja',
  templateUrl: './materiales-baja.component.html',
  styleUrls: ['./materiales-baja.component.css']
})
export class MaterialesBajaComponent {
  titulo:string="Eliminar Material"
  id!:number;
  materiales!:Materiales[];

  constructor(private route: ActivatedRoute, private router: Router, private materiales_service: MaterialesService,
    private actividades_materiales_service : ActividadesService){
    this.materiales=[];
    this.id=this.route.snapshot.params['id'];
  }

  /**
   *Elimina el material, haciendo antes detach de las actividades asociadas a ella
   * @param id
   * @return void
   */
  public borrar(id:number):void{
    //Leo para recuperar las actividades de ese Material
    this.materiales_service.leer(id).subscribe((data)=>{
      this.materiales=[];
      for (let k=0; k < data.actividades.length;k++) {
        let acti_mat=new ActividadesMateriales();
        acti_mat.actividade_id=data.actividades[k].id;
        acti_mat.materiale_id=this.id;
        //Hago el detach
        this.actividades_materiales_service.detachMaterial(acti_mat).subscribe(()=>{});
      }
    })
    //Elimino el material
    this.materiales_service.delete(this.id).subscribe(()=>{
      //Refresco el listado
      this.materiales_service.get().subscribe((data)=>{
        this.materiales=data;
        this.router.navigate(['/materiales']);
        return;
      });
    });
  }

  /**
   *  Vuelve al listado
   * @returns void
   */
  salir():void{
    this.router.navigate(['/ubicaciones']);
    return;
  }
}
