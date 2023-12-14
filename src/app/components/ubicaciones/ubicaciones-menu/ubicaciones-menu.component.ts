import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Ubicaciones } from 'src/app/models/ubicaciones.models';
import { UbicacionesService } from 'src/app/services/ubicaciones.service';
import { ActividadesService } from 'src/app/services/actividades.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ubicaciones-menu',
  templateUrl: './ubicaciones-menu.component.html',
  styleUrls: ['../../../app.component.css']
})
export class UbicacionesMenuComponent {
  //Array de tipo ubicaciones
  public ubicaciones:Ubicaciones[];
  public lista!:any;
  public title = 'Ubicaciones';
  public nombre=new FormControl('');
  public page!:number;
  public confirBorra:boolean=false;
  public id!:number;
  public consulta:boolean=false;
  public valores=JSON.parse(String(localStorage.getItem('token')));
  public rol!:number;

  constructor(public servicio: UbicacionesService, private actividad: ActividadesService, private router: Router) {
    //Inicializo el array a vacío
    this.ubicaciones=[];

  }

  /**Al cargarse el menú, se hace la petición y se traen las ubicaciones
   * @returns void
  */
  ngOnInit(): void {
    this.servicio.get().subscribe((res)=>{
      this.ubicaciones=res;
      this.rol=this.valores.rol;
      this.consulta=true;
    })
  }

  /**Filtrado de las ubicaciones
   * @returns void
  */
  public filtrarLista(){
    this.servicio.filtrar(this.nombre.value).subscribe((respuesta) => {
      this.ubicaciones=[];
      this.ubicaciones=respuesta.ubicaciones;
    });
  }

  /**
   * Reinicia el listado, eliminando el contenido de los filtros
   * @returns void
   */
  borrarFiltro(){
    this.servicio.get().subscribe((data)=>{
      this.ubicaciones=[];
      for(let i=0; i<data.length;i++){
        let ubi = new Ubicaciones();
        ubi.id=data[i].id;
        ubi.nombre=data[i].nombre;
        ubi.lat=data[i].lat;
        ubi.lon=data[i].lon;
        this.ubicaciones.push(ubi);
      }
      this.nombre.setValue("");
    });
  }
}
