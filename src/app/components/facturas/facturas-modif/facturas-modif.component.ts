import { Component } from '@angular/core';
import { Facturas } from 'src/app/models/facturas.models';
import { FacturasService } from 'src/app/services/facturas.service';
import { Clientes } from '../../../models/clientes.models';
import { ClientesService } from 'src/app/services/clientes.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-facturas-modif',
  templateUrl: './facturas-modif.component.html',
  styleUrls: ['../../../app.component.css']
})
export class FacturasModifComponent {

  public id!:number;
  public factura=new Facturas();
  public clientes!:Clientes[];
  public mensaje:string="";
  public titulo:string="";
  public modif!:FormGroup;
  public cliente_id!:number;
  public reserva_id!:number;
  public error!:string;

  constructor(private route:ActivatedRoute, public formBuilder:FormBuilder, private router: Router, public factura_service: FacturasService,
    private cliente_service: ClientesService){
    this.id=this.route.snapshot.params['id'];
    this.clientes=[];
    this.cliente_service.get().subscribe((data)=>{
      this.clientes=data;
    });
  }

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
      'fecha':new FormControl(Validators.required),
      'concepto':new FormControl(),
      'base':new FormControl([Validators.required, Validators.minLength(1)]),
      'iva': new FormControl(),
      'cuota':new FormControl(),
      'total':new FormControl(),
    });
    this.modif.controls['numero'].disable();
    this.modif.controls['nombre'].disable();
    this.modif.controls['apellido1'].disable();
    this.modif.controls['apellido2'].disable();
    this.modif.controls['nif'].disable();
    this.modif.controls['direccion'].disable();
    this.modif.controls['cp'].disable();
    this.modif.controls['ciudad'].disable();
    this.modif.controls['fecha'].disable();
    this.modif.controls['iva'].disable();
    this.modif.controls['cuota'].disable();
    this.modif.controls['total'].disable();
    //Cargar los datos de la factura a editar
    this.cargarDatos(this.id);
    if(this.factura_service.estado){
      this.titulo='Consulta de factura';
      this.modif.controls['cliente'].disable();
      this.modif.controls['concepto'].disable();
      this.modif.controls['base'].disable();
    }else{
      this.titulo='Modificación de factura';
    }
  }

  /**Se les da un nombre descriptivo a los campos, a la hora de que sea más cómodo validarlos */
  get cliente():FormControl {
    return this.modif.get('cliente') as FormControl;
  }

  get concepto():FormControl {
    return this.modif.get('concepto') as FormControl;
  }

  get base():FormControl {
    return this.modif.get('base') as FormControl;
  }

  /**
   *  Carga la información del cliente
   * @param id
   * @returns void
   */
  cargarDatos(id:number):void{
    this.factura_service.leer(id).subscribe((data)=>{
      let factu=new Facturas();
      factu=data.factura;
      this.cliente_id=data.cliente.id;
      this.reserva_id = data.reserva.id;
      this.modif.controls['numero'].setValue(factu.numero);
      this.modif.controls['fecha'].setValue(factu.fecha);
      let fecha=this.modif.controls['fecha'].value;
      let anio=fecha.substr(0,4);
      let mes=fecha.substr(5,2);
      let dia=fecha.substr(8,2);
      fecha=dia+"/"+mes+"/"+anio;
      this.modif.controls['fecha'].setValue(fecha);
      this.modif.controls['concepto'].setValue(factu.concepto);
      this.modif.controls['base'].setValue(factu.base);
      this.modif.controls['iva'].setValue(factu.iva);
      this.modif.controls['cuota'].setValue(factu.cuota);
      this.modif.controls['total'].setValue(factu.total);
      this.cliente_service.leer(data.cliente.id).subscribe((data)=>{
        this.modif.controls['cliente'].setValue(data.id);
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
    });
  }

  /**
   * Coge el id del cliente del desplegable, al seleccionar
   * @returns void
   */
  cogeCli():void{
    let id_cliente=this.modif.controls['cliente'].value;
    this.cliente_service.leer(id_cliente).subscribe(data=>{
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
   * Genera un PDF de la factura
   * @returns void
   */
  imprimir():void{
    this.factura_service.imprimirPDF(this.id);
  }

  /**
   * Envía un email con la factura
   * @returns void
   */
  email():void{
    this.factura_service.enviaEmail(this.id).subscribe((respuesta)=>{
      this.mensaje=respuesta.mensaje;
    });
  }

  /**
   * Recalcula los importes de la factura en caso de modificarse la base
   * @returns void
   */
  calcular():void{
    let base=parseFloat(this.modif.controls['base'].value);
    let iva=parseFloat(this.modif.controls['iva'].value);
    let cuota=0;
    let total=0;
    cuota=((base*iva)/100);
    total=cuota+base;
    this.modif.controls['cuota'].setValue(Number(cuota.toFixed(2)));
    this.modif.controls['total'].setValue(Number(total.toFixed(2)));
  }

  /**
   * Guarda los cambios hechos a la factura
   * @returns void
   */
  guardar():void{
    let factura=new Facturas();
    factura.reserva_id=this.reserva_id;
    factura.fecha=this.modif.controls['fecha'].value;
    factura.cliente_id=this.modif.controls['cliente'].value;
    factura.numero=this.modif.controls['numero'].value;
    factura.concepto=this.modif.controls['concepto'].value;
    factura.base=this.modif.controls['base'].value;
    factura.iva=this.modif.controls['iva'].value;
    factura.cuota=this.modif.controls['cuota'].value;
    factura.total=this.modif.controls['total'].value;
    factura.id=this.id;
    this.factura_service.update(factura).subscribe((data)=>{
      this.mensaje=data.mensaje;
    })
  }

  /**
   * Cierra el control y sale al listado
   * @returns void
   */
  cerrar():void{
    this.router.navigate(['/facturas']);
  }

}
