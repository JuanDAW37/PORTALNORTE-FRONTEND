import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Facturas } from 'src/app/models/facturas.models';
import { FacturasService } from 'src/app/services/facturas.service';

@Component({
  selector: 'app-facturas-menu',
  templateUrl: './facturas-menu.component.html',
  styleUrls: ['../../../app.component.css']
})
export class FacturasMenuComponent {
  public facturas!:Facturas[];
  public title = 'Facturas de reservas';
  public page!:number;
  public consulta:boolean=false;
  public valor=0;
  public fecha=new Date();
  public buscar=new FormGroup({
    numero: new FormControl(''),
    fecha: new FormControl(''),
    concepto: new FormControl('')
  });

  constructor(public facturas_service: FacturasService) {}

  ngOnInit(): void {
    this.cargaLista();
  }

  /**
   * Reinicia el listado
   * @returns void
   */
  cargaLista():void{
    this.facturas_service.get().subscribe((data)=>{
      this.facturas=data;
      this.consulta=true;
    });
  }

  /**
   * Filtra el listado por número fecha o concepto
   * @returns void
   */
  public filtrarLista():void {
    let no = parseInt(String(this.buscar.controls['numero'].value));
    let fe = String(this.buscar.controls['fecha'].value);
    let con = String(this.buscar.controls['concepto'].value);
    isNaN(no)?no=0:no=parseInt(String(this.buscar.controls['numero'].value));
    fe=null?fe="":fe=String(this.buscar.controls['fecha'].value);
    con=null?con="":con=String(this.buscar.controls['concepto'].value);
    this.facturas=[];
    this.facturas_service.filtrar(no, fe, con).subscribe((respuesta) => {
      if(!respuesta.status){
        this.borrarFiltro();
      }else{
        for(let i =0; i<respuesta.facturas.length;i++){
          let factu=new Facturas();
          factu.id=respuesta.facturas[i].id
          factu.numero=respuesta.facturas[i].numero
          factu.fecha=respuesta.facturas[i].fecha
          factu.concepto=respuesta.facturas[i].concepto
          factu.total=respuesta.facturas[i].total
          factu.iva=respuesta.facturas[i].iva
          factu.cuota=respuesta.facturas[i].cuota
          factu.base=respuesta.facturas[i].base
          factu.nombre=respuesta.facturas[i].nombre;
          factu.apellido1=respuesta.facturas[i].apellido1;
          factu.apellido2=respuesta.facturas[i].apellido2;
          factu.nif=respuesta.facturas[i].nif;
          this.facturas.push(factu);
        }
      }
    });
  }

  /**
   * Borra el contenido del campo de búsqueda y reinicia el listado
   * @returns void
   */
  borrarFiltro():void{
    this.buscar.controls['numero'].setValue('');
    this.buscar.controls['fecha'].setValue('');
    this.buscar.controls['concepto'].setValue('');
    this.facturas=[];
    this.cargaLista();
  }
}
