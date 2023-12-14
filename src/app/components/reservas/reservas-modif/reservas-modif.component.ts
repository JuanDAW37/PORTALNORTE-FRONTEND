import { Component } from '@angular/core';
import { Reservas } from 'src/app/models/reservas.models';
import { ReservasService } from 'src/app/services/reservas.service';
import { Actividades } from '../../../models/actividades.models';
import { Clientes } from 'src/app/models/clientes.models';
import { ClientesService } from 'src/app/services/clientes.service';
import { ActividadesService } from '../../../services/actividades.service';
import { Facturas } from 'src/app/models/facturas.models';
import { FacturasService } from 'src/app/services/facturas.service';
import { Trabajadores } from 'src/app/models/trabajadores.models';
import { Materiales } from '../../../models/materiales.models';
import { Ubicaciones } from 'src/app/models/ubicaciones.models';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reservas-modif',
  templateUrl: './reservas-modif.component.html',
  styleUrls: ['../../../app.component.css']
})
export class ReservasModifComponent {
  public titulo!:string;
  public id!:number;
  public facturada!:boolean;
  public sofactur!:string;
  public modif!:FormGroup;
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
  public mensaje!:string;

  constructor(private router: Router,
    private clientes_service: ClientesService,
    private actividades_service: ActividadesService,
    public reservas_service: ReservasService, private formBuilder: FormBuilder,
    private route: ActivatedRoute, private factura_servicio: FacturasService){
      this.id=this.route.snapshot.params['id'];
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
   *  @returns void
   */
  ngOnInit(): void {
    /*Campos del formulario con validación*/
    this.modif=this.formBuilder.group({
      'numero': new FormControl(),
      'cliente':new FormControl(1, [Validators.required]),
      'nombre':new FormControl(),
      'apellido1': new FormControl(),
      'apellido2': new FormControl(),
      'nif': new FormControl(),
      'direccion': new FormControl(),
      'cp': new FormControl(),
      'ciudad': new FormControl(),
      'fecha':new FormControl([Validators.required, Validators.minLength(10)]),
      'hora':new FormControl([Validators.required, Validators.minLength(5)]),
      'personas':new FormControl([Validators.required, Validators.minLength(1)]),
      'actividad': new FormControl(1, [Validators.required]),
      'tarifa':new FormControl(),
      'iva':new FormControl(),
      'duracion':new FormControl(),
      'maxpersonas':new FormControl(),
      'material':new FormControl(1),
      'trabajador':new FormControl(1),
      'ubicacion':new FormControl(1),
    });
    this.modif.controls['fecha'].setValue(this.hoy);
    this.modif.controls['hora'].setValue(this.time);
    this.cargarDatos(this.id);
    if(this.reservas_service.estado){
      this.titulo="Consulta de Reserva";
      this.modif.controls['numero'].disable();
      this.modif.controls['fecha'].disable();
      this.modif.controls['hora'].disable();
      this.modif.controls['personas'].disable();
      this.modif.controls['actividad'].disable();
      this.modif.controls['cliente'].disable();
      this.modif.controls['fecha'].removeValidators([Validators.required, Validators.minLength(10)]);
      this.modif.controls['hora'].removeValidators([Validators.required, Validators.minLength(10)]);
      this.modif.controls['personas'].removeValidators([Validators.required, Validators.minLength(1)]);
      this.modif.controls['actividad'].removeValidators([Validators.required]);
      this.modif.controls['cliente'].removeValidators([Validators.required]);
      this.modif.controls['nif'].disable();
      this.modif.controls['nombre'].disable();
      this.modif.controls['apellido1'].disable();
      this.modif.controls['apellido2'].disable();
      this.modif.controls['tarifa'].disable();
      this.modif.controls['iva'].disable()
      this.modif.controls['duracion'].disable();
      this.modif.controls['maxpersonas'].disable();
      this.modif.controls['direccion'].disable();
      this.modif.controls['cp'].disable();
      this.modif.controls['ciudad'].disable();
    }else{
      this.titulo="Modificación de Reserva";
    }
  }

  /**Se les da un nombre descriptivo a los campos, a la hora de que sea más cómodo validarlos */
  get cliente():FormControl {
    return this.modif.get('cliente') as FormControl;
  }

  get actividad():FormControl {
    return this.modif.get('actividad') as FormControl;
  }

  get fecha():FormControl {
    return this.modif.get('fecha') as FormControl;
  }

  get hora():FormControl {
    return this.modif.get('hora') as FormControl;
  }

  get personas():FormControl {
    return this.modif.get('personas') as FormControl;
  }

  /**
   * Carga la información en los controles, recibe como parámetro el id
   * @param id
   *  @returns void
   */
  cargarDatos(id:number):void{
    this.reservas_service.leer(id).subscribe((data)=>{
      this.actividad_id=data.actividad.id;
      this.cliente_id=data.cliente.id;
      this.facturada=data.facturada;
      this.facturada?this.sofactur="YA FACTURADA":this.sofactur="NO FACTURADA";
      this.modif.controls['numero'].setValue(data.numero);
      this.modif.controls['fecha'].setValue(data.fecha);
      this.modif.controls['hora'].setValue(data.hora);
      this.modif.controls['personas'].setValue(data.personas);
      this.modif.controls['actividad'].setValue(data.actividad.id);
      this.modif.controls['cliente'].setValue(data.cliente.id);
      this.clientes_service.leer(data.cliente.id).subscribe((data)=>{
        this.modif.controls['nif'].setValue(data.nif);
        this.modif.controls['nombre'].setValue(data.nombre);
        this.modif.controls['apellido1'].setValue(data.apellido1);
        this.modif.controls['apellido2'].setValue(data.apellido2);
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
        this.modif.controls['direccion'].setValue(direccion);
        this.modif.controls['ciudad'].setValue(data.ciudad);
        this.modif.controls['cp'].setValue(data.cp);
      });
      this.actividades_service.leer(data.actividad.id).subscribe((data)=>{
        this.modif.controls['tarifa'].setValue(data.tarifa);
        this.modif.controls['iva'].setValue(data.tipo_iva);
        this.modif.controls['duracion'].setValue(data.duracion);
        this.modif.controls['maxpersonas'].setValue(data.personas);
        this.activ=data.actividad;
        this.tablaTrab=data.guias;
        this.tablaUbi=data.ubicacion;
        this.tablaMat=data.material;
      });
    });
  }

  /**
   * Coge el id del cliente del desplegable, al seleccionar
   *  @returns void
   */
  cogeCli():void{
    let id_cliente=this.modif.controls['cliente'].value;
    this.clientes_service.leer(id_cliente).subscribe(data=>{
      this.cliente_id=data.id;
      this.modif.controls['nombre'].setValue(data.nombre);
      this.modif.controls['apellido1'].setValue(data.apellido1);
      this.modif.controls['apellido2'].setValue(data.apellido2);
      this.modif.controls['nif'].setValue(data.nif);
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
      this.modif.controls['direccion'].setValue(direccion);
      this.modif.controls['cp'].setValue(data.cp);
      this.modif.controls['ciudad'].setValue(data.ciudad);
    });

  }

  /**
   * Coge el id de la actividad del desplegable, al seleccionar
   *  @returns void
   */
  cogeActi():void{
    let actividad_id=this.modif.controls['actividad'].value;
    this.actividades_service.leer(actividad_id).subscribe((data)=>{
      this.modif.controls['tarifa'].setValue(data.tarifa);
      this.modif.controls['iva'].setValue(data.tipo_iva);
      this.modif.controls['maxpersonas'].setValue(data.personas);
      this.modif.controls['duracion'].setValue(data.duracion);
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
    if((this.modif.controls['fecha']!=null)&&(this.modif.controls['hora']!=null)&&(this.actividad!=null)){
      let fecha=this.modif.controls['fecha'].value;
      let hora=this.modif.controls['hora'].value;
      this.modif.controls['numero'].setValue(fecha+'-'+hora+this.activ.substring(0,3));
    }
  }

  /**
   * Comprueba que haya disponibilidad para esa actividad en esa fecha y tramo horario
   *  @returns void
   */
  disponible():void{
    let fecha=this.modif.controls['fecha'].value;
    let inicio=this.modif.controls['hora'].value.split(":");
    let periodo=parseInt(this.modif.controls['duracion'].value);
    let t1=new Date();
    let t2=new Date();
    t1.setHours(inicio[0], inicio[1]);
    let total=parseInt(inicio[0])+periodo;
    t2.setHours(total, inicio[1]);
    inicio=t1.getHours()+":"+t1.getMinutes();
    let fin=t2.getHours()+":"+t2.getMinutes();
    this.reservas_service.validarReserva(fecha, inicio, fin).subscribe(data=>{
      console.log('disponible', data);
      if(data.personas+parseInt(this.modif.controls['personas'].value)>(parseInt(this.modif.controls['maxpersonas'].value))){
        this.error="Se excede del límite de personas por actividad, fecha y período horario";
      }
    });
  }

  /**
    * Guarda la reserva, y si el cliente dispone de correo, lo envía
    *  @returns void
  */
  guardar():void{
    let reserva=new Reservas();
    reserva.id=this.id;
    reserva.actividade_id=this.actividad_id;
    reserva.cliente_id=this.cliente_id;
    reserva.fecha=this.modif.controls['fecha'].value;
    reserva.hora=this.modif.controls['hora'].value;
    reserva.personas=this.modif.controls['personas'].value;
    reserva.numero=this.modif.controls['numero'].value;
    this.reservas_service.update(reserva).subscribe((respuesta)=>{
      this.mensaje=respuesta.mensaje;
    });
  }

  /**
   * Cierra y vuelve a listado
   * @returns void
   */
  cerrar():void{
    this.router.navigate(['/reservas']);
  }

  /**
   * Genera una factura desde la reserva y marca la reserva como ya facturada
   *  @returns void
   */
  facturar():void{
    let fecha=new Date();
    let anio=fecha.getFullYear();
    this.factura_servicio.cogeNumFactura(anio).subscribe((data)=>{
      let numero=data.facturas[0].numero;
      let factura=new Facturas();
      factura.numero=numero+1;
      factura.fecha=this.modif.controls['fecha'].value;
      factura.cliente_id=this.cliente_id;
      factura.reserva_id=this.id;
      let fecha=this.modif.controls['fecha'].value;
      let anio=fecha.substr(0,4);
      let mes=fecha.substr(5,2);
      let dia=fecha.substr(8,2);
      fecha=dia+"/"+mes+"/"+anio;
      factura.concepto=`FACTURA  DE RESERVA Nº ${this.modif.controls['numero'].value} POR ${this.activ} ${fecha}`;
      factura.base=parseFloat(this.modif.controls['tarifa'].value)*parseInt(this.modif.controls['personas'].value);
      factura.iva= parseFloat(this.modif.controls['iva'].value);
      factura.cuota=((factura.base*factura.iva)/100);
      factura.total=factura.base+factura.cuota;
      this.factura_servicio.insert(factura).subscribe((res)=> {
        this.sofactur="YA FACTURADA";
        this.facturada=true;
        this.factura_servicio.imprimirPDF(res.id);
      });
      let reserva=new Reservas();
      reserva.id=this.id;
      reserva.actividade_id=this.actividad_id;
      reserva.cliente_id=this.cliente_id;
      reserva.fecha=this.modif.controls['fecha'].value;
      reserva.hora=this.modif.controls['hora'].value;
      reserva.personas=this.modif.controls['personas'].value;
      reserva.numero=this.modif.controls['numero'].value;
      reserva.facturada=true;
      this.reservas_service.update(reserva).subscribe((respuesta)=>{});
    });
  }
}
