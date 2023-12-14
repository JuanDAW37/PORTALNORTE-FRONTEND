import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Materiales } from 'src/app/models/materiales.models';
import { MaterialesService } from '../../../services/materiales.service';


@Component({
  selector: 'app-materiales-menu',
  templateUrl: './materiales-menu.component.html',
  styleUrls: ['../../../app.component.css']
})
export class MaterialesMenuComponent {
  public materiales:Materiales[];
  public datos!:any;
  public title = 'Materiales';
  public nombre=new FormControl('');
  public page!:number;
  public consulta:boolean=false;
  public valores=JSON.parse(String(localStorage.getItem('token')));
  public rol!:number;

  constructor(public mate_service: MaterialesService) {
    this.materiales=[];
  }

  /**
   * Reinicia el listado, elimininando el contenido de los filtros
   * @returns void
   */
  borrarFiltro():void{
    this.materiales=[];
    this.rol=this.valores.rol;
    this.mate_service.get().subscribe((data)=>{
      for (let i in data) {
        let material=new Materiales;
        material.id=data[i].id;
        material.nombre=data[i].nombre;
        this.materiales.push(material);
      }
      this.nombre.setValue("");
    })
  }

  ngOnInit(): void {
      this.consulta=true;
      this.borrarFiltro();
  }

  /**
   * Filtrado por nombre y/o apellido1 y/o apellido2 y/o nif
   * @return void
   *  */
  public filtrarLista():void {
    let no = String(this.nombre.value);
    this.mate_service.buscarPorNombre(no).subscribe((respuesta) => {
      this.materiales = [];
      this.materiales=respuesta.materiales;
    });
  }
}
