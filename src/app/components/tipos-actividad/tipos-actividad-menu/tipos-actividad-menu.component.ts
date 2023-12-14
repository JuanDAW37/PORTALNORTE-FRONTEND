import { Component, NgModule } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TiposActividades } from 'src/app/models/tiposactividades.models';
import { TiposActividadService } from 'src/app/services/tipos-actividad.service';

@Component({
  selector: 'app-tipos-actividad-menu',
  templateUrl: './tipos-actividad-menu.component.html',
  styleUrls: ['./tipos-actividad-menu.component.css']
})


export class TiposActividadMenuComponent {

  public tipos: TiposActividades[];
  title = 'Tipos de actividades';
  tipo=new FormControl('');
  public page!:number;
  public cons:boolean=true;

  constructor(public tipos_servicio: TiposActividadService) {
    this.tipos=[];
  }

  /**
   * Inicializa el componente
   * @returns void
   */
  ngOnInit(): void {
    this.tipos_servicio.get().subscribe(
      (respuesta) => {
        this.tipos = respuesta;
      }
    );
  }

  /**
   * Filtra el listado por el tipo de actividad
   * @returns void
   */
  public filtrarLista():void{
    let no=String(this.tipo.value);
    this.tipos_servicio.buscarTipo(no).subscribe(
    (respuesta) => {
      this.tipos=[];
      for(let i=0; i<respuesta.tipos.length;i++){
        let tipo=new TiposActividades();
        tipo.id=respuesta.tipos[i].id;
        tipo.tipo=respuesta.tipos[i].tipo;
        this.tipos.push(tipo);
      }
    });
  }

  /**
   * Reinicia el listado, elimininando el contenido de los filtros
   * @returns void
   */
  borrarFiltro():void{
    this.tipos_servicio.get().subscribe((respuesta) => {
      this.tipos=[];
      this.tipos=respuesta;
      this.cons=true;
      this.tipo.setValue("");
    });
  }
}
