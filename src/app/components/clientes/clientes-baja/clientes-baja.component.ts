import { Component } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { Router } from '@angular/router';
import { Clientes } from 'src/app/models/clientes.models';
import { ClientesService } from 'src/app/services/clientes.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-clientes-baja',
  templateUrl: './clientes-baja.component.html',
  styleUrls: ['./clientes-baja.component.css']
})
export class ClientesBajaComponent {
  public id!:number;
  public datos!:any;
  public cliente:Clientes[];
  public titulo="Baja de Cliente";
  public date=new Date();
  public dia!:number;
  public mes!:number;
  public anio!:number;
  public fecha!:string;
  public mensaje:string="";

  constructor(private route: ActivatedRoute, private router: Router, public servicio_cliente: ClientesService){
    this.cliente=[];
    this.id=this.route.snapshot.params['id'];
    this.dia=this.date.getDate();
    this.mes=this.date.getMonth()+1;
    this.anio=this.date.getFullYear();
    this.fecha=(this.dia+'-'+this.mes+'-'+this.anio);
  }

  /**
   *Da de baja el cliente
   * @param id
   * @returns void
   */
  public borrar():void{
    this.servicio_cliente.leer(this.id).subscribe((respuesta)=>{
      let cliente=new Clientes();
      cliente.id=this.id;
      cliente.baja=this.fecha;
      cliente.apellido1=respuesta.apellido1;
      cliente.apellido2=respuesta.apellido2;
      cliente.nombre=respuesta.nombre;
      cliente.nif=respuesta.nif;
      cliente.direccione_id=respuesta.direccione_id;
      cliente.bonificacion=respuesta.bonificacion;
      cliente.foto=respuesta.foto;
      cliente.password=respuesta.password;
      cliente.rol=respuesta.rol;
      cliente.user=respuesta.user;
      this.servicio_cliente.update(cliente).subscribe((data)=>{
        this.mensaje=data.mensaje;
      });
    });
  }

  /**
   * Sale al listado
   * @returns void
   */
  salir(){
    this.router.navigate(['/clientes']);
    return;
  }
}
