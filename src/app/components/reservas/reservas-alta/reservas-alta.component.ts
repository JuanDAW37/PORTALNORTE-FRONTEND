import { Component } from '@angular/core';
import { Reservas } from 'src/app/models/reservas.models';
import { ReservasService } from 'src/app/services/reservas.service';
import { Actividades } from '../../../models/actividades.models';
import { Clientes } from 'src/app/models/clientes.models';
import { ClientesService } from 'src/app/services/clientes.service';
import { ActividadesService } from '../../../services/actividades.service';
import { Trabajadores } from 'src/app/models/trabajadores.models';
import { Materiales } from '../../../models/materiales.models';
import { Ubicaciones } from 'src/app/models/ubicaciones.models';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-reservas-alta',
  templateUrl: './reservas-alta.component.html',
  styleUrls: ['../../../app.component.css']
})
export class ReservasAltaComponent {
  public titulo:string="Creación de Reserva";
  public list:number=1;
  public alta!:FormGroup;
  public actividades:Actividades[];
  public clientes:Clientes[];
  public tablaTrab:Trabajadores[];
  public tablaUbi:Ubicaciones[];
  public tablaMat:Materiales[];
  public error!:string;
  public reserva=new Reservas();
  public cliente_id!:number;
  public actividad_id!:number;
  public activ!:string;
  public ahora=new Date();
  public dia!:string;
  public mes!:string;
  public anio!:string
  public hour!:string;
  public minutos!:string;
  public hoy!:string;
  public time!:string;

  constructor(private router: Router,
    private clientes_service: ClientesService,
    private actividades_service: ActividadesService,
    private reservas_service: ReservasService, private formBuilder: FormBuilder,){
      this.actividades=[];
      this.tablaTrab=[];
      this.tablaUbi=[];
      this.tablaMat=[];
      this.clientes=[];
      this.clientes_service.get().subscribe((data)=>{
        this.clientes=data;
      });
      this.actividades_service.get().subscribe((data)=>{
        this.actividades=data;
      });
      this.clientes_service.get().subscribe((data)=>{
        this.clientes=data;
      });
  }

  /**
   * Inicializa el componente
   * @returns void
   */
  ngOnInit(): void {
    this.dia=String(this.ahora.getDate());
    this.mes=String(this.ahora.getMonth());
    this.anio=String(this.ahora.getFullYear());
    this.hour=String(this.ahora.getHours());
    this.minutos=String(this.ahora.getMinutes());
    this.hoy=this.dia+"/"+this.mes+"/"+this.anio;
    this.time=this.hour+":"+this.minutos;
    /*Campos del formulario con validación*/
    this.alta=this.formBuilder.group({
      numero: new FormControl(),
      cliente:new FormControl(1, [Validators.required]),
      nombre:new FormControl(),
      apellido1: new FormControl(),
      apellido2: new FormControl(),
      nif: new FormControl(),
      direccion: new FormControl(),
      cp: new FormControl(),
      ciudad: new FormControl(),
      fecha:new FormControl([Validators.required, Validators.minLength(10)]),
      hora:new FormControl([Validators.required, Validators.minLength(5)]),
      personas:new FormControl(),
      actividad: new FormControl(1, [Validators.required]),
      tarifa:new FormControl(),
      iva:new FormControl(),
      duracion:new FormControl(),
      maxpersonas:new FormControl(),
      material:new FormControl(1),
      trabajador:new FormControl(1),
      ubicacion:new FormControl(1),
    });
    this.alta.controls['numero'].disable();
    this.alta.controls['nombre'].disable();
    this.alta.controls['apellido1'].disable();
    this.alta.controls['apellido2'].disable();
    this.alta.controls['nif'].disable();
    this.alta.controls['direccion'].disable();
    this.alta.controls['cp'].disable();
    this.alta.controls['ciudad'].disable();
    this.alta.controls['tarifa'].disable();
    this.alta.controls['iva'].disable();
    this.alta.controls['duracion'].disable();
    this.alta.controls['maxpersonas'].disable();
    this.alta.controls['fecha'].setValue(String(this.hoy));
    this.alta.controls['hora'].setValue(String(this.time));
    this.alta.controls['cliente'].setValue(1);
  }

  /**Se les da un nombre descriptivo a los campos, a la hora de que sea más cómodo validarlos */
  get cliente():FormControl {
    return this.alta.get('cliente') as FormControl;
  }

  get actividad():FormControl {
    return this.alta.get('actividad') as FormControl;
  }

