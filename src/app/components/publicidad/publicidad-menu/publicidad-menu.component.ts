import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Publicidades } from 'src/app/models/publicidades.models';
import { PublicidadService } from 'src/app/services/publicidad.service';

@Component({
  selector: 'app-publicidad-menu',
  templateUrl: './publicidad-menu.component.html',
  styleUrls: ['../../../app.component.css']
})
export class PublicidadMenuComponent {
  publicidad:Publicidades[];
  title = 'Servicios Publicitarios';
  publi=new FormControl('');
  public page!:number;
  public cons:boolean=false

  constructor(public servicio:PublicidadService) {
    this.publicidad=[];
  }

  /**
   * Inicializa el componente
   * @returns void
   */
  ngOnInit(): void {
    this.servicio.get().subscribe((respuesta) => {
      this.publicidad=respuesta;
      this.cons=true;
    });
  }

  /**
   * Filtra el listado por el nombre del anuncio
   * @returns void
   */
  public filtrarLista():void{
    let publi=String(this.publi.value);
    this.servicio.buscarPorNombre(publi).subscribe(
      (respuesta) => {
        this.publicidad=[];
        for(let i=0;i<respuesta.publicidad.length;i++){        
          let publi=new Publicidades();
          publi.id=respuesta.publicidad[i].id;
          publi.titulo=respuesta.publicidad[i].titulo;
          publi.importe=respuesta.publicidad[i].importe;
          publi.nombre=respuesta.publicidad[i].nombre;
          publi.apellido1=respuesta.publicidad[i].apellido1;
          publi.apellido2=respuesta.publicidad[i].apellido2;
          publi.nif=respuesta.publicidad[i].nif;
          this.publicidad.push(publi);
        }
      }
    );
  }

  /**
   * Reinicia el listado, elimininando el contenido de los filtros
   * @returns void
   */
  borrarFiltro():void{
    this.servicio.get().subscribe((respuesta) => {
      this.publicidad=[];
      this.publicidad=respuesta;
      this.cons=true;
      this.publi.setValue("");
    });
  }
}
