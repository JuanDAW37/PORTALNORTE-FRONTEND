import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Clientes } from 'src/app/models/clientes.models';
import { ClientesService } from 'src/app/services/clientes.service';

@Component({
  selector: 'app-clientes-menu',
  templateUrl: './clientes-menu.component.html',
  styleUrls: ['./clientes-menu.component.css'],
})
export class ClientesMenuComponent implements OnInit {
  public clientes!:Clientes[];
  public consulta:boolean=false;
  title = 'Clientes';
  filtraClient=new FormGroup({
  'nif':new FormControl(''),
  'nombre':new FormControl(''),
  'apellido1':new FormControl(''),
  'apellido2':new FormControl(''),
  })

  public page!:number;

  constructor(public cliente_service: ClientesService) {
    this.clientes=[];
  }

  ngOnInit(): void {
    this.cliente_service.get().subscribe((data)=>{
      this.clientes=data;
      this.consulta=true;
    })
  }

  /**
   * Filtrado por nombre y/o apellido1 y/o apellido2 y/o nif
   * @return void
   *  */
  public filtrarLista():void{
    let no = String(this.filtraClient.controls['nombre'].value);
    let ni = String(this.filtraClient.controls['nif'].value);
    let ape1 = String(this.filtraClient.controls['apellido1'].value);
    let ape2 = String(this.filtraClient.controls['apellido2'].value);
    if (no == "" && ni == "" && ape1 == "" && ape2 == ""){
      this.borrarFiltro();
    }
    else{
      this.cliente_service.filtrar(ni, no, ape1, ape2).subscribe((respuesta) => {
        this.clientes = [];        
        if(respuesta.status){
          this.clientes = respuesta.clientes;
        }else{
          this.borrarFiltro();
        }
      });
    }
  }

  /**
   * Reinicia el listado, elimininando el contenido de los filtros
   * @returns void
   */
  borrarFiltro(){
    this.clientes=[];
    this.cliente_service.get().subscribe((data)=>{
      this.clientes=data;
      this.filtraClient.controls['nombre'].setValue('');
      this.filtraClient.controls['nif'].setValue('');
      this.filtraClient.controls['apellido1'].setValue('');
      this.filtraClient.controls['apellido2'].setValue('');
    });
  }
}