  get fecha():FormControl {
    return this.alta.get('fecha') as FormControl;
  }

  get hora():FormControl {
    return this.alta.get('hora') as FormControl;
  }

  get personas():FormControl {
    return this.alta.get('personas') as FormControl;
  }

  /**
   * Guarda la reserva, y si el cliente dispone de correo, lo envía
   *  @returns void
   */
  guardar():void{
    let reserva=new Reservas();
    reserva.actividade_id=this.actividad_id;
    reserva.cliente_id=this.cliente_id;
    reserva.fecha=this.alta.controls['fecha'].value;
    reserva.hora=this.alta.controls['hora'].value;
    reserva.personas=this.alta.controls['personas'].value;
    reserva.numero=this.alta.controls['numero'].value;
    this.reservas_service.insert(reserva).subscribe(()=>{
      this.router.navigate(['/reservas']);
    });
  }

  /**
   * Coge el id del cliente del desplegable, al seleccionar
   *  @returns void
   */
  cogeCli():void{
    let id_cliente=this.alta.controls['cliente'].value;
    this.clientes_service.leer(id_cliente).subscribe(data=>{
      this.cliente_id=data.id;
      this.alta.controls['nombre'].setValue(data.nombre);
      this.alta.controls['apellido1'].setValue(data.apellido1);
      this.alta.controls['apellido2'].setValue(data.apellido2);
      this.alta.controls['nif'].setValue(data.nif);
      let km;
      let numero;
      let bloque;
      let piso;
      let letra;
      data.km==null?km="":km=data.km;
      data.numero==null?numero="":numero=data.numero;
      data.bloque==null?bloque="":bloque=data.bloque;
      data.piso==null?piso="":piso=data.piso;
      data.letra==null?letra="":letra=data.letra;
      let direccion=data.calle+" "+km+" "+numero+" "+bloque+" "+piso+" "+letra;
      this.alta.controls['direccion'].setValue(direccion);
      this.alta.controls['cp'].setValue(data.cp);
      this.alta.controls['ciudad'].setValue(data.ciudad);
    });
  }

  /**
   * Coge el id de la actividad del desplegable, al seleccionar
   *  @returns void
   */
  cogeActi():void{
    let actividad_id=this.alta.controls['actividad'].value;
    this.actividades_service.leer(actividad_id).subscribe((data)=>{
      this.alta.controls['tarifa'].setValue(data.tarifa);
      this.alta.controls['iva'].setValue(data.tipo_iva);
      this.alta.controls['maxpersonas'].setValue(data.personas);
      this.alta.controls['duracion'].setValue(data.duracion);
      this.actividad_id=data.id;
      this.activ=data.actividad;
      this.tablaTrab=data.guias;
      this.tablaMat=data.material;
      this.tablaUbi=data.ubicacion;
    });
  }

  /**
   * Crea un número de reserva en función de la fecha, hora y actividad escogida
   *  @returns void
   */
  crearNum():void{
    if((this.alta.controls['fecha'].value!="")&&(this.alta.controls['hora'].value!="")&&(this.actividad!=undefined)){
      let fecha=this.alta.controls['fecha'].value;
      let hora=this.alta.controls['hora'].value;
      this.alta.controls['numero'].setValue(fecha+'-'+hora+this.activ.substring(0,3));
    }
  }

  /**
   * Comprueba que haya disponibilidad para esa actividad en esa fecha y tramo horario
   *  @returns void
   */
  disponible():void{
    let fecha=this.alta.controls['fecha'].value;
    let inicio=this.alta.controls['hora'].value.split(":");
    let periodo=parseInt(this.alta.controls['duracion'].value);
    let t1=new Date();
    let t2=new Date();
    t1.setHours(inicio[0], inicio[1]);
    let total=parseInt(inicio[0])+periodo;
    t2.setHours(total, inicio[1]);
    inicio=t1.getHours()+":"+t1.getMinutes();
    let fin=t2.getHours()+":"+t2.getMinutes();
    this.reservas_service.validarReserva(fecha, inicio, fin).subscribe(data=>{
      console.log('disponible', data);
      if(data.personas+parseInt(this.alta.controls['personas'].value)>(parseInt(this.alta.controls['maxpersonas'].value))){
        this.error="Se excede del límite de personas por actividad, fecha y período horario";
      }
    });
  }

  /**
   * Cierra el formulario y sale al listado
   *  @returns void
   */
  cerrar():void{
    this.router.navigate(['/reservas']);
  }
}
