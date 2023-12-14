import { Component} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Gestors } from 'src/app/models/gestors.models';
import { GestorsService } from 'src/app/services/gestors.service';

@Component({
  selector: 'app-gestors-menu',
  templateUrl: './gestors-menu.component.html',
  styleUrls: ['./gestors-menu.component.css'],
})
export class GestorsMenuComponent {
  public gestors: Gestors[];
  title = 'Gestor';
  public consulta:boolean=false;
  public buscar=new FormGroup({
    nif: new FormControl(''),
    nombre: new FormControl(''),
    apellido1:new FormControl(''),
    apellido2:new FormControl('')
  });

  constructor(public servicio: GestorsService ) {
    this.gestors=[];
  }

  ngOnInit(){
    this.servicio.get().subscribe((respuesta) => {
      this.gestors=respuesta;
      this.consulta=true;
    });
  }

  /**
   * Filtrado por nombre y/o apellido1 y/o apellido2 y/o nif
   * @return Gestors[] array
   *  */
  public filtrarLista() {
    let no = this.buscar.controls['nombre'].value;
    let ni = this.buscar.controls['nif'].value;
    let ape1 = this.buscar.controls['apellido1'].value;
    let ape2 = this.buscar.controls['apellido2'].value;
    if (no == '' && ni == '' && ape1 == '' && ape2==''){
      this.borrarFiltro()
    }else{
      this.gestors=[];
      this.servicio.filtrar(no, ape1, ape2, ni).subscribe((respuesta) => {
        for(let i=0; i<respuesta.gestors.length;i++){
          let gestor=new Gestors();
          gestor.id=respuesta.gestors[i].id;
          gestor.nif=respuesta.gestors[i].nif;
          gestor.nombre=respuesta.gestors[i].nombre;
          gestor.apellido1=respuesta.gestors[i].apellido1;
          gestor.apellido2=respuesta.gestors[i].apellido2;
          gestor.calle=respuesta.gestors[i].calle;
          gestor.km=respuesta.gestors[i].km;
          gestor.numero=respuesta.gestors[i].numero;
          gestor.bloque=respuesta.gestors[i].bloque;
          gestor.piso=respuesta.gestors[i].piso;
          gestor.letra=respuesta.gestors[i].letra;
          this.gestors.push(gestor);
        };
      });
    }
  }

  /**
   * Reinicia el listado, elimininando el contenido de los filtros
   */
  borrarFiltro(){
    this.gestors=[];
    this.servicio.get().subscribe((data)=>{
      this.gestors=data;
      this.buscar.controls['nombre'].setValue('');
      this.buscar.controls['nif'].setValue('');
      this.buscar.controls['apellido1'].setValue('');
      this.buscar.controls['apellido2'].setValue('');
    })
  }
}
