import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Trabajadores } from 'src/app/models/trabajadores.models';
import { GuiasService } from 'src/app/services/guias.service';

@Component({
  selector: 'app-guias-menu',
  templateUrl: './guias-menu.component.html',
  styleUrls: ['./guias-menu.component.css'],
})
export class GuiasMenuComponent {
  public guias!:Trabajadores[];
  public title = 'Guías';
  public page!:number;
  public consulta:boolean=false;
  public buscar=new FormGroup({
    nif:new FormControl(''),
    nombre:new FormControl(''),
    apellido1:new FormControl(''),
    apellido2:new FormControl(''),
  });

  constructor(public guias_service: GuiasService) {
    this.guias=[];
  }

  ngOnInit(): void {
    this.cargarLista();
  }

  /**
   * Carga y recarga el listado
   * @return void
   */
  cargarLista():void{
    this.guias=[];
    this.guias_service.get().subscribe(data=>{
      this.guias=data;
      this.consulta=true;
    });
  }

  /**
   * Hace un filtrado por nombe, apellido1, apellido2 y/o nif
   * @return void
   */
  public filtrarLista():void {
    let no = String(this.buscar.controls['nombre'].value);
    let ni = String(this.buscar.controls['nif'].value);
    let ape1 = String(this.buscar.controls['apellido1'].value);
    let ape2 = String(this.buscar.controls['apellido2'].value);
    if (no =='' && ni == '' && ape1 == '' && ape2==''){      
      this.cargarLista();
    }else{
      this.guias=[];
      this.guias_service.filtrar(no, ape1, ape2, ni).subscribe(data=>{
        console.log(data);
        for(let i=0;i<data.trabajadores.length;i++){
          let guia=new Trabajadores();
          guia.id=data.trabajadores[i].id;
          guia.nif=data.trabajadores[i].nif;
          guia.nombre=data.trabajadores[i].nombre;
          guia.apellido1=data.trabajadores[i].apellido1;
          guia.apellido2=data.trabajadores[i].apellido2;
          guia.calle=data.trabajadores[i].calle;
          guia.numero=data.trabajadores[i].numero;
          guia.km=data.trabajadores[i].km;
          guia.bloque=data.trabajadores[i].bloque;
          guia.piso=data.trabajadores[i].piso;
          guia.letra=data.trabajadores[i].letra;
          this.guias.push(guia);
        }
      });
    }
  }

  /**
   * Limpia los campos del filtro y reinicia el listado
   * @return void
   */
  borrarFiltro():void{
    this.buscar.controls['nombre'].setValue('');
    this.buscar.controls['nif'].setValue('');
    this.buscar.controls['apellido1'].setValue('');
    this.buscar.controls['apellido2'].setValue('');
    this.consulta=false;
    this.cargarLista();
  }
}
