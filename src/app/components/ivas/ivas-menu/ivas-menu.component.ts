import { Component } from '@angular/core';
import { IvasService } from 'src/app/services/ivas.service';
import { Iva } from 'src/app/models/ivas.models';


@Component({
  selector: 'app-ivas-menu',
  templateUrl: './ivas-menu.component.html',
  styleUrls: ['../../../app.component.css']
})
export class IvasMenuComponent {
  //Array de tipo IVA
  public iva!:Iva[];
  title = 'IVA';
  public page!:number;
  public consulta:boolean=false;

  constructor(public servicio: IvasService) {
    //Se inicializa el array a vacío
    this.iva=[];
  }

  /**Al iniciarse el componente, carga los datos de IVA
   * @returns void
  */
  ngOnInit(): void {
    this.servicio.get().subscribe((res)=>{
      this.iva=res;
      this.consulta=true;
    })
  }
}
