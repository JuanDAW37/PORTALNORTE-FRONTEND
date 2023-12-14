import { Component } from '@angular/core';
import { EmpresaService } from 'src/app/services/empresa.service';
import { Empresas } from 'src/app/models/empresas.models';

@Component({
  selector: 'app-empresa-menu',
  templateUrl: './empresa-menu.component.html',
  styleUrls: ['./empresa-menu.component.css']
})
export class EmpresaMenuComponent {
  public empresa:Empresas[];
  public consulta:boolean=false;
  public title = 'Empresa';
  public direccion!:string;

  constructor(public service: EmpresaService) {
    this.empresa=[];
    this.service.get().subscribe(
      (respuesta) => {
        let datos=respuesta;
        for (let k in datos) {
          let emp=new Empresas();
          emp.id=datos[k].id;
          emp.nombre=datos[k].nombre;
          emp.nif=datos[k].nif;
          emp.calle=datos[k].direccion.calle;
          emp.km=datos[k].direccion.km;
          emp.numero=datos[k].direccion.numero;
          emp.bloque=datos[k].direccion.bloque;
          emp.piso=datos[k].direccion.piso;
          emp.letra=datos[k].direccion.letra;
          this.empresa.push(emp);
          this.consulta=true;
        }
      }
    );
  }
}
