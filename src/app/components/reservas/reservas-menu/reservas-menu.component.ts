import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Reservas } from 'src/app/models/reservas.models';
import { ReservasService } from 'src/app/services/reservas.service';
@Component({
  selector: 'app-reservas-menu',
  templateUrl: './reservas-menu.component.html',
  styleUrls: ['./reservas-menu.component.css']
})
export class ReservasMenuComponent {
  public reservas:Reservas[];
  public title="Reservas de actividades";
  public codigo=new FormControl('');
  public page!:number;
  public consulta:boolean=false;
  public valores=JSON.parse(String(localStorage.getItem('token')));
  public rol!:number;

  constructor(public reservas_service: ReservasService) {
    this.reservas=[];
  }

  /**
   * Inicializa el componente
   *  @returns void
   */
  ngOnInit(): void {
    this.cargarLista();
    this.consulta=true;
  }

  /**
   * Carga el listado
   *  @returns void
   */
  public cargarLista():void {
    this.rol=this.valores.rol;
    this.reservas_service.get().subscribe(
      (respuesta) => {
        this.reservas = respuesta;
      }
    );
  }

  /**
   * Busca la reserva por su número
   *  @returns void
   */
  public filtrarLista():void {
    this.reservas=[];
    this.reservas_service.buscarReserva(String(this.codigo.value)).subscribe((data)=>{
      for (let i = 0; i < data.reservas.length; i++) {
        let reserv=new Reservas();
        reserv.id= data.reservas[i].id;
        reserv.numero= data.reservas[i].numero;
        reserv.fecha= data.reservas[i].fecha;
        reserv.hora= data.reservas[i].hora;
        reserv.nombre= data.reservas[i].nombre;
        reserv.facturada=data.reservas[i].facturada;
        reserv.nif= data.reservas[i].nif;
        reserv.apellido1= data.reservas[i].apellido1;
        reserv.apellido2= data.reservas[i].apellido2;
        reserv.actividad = data.reservas[i].actividad;
        this.reservas.push(reserv);
      }
    });
  }

  /**
   * Borra el contenido del campo de búsqueda y reinicia el listado
   *  @returns void
   */
  borrarFiltro():void{
    this.codigo.setValue('');
    this.reservas=[];
    this.cargarLista();
  }
}
