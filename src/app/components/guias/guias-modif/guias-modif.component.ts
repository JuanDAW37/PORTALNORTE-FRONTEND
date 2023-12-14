import { Component } from '@angular/core';
import { Empresas } from 'src/app/models/empresas.models';
import { GuiasService } from 'src/app/services/guias.service';
import { Trabajadores } from 'src/app/models/trabajadores.models';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { CpsService } from 'src/app/services/cps.service';
import { CiudadesService } from '../../../services/ciudades.service';
import { DireccionesService } from '../../../services/direcciones.service';
import { Direcciones } from '../../../models/direcciones.models';
import { ProvinciasService } from 'src/app/services/provincias.service';
import { PaisesService } from 'src/app/services/paises.service';
import { CP } from 'src/app/models/cps.models';
import { Paises } from 'src/app/models/paises.models';
import { Provincias } from 'src/app/models/provincias.models';
import { Ciudades } from 'src/app/models/ciudades.models';
import { Telefonos } from 'src/app/models/telefonos.models';
import { TelefonosService } from 'src/app/services/telefonos.service';
import { EmpresaService } from 'src/app/services/empresa.service';
import { Emails } from 'src/app/models/emails.models';
import { EmailService } from 'src/app/services/email.service';
import { DomSanitizer } from '@angular/platform-browser';
import { ImagenService } from 'src/app/services/imagen/imagen.service';
import { Actividades } from 'src/app/models/actividades.models';
import { ActividadesService } from '../../../services/actividades.service';
import { ActividadesTrabajadores } from 'src/app/models/activiades_trabajadores_models';

@Component({
  selector: 'app-guias-modif',
  templateUrl: './guias-modif.component.html',
  styleUrls: ['../../../app.component.css']
})
export class GuiasModifComponent {
  public titulo: string = 'Alta de Guía o Trabajador';
  public guia!:Trabajadores;
  public direccion_id!: number;
  public cp_id!: number;
  public ciudad_id!: number;
  public provincia_id!: number;
  public pais_id!: number;
  public alta_direccion: boolean = false;
  public alta_cp: boolean = false;
  public alta_ciudad: boolean = false;
  public alta_provincia: boolean = false;
  public alta_pais: boolean = false;
  public rDireccion=new Direcciones();
  public telef:Telefonos[];
  public email:Emails[];
  public empresas:Empresas[];
  public actividades:Actividades[];
  public tablaActi!:Actividades[];
  public error_telef:String="";
  public error_mail:String="";
  public archivo:any;
  public archivos:any=[];
  public previsualizacion!:String;
  public list:number=1;
  public id!:number;
  public edit_email:boolean=false;
  public num_email!:number;
  public num_tel!:number;
  public edit_tel:boolean=false;
  public modif!:FormGroup
  public mensaje_nif!:string;
  public mensaje_user!:string;
  public mensaje!:string;
  public edit_password:boolean=false;

  constructor(private paises_servicio: PaisesService,
    private empresas_service : EmpresaService,
    private provincia_servicio: ProvinciasService,
    private ciudad_servicio: CiudadesService,
    private cp_servicio: CpsService,
    private direccion: DireccionesService, public guias_service: GuiasService,
    private router: Router,
    private telef_service: TelefonosService,
    private email_service: EmailService,
    private sanitizer: DomSanitizer,
    private formBuilder: FormBuilder,
    private imagen: ImagenService,
    private route: ActivatedRoute,
    private actividad_service: ActividadesService){
    this.telef=[];
    this.email=[];
    this.empresas=[];
    this.actividades=[];
    this.tablaActi=[];
    this.id=this.route.snapshot.params['id'];

    //Defino los campos del formulario con las validaciones
    this.modif=this.formBuilder.group({
      nombre: new FormControl('', [Validators.required, Validators.minLength(1)]),
      apellido1: new FormControl('', [Validators.required, Validators.minLength(1)]),
      apellido2: new FormControl(''),
      nif: new FormControl('', [Validators.required, Validators.minLength(4),Validators.maxLength(15)]),
      foto: new FormControl(''),
      user: new FormControl('', [Validators.required, Validators.minLength(1)]),
      password: new FormControl('', [Validators.required, Validators.minLength(1)]),
      contrato: new FormControl('',[Validators.required, Validators.minLength(1)]),
      sueldo: new FormControl(0, [Validators.required, Validators.min(1)]),
      incentivo: new FormControl(0),
      calle: new FormControl('', [Validators.required, Validators.minLength(2)]),
      km: new FormControl(''),
      numero: new FormControl(''),
      bloque: new FormControl(''),
      piso: new FormControl(''),
      letra: new FormControl(''),
      cp: new FormControl('', [Validators.required, Validators.minLength(5)]),
      ciudad: new FormControl('', [Validators.required, Validators.minLength(4)]),
      provincia: new FormControl('', [Validators.required, Validators.minLength(4)]),
      pais: new FormControl('', [Validators.required, Validators.minLength(4)]),
      nTelef:new FormControl(''),
      dEmail:new FormControl(''),
      tblTelef: new FormControl(),
      tblEmail: new FormControl(),
      activ: new FormControl(1),
      empresa: new FormControl(1)});
  }

  /**
    * Al cargarse el form, se alimenta el select de empresas
    * @return void
  */
  ngOnInit(): void {
    this.actividad_service.get().subscribe(data=>{
      this.actividades= data;
    });
    this.empresas_service.get().subscribe((data)=>{
      this.empresas=data;
    });
    this.guias_service.leer(this.id).subscribe((data)=>{
      this.modif.controls['nombre'].setValue(data.nombre);
      this.modif.controls['apellido1'].setValue(data.apellido1);
      if(data.apellido2==null){
        this.modif.controls['apellido2'].setValue('')
      }else{
        this.modif.controls['apellido2'].setValue(data.apellido2);
      }
      this.modif.controls['nif'].setValue(data.nif);
      this.modif.controls['foto'].setValue(data.foto);
      this.modif.controls['user'].setValue(data.user);
      this.modif.controls['password'].setValue(data.password);
      this.modif.controls['contrato'].setValue(data.contrato);
      this.modif.controls['sueldo'].setValue(data.sueldo);
      this.modif.controls['incentivo'].setValue(data.incentivo);
      this.modif.controls['empresa'].setValue(data.empresa_id);
      this.modif.controls['calle'].setValue(data.calle);
      this.modif.controls['km'].setValue(data.km);
      this.modif.controls['numero'].setValue(data.numero);
      this.modif.controls['bloque'].setValue(data.bloque);
      this.modif.controls['piso'].setValue(data.piso);
      this.modif.controls['letra'].setValue(data.letra);
      this.modif.controls['cp'].setValue(String(data.cp));
      this.modif.controls['ciudad'].setValue(data.ciudad);
      this.modif.controls['provincia'].setValue(data.provincia);
      this.modif.controls['pais'].setValue(data.pais);
      this.direccion_id=data.direccione_id;
      if(data.telefonos.length>0){
        for (let i = 0; i < data.telefonos.length ; i++) {
          let telef=new Telefonos();
          telef.numero=data.telefonos[i].numero;
          telef.id=data.telefonos[i].id;
          this.telef.push(telef);
        }
      }
      if(data.emails.length>0){
        for (let i = 0; i < data.emails.length ; i++) {
          let email=new Emails();
          email.email=data.emails[i].email;
          email.id=data.emails[i].id;
          this.email.push(email);
        }
      }
      if(data.actividades.length>0){
        for(let i=0;i<data.actividades.length;i++){
          let actividad=new Actividades();
          actividad.id=data.actividades[i].id;
          actividad.actividad=data.actividades[i].actividad;
          actividad.tarifa=data.actividades[i].tarifa;
          actividad.duracion=data.actividades[i].duracion;
          this.tablaActi.push(actividad);
        }
      }
      if(this.guias_service.estado){
        this.titulo="Consulta de Guía / Trabajador";
        this.modif.controls['nombre'].disable();
        this.modif.controls['nif'].disable();
        this.modif.controls['apellido1'].disable();
        this.modif.controls['apellido2'].disable();
        this.modif.controls['nombre'].disable();
        this.modif.controls['apellido1'].disable();
        this.modif.controls['apellido2'].disable();
        this.modif.controls['nif'].disable();
        this.modif.controls['foto'].disable();
        this.modif.controls['user'].disable();
        this.modif.controls['password'].disable();
        this.modif.controls['contrato'].disable();
        this.modif.controls['sueldo'].disable();
        this.modif.controls['incentivo'].disable();
        this.modif.controls['calle'].disable();
        this.modif.controls['km'].disable();
        this.modif.controls['numero'].disable();
        this.modif.controls['bloque'].disable();
        this.modif.controls['piso'].disable();
        this.modif.controls['letra'].disable();
        this.modif.controls['cp'].disable();
        this.modif.controls['ciudad'].disable();
        this.modif.controls['provincia'].disable();
        this.modif.controls['pais'].disable();
        this.modif.controls['nTelef'].disable();
        this.modif.controls['dEmail'].disable();
        this.modif.controls['tblTelef'].disable();
        this.modif.controls['tblEmail'].disable();
        this.modif.controls['empresa'].disable();
        this.modif.controls['nombre'].removeValidators([Validators.required, Validators.minLength(1)]);
        this.modif.controls['apellido1'].removeValidators([Validators.required, Validators.minLength(1)]);
        this.modif.controls['nif'].removeValidators([Validators.required, Validators.minLength(4),Validators.maxLength(15)]);
        this.modif.controls['user'].removeValidators([Validators.required, Validators.minLength(1)]);
        this.modif.controls['password'].removeValidators([Validators.required, Validators.minLength(1)]);
        this.modif.controls['contrato'].removeValidators([Validators.required, Validators.minLength(1)]);
        this.modif.controls['sueldo'].removeValidators([Validators.required, Validators.minLength(1)]);
        this.modif.controls['calle'].removeValidators([Validators.required, Validators.minLength(2)]);
        this.modif.controls['cp'].removeValidators([Validators.required, Validators.minLength(5)]);
        this.modif.controls['ciudad'].removeValidators([Validators.required, Validators.minLength(4)]);
        this.modif.controls['provincia'].removeValidators([Validators.required, Validators.minLength(4)]);
        this.modif.controls['pais'].removeValidators([Validators.required, Validators.minLength(4)]);
      }else{
        this.titulo="Modificación de Guía / Trabajador";
        this.modif.controls['password'].disable();
      }
    });
  }

  /**
   * Habilita el input del password para poder modificarlo
   * Sólo lo podrá hacer el administrador
   * @returns void
   */
  change_password():void{
    this.edit_password=true;
    this.modif.controls['password'].enable();
  }

  /**
   * Método que se llama al pulsar el + para añadir a la ubicación, la actividad seleccionada
   * y da un alta en la tabla pivote
   * @return void
   */
  addActi():void{
    if (this.modif.controls['activ'].value!=null){
      let acti = this.modif.controls['activ'].value;
      this.actividad_service.leer(acti).subscribe((valor)=>{
        let trab_acti=new Actividades();
        let id_acti=valor.id;
        let nom_acti=valor.actividad;
        let tar_acti=valor.tarifa;
        let dur_acti=valor.duracion;
        trab_acti.list=this.list+((this.tablaActi.length)-1);
        trab_acti.id=id_acti;
        trab_acti.actividad=nom_acti;
        trab_acti.tarifa=tar_acti;
        trab_acti.duracion=dur_acti;
        let acti_trab=new ActividadesTrabajadores();
        acti_trab.actividade_id=trab_acti.id;
        acti_trab.trabajadore_id=this.id;
        this.actividad_service.attachTrabajadores(acti_trab).subscribe(()=>{
          this.tablaActi.push(trab_acti);
        });
      });
    }
  }

  /**
   * Elimina la actividad de la tabla y hace el DETACH en la tabla pivote
   * @param id any
   * @return void
  */
  borrarActi(i: number):void{
    let acti_trab=new ActividadesTrabajadores();
    acti_trab.actividade_id=this.tablaActi[i].id;
    acti_trab.trabajadore_id=this.id;
    this.actividad_service.detachTrabajadores(acti_trab).subscribe(()=>{
      this.tablaActi.splice(i,1);
    });
  }

  /**
   * Incluye el teléfono en la lista, verificando antes si existe o no
   * @returns void
   */
  guardaTelefono():void{
    let telef=String(this.modif.controls['nTelef']?.value);
    let noexiste=true;
    for (let i in this.telef){
      if (this.telef[i].numero==telef){
        noexiste=false;
        alert("Este número ya se encuentra registrado en la tabla");
      }
    }
    if(noexiste){
      this.telef_service.filtrar(telef).subscribe((data)=>{
        if (data.status){
          this.error_telef="Este teléfono ya existe";
          this.modif.controls['nTelef'].setValue("");
        }else{
          let tel=new Telefonos();
          //Si estamos en modo edición de email, eliminamos el anterior email y metemos el nuevo
          if(this.edit_tel){
            tel.id=this.telef[this.num_tel].id;
            tel.numero=telef;
            this.telef.splice(this.num_tel,1);
            this.telef.push(tel);
            this.edit_tel=false;
          }else{
            tel.numero=telef;
            this.telef.push(tel);
          }
        }
      });
    }
  }

  /**
   * Coge el teléfono para modificarlo
   *  @param number i
   * @return void
   */
  cogeTelefono(i:number):void{
    this.modif.controls['nTelef'].setValue(this.telef[i].numero);
    this.edit_tel=true;
    this.num_tel=i;
  }

  /**
   * Quita el teléfono de la lista, actualizando la tabla.
   * @param number i
   * @return void
   */
  borraTelefono(i:number):void{
    this.telef_service.delete(this.telef[i].id).subscribe();
    this.telef.splice(i, 1);
  }

  /**
   * Incluye el teléfono en la lista, verificando antes si existe o no
   * @returns void
   */
  guardaEmail():void{
    let email=String(this.modif.controls['dEmail']?.value);
    let noexiste=true;
    for (let i in this.email){
      if (this.email[i].email==email){
        noexiste=false;
        alert("Este email ya se encuentra registrado en la tabla");
      }
    }
    if(noexiste){
      this.email_service.filtrar(email).subscribe((data)=>{
        if (data.status){
          this.error_mail="Este email ya existe";
          this.modif.controls['dEmail'].setValue("");
        }else{
          let ema=new Emails();
          ema.email=email;
          //Si estamos en modo edición de email, eliminamos el anterior email y metemos el nuevo
          if(this.edit_email){
            this.email.splice(this.num_email,1);
            this.edit_email=false;
          }
          this.email.push(ema);
        }
      });
    }
  }

  /**
   * Quita el email de la lista, actualizando la tabla.
   * @param number i
   * @return void
   */
  borraEmail(i:number):void{
    this.email_service.delete(this.email[i].id).subscribe();
    this.email.splice(i, 1);
  }

  /**
   * Coge el email para modificarlo
   *  @param number i
   * @return void
   */
  cogeEmail(i:number):void{
    this.modif.controls['dEmail'].setValue(this.email[i].email);
    this.edit_email=true;
    this.num_email=i;
  }

  /**
   * Sale al listado
   * @return void
   */
  cerrar():void{
    this.router.navigate(['/guias']);
  }

  /**Se les da un nombre descriptivo a los campos, a la hora de que sea más cómodo validarlos
   * @return FormControl
   */
  get nombre():FormControl {
    return this.modif.get('nombre') as FormControl;
  }

  get nif():FormControl {
    return this.modif.get('nif') as FormControl;
  }

  get apellido1():FormControl {
    return this.modif.get('apellido1') as FormControl;
  }

  get user():FormControl {
    return this.modif.get('user') as FormControl;
  }

  get password():FormControl {
    return this.modif.get('password') as FormControl;
  }

  get contrato():FormControl {
    return this.modif.get('contrato') as FormControl;
  }

  get sueldo():FormControl {
    return this.modif.get('sueldo') as FormControl;
  }

  get calle():FormControl {
    return this.modif.get('calle') as FormControl;
  }

  get cp():FormControl {
    return this.modif.get('cp') as FormControl;
  }

  get ciudad():FormControl {
    return this.modif.get('ciudad') as FormControl;
  }

  get provincia():FormControl {
    return this.modif.get('provincia') as FormControl;
  }

  get pais():FormControl {
    return this.modif.get('pais') as FormControl;
  }

  /**
   * Comprueba el NIF al salir del input, en caso de que exista coge de nuevo el control
   * @params any event
   * @return void
   */
  compruebaNIF(event:any):void{
    if((this.modif.controls['nif'].value!=undefined)||(this.modif.controls['nif'].value!=null)){
      let nif=this.modif.controls['nif'].value;
      let user="";
      this.guias_service.nifUser(nif, user).subscribe((data)=>{
        if(data.status){
          this.mensaje_nif=data.mensaje;
          event.target.focus();
        }
      });
    }
  }

  /**
   * Comprueba el user al salir del input, en caso de que exista coge de nuevo el control
   * @params any event
   * @return void
   */
  compruebaUser(event:any):void{
    if((this.modif.controls['user'].value!=undefined)||(this.modif.controls['user'].value!=null)){
      let nif=""
      let user=this.modif.controls['user'].value;;
      this.guias_service.nifUser(nif, user).subscribe((data)=>{
        if(data.status){
          this.mensaje_user=data.mensaje;
          event.target.focus();
        }
      });
    }
  }

  /**
   * Borrar el mensjae de error
   * @return void
   */
  borrarMensaje():void{
    this.mensaje_nif="";
    this.mensaje_user="";
  }

  /**
   * Recupera el nombre de archivo proporcionado por el evento event
   * Llama a extraerBase64 para hacer la previsualización de la foto
   * @param event
   * @return void
   */
  subirFoto(event:any):void{
    this.archivo = event.target.files[0];
    this.extraerBase64(this.archivo).then((imagen:any)=>{
    this.previsualizacion=imagen.base
    });
    this.archivos.push(this.archivo);
  }

  /**
   * Convierte el archivo de imagen escogido a base64 para previsualizarlo
   * @param $event
   * @returns string
   */
  extraerBase64=async($event: any) => new Promise((resolve,reject)=>{
    try{
      const unsafeImg=window.URL.createObjectURL($event);
      const image=this.sanitizer.bypassSecurityTrustUrl($event);
      const reader=new FileReader();
      reader.readAsDataURL($event);
      reader.onload=()=>{
        resolve({
          base:reader.result
        });
      };
      reader.onerror=error=>{
        resolve({
          base:null
        });
      };
    }catch(e){
      //return null;
    }
  });

  /**
  * Envía la foto al servidor
  * @returns any
  */
  subir():any{
    try{
      const formData=new FormData();
      for(let i=0;i<this.archivos.length;i++){
        formData.append('file',this.archivos[i]);
      }
      this.imagen.trabajador(formData).subscribe((data)=>{
        console.log(data);
      });
    }catch(e){
      console.log(e);
    }
  }

  /**Hace la actualización del guia
   * Si hay lista de emails, los actualiza o los guarda
   * Si hay lista de teléfonos, los actualiza o los guarda
   * @returns void
  */
  guardar():void {
    try{
      let guia=new Trabajadores();
      guia.nombre = String(this.modif.controls['nombre']?.value);
      guia.nif = String(this.modif.controls['nif']?.value);
      guia.apellido1= String(this.modif.controls['apellido1']?.value);
      guia.apellido2= String(this.modif.controls['apellido2']?.value);
      guia.contrato=String(this.modif.controls['contrato']?.value);
      guia.user=String(this.modif.controls['user']?.value);
      guia.password=String(this.modif.controls['password']?.value);
      guia.incentivo=parseFloat(this.modif.controls['incentivo'].value);
      guia.empresa_id=parseInt(this.modif.controls['empresa'].value);
      guia.editpassword=this.edit_password;
      guia.direccione_id = this.direccion_id;
      guia.sueldo=parseFloat(String(this.modif.controls['sueldo']?.value));
      guia.id=this.id;
      if(this.archivo!=undefined){
        guia.foto=this.archivo.name;
      }else{
        guia.foto="";
      }
      this.guias_service.update(guia).subscribe((data) => {
        console.log(data);
        this.mensaje=data.mensaje;
        if(this.archivo!=undefined){
          this.subir();
        }
        if (this.email.length>0){
          for (let i = 0; i < this.email.length ; i++) {
            let email=new Emails();
            email.email=this.email[i].email;
            email.trabajadore_id=this.id;
            email.id=this.email[i].id;
            this.email_service.leer(email.id).subscribe((data)=>{
              if(!data.status){
                let nuevo_email=new Emails();
                nuevo_email.email=email.email;
                nuevo_email.trabajadore_id=email.trabajadore_id;
                this.email_service.insert(nuevo_email).subscribe((data)=>{});
              }else{
                //Busco el email por su email, si existe, no lo actualizo, ya que es unique
                this.email_service.filtrar(email.email).subscribe((data)=>{
                  if(!data.status){
                  this.email_service.update(email).subscribe(()=>{});
                  }
                })
              }
            });
          }
        }
        if (this.telef.length>0){
          for (let i = 0; i < this.telef.length ; i++) {
            let tel=new Telefonos();
            //Busco el teléfono por su id, si existe, lo actualizo, si no, lo inserto
            tel.numero=this.telef[i].numero;
            tel.trabajadore_id=this.id;
            tel.id=this.telef[i].id;
            this.telef_service.leer(tel.id).subscribe((data)=>{
              if (!data.status) {
                let nuevo_tel=new Telefonos();
                nuevo_tel.numero=tel.numero;
                nuevo_tel.trabajadore_id=tel.trabajadore_id;
                this.telef_service.insert(tel).subscribe(()=>{})
              }else{
                //Busco el telefono por su numero, si existe, no lo actualizo, ya que es unique
                this.telef_service.filtrar(tel.numero).subscribe((data)=>{
                  if(!data.status){
                    console.log(tel.numero);
                    this.telef_service.update(tel).subscribe(()=>{});
                  }
                })
              }
            });
          }
        }
      });
    }catch(e){
      console.log(e);
    }
  }

  /**
   * Dirección, si se encuentra, trae cp, ciudad, provincia y país
   * @return void
   */
  buscarDireccion():void{
    let calle = String(this.modif.controls['calle']?.value);
    let km = String(this.modif.controls['km']?.value);
    let numero = String(this.modif.controls['numero']?.value);
    let bloque = String(this.modif.controls['bloque'].value);
    let piso = String(this.modif.controls['piso'].value);
    let letra = String(this.modif.controls['letra'].value);
    this.direccion.filtrar(calle, km, numero, bloque, piso, letra).subscribe((respuesta) => {
        if (!respuesta.status) {
          //Pongo a true para dar de modif la dirección
          this.alta_direccion = true;
          this.direccion_id=0;
          console.log(this.alta_direccion, respuesta);
          this.modif.controls['cp'].setValue('');
          this.modif.controls['ciudad'].setValue('');
          this.modif.controls['provincia'].setValue('');
          this.modif.controls['pais'].setValue('');
        }else {
          this.direccion_id = respuesta.id;
          this.modif.controls['cp'].setValue(respuesta.cp);
          this.modif.controls['ciudad'].setValue(respuesta.ciudad);
          this.modif.controls['provincia'].setValue(respuesta.provincia);
          this.modif.controls['pais'].setValue(respuesta.pais);
        }
      });
  }

  /**
   * Si no existe la dirección la crea y guarda el id
   * @param cp_id
   * @return void
   */
  crearDireccion(cp_id:number):void{
    //Pregunto si se encontró antes la dirección, para darla o no de modif
    if (this.alta_direccion) {
      let direccion=new Direcciones();
      direccion.calle=String(this.modif.controls['calle']?.value);
      direccion.km=String(this.modif.controls['km']?.value);
      direccion.numero=String(this.modif.controls['numero']?.value);
      direccion.bloque=String(this.modif.controls['bloque'].value);
      direccion.piso=String(this.modif.controls['piso'].value);
      direccion.letra=String(this.modif.controls['letra'].value);
      direccion.cp_id=cp_id;
      this.direccion.insert(direccion).subscribe((alta_dir)=>{
        this.direccion_id=alta_dir.id;
        this.alta_direccion=false;
      });
    }
  }

  /**
   * Inicializa las flags de dirección y cp y llama a buscar dirección
   * @return void
   */
  entraCp():void{
    this.alta_direccion=false;
    this.buscarDireccion();
    this.alta_cp=false;
  }

  /**Cp, si se encuentra, trae la ciudad, provincia y país y crea la dirección
   * @param $event
   * @return void
   */
  buscarCp($event: any):void {
    let cp = parseInt($event.target.value);
    this.cp_servicio.filtrar(cp).subscribe((respuesta)=>{
      if (!respuesta.status) {
      //Pongo a true para dar de modif el CP
        this.alta_cp = true;
        this.modif.controls['ciudad'].setValue('');
        this.modif.controls['provincia'].setValue('');
        this.modif.controls['pais'].setValue('');
      }else {
        this.cp_id = respuesta.id;
        this.crearDireccion(this.cp_id);
        this.modif.controls['ciudad'].setValue(respuesta.ciudad);
        this.modif.controls['provincia'].setValue(respuesta.provincia);
        this.modif.controls['pais'].setValue(respuesta.pais);
      }
    });
  }

  /**
   * Crea el código postal, en caso de que no exista y guarda su id
   * @param ciudad_id
   * @return void
   */
  crearCp(ciudad_id:number):void{
    if (this.alta_cp) {
      let cp=new CP();
      cp.numero=parseInt(String(this.modif.controls['cp']?.value));
      cp.ciudade_id=ciudad_id;
      this.cp_servicio.insert(cp).subscribe((alta_cp)=>{
        this.cp_id=alta_cp.id;
        this.alta_cp=false;
      });
    }
  }

  /**
   * Inicializa la flag para ciudad
   * @return void
   */
  entraCiudad():void{
    this.alta_ciudad=false;
  }

  /**Ciudad, si se encuentra, trae la provincia y país, y crea el cp y la dirección
   * @param $event
   * @return void
   */
  buscarCiudad($event: any):void {
    let ciudad = $event.target.value;
    this.ciudad_servicio.filtrar(ciudad).subscribe((respuesta) => {
      if (!respuesta.status) {
        //Pongo a true para dar de modif la ciudad
        this.alta_ciudad = true;
        this.modif.controls['provincia'].setValue('');
        this.modif.controls['pais'].setValue('');
      }else {
        this.ciudad_id = respuesta.id;
        this.modif.controls['provincia'].setValue(respuesta.provincia);
        this.modif.controls['pais'].setValue(respuesta.pais);
        if (this.alta_cp) {
            this.crearCp(this.ciudad_id);
            this.crearDireccion(this.cp_id);
        }
      }
    });
  }

  /**
   * Crea la ciudad con el código de provincia
   * @param provin_id
   * @return void
   */
  crearCiudad(provin_id:number):void{
    if(this.alta_ciudad){
      let ciudad=new Ciudades();
      ciudad.ciudad=String(this.modif.controls['ciudad'].value);
      ciudad.provincia_id=provin_id;
      this.ciudad_servicio.insert(ciudad).subscribe((ins_ciu)=>{
        this.ciudad_id=ins_ciu.id;
        this.alta_ciudad=false;
      });
    }
  }

  /**
   * Incializa la flag de provincia
   * @return void
   */
  entraProvincia():void{
    this.alta_provincia=false;
  }

  /**Provincia, si se encuentra trae el país
   * @param $event
   * @return void
   */
  buscarProvincia($event: any):void {
    let provincia = $event.target.value;
    this.provincia_servicio.buscarPorNombre(provincia).subscribe((respuesta) => {
      if (!respuesta.status) {
        //Pongo a true para dar de modif la provincia
        this.alta_provincia = true;
        this.modif.controls['pais'].setValue('');
      }else {
        this.provincia_id = respuesta.id;
        this.modif.controls['pais'].setValue(respuesta.pais);
        this.crearCiudad(this.provincia_id);
        this.crearCp(this.ciudad_id);
        this.crearDireccion(this.cp_id);
        }
      });
    }

    /**
     * Crea la provincia con el código del país
     * @param pais_id
     * @return void
     */
    crearProvincia(pais_id:number):void{
      if(this.alta_provincia){
        let provin=new Provincias();
        provin.paise_id=pais_id;
        provin.nombre=String(this.modif.controls['provincia'].value);
        provin.codigo=parseInt(String(this.modif.controls['cp'].value).substring(0,2));
        this.provincia_servicio.insert(provin).subscribe((datos)=> {
          this.provincia_id=datos.id;
          this.alta_provincia=false;
        });
      }
    }

    /**
     * Inicializa la flag del país
     * @return void
     */
    entraPais():void{
      this.alta_pais=false;
    }

  /**País, si no se encuentra, lo da de modif
   * @param $event
   * @return void
   */
  buscarPais($event: any):void {
    let pais = $event.target.value;
    this.paises_servicio.buscarPorNombre(pais).subscribe((respuesta) => {
      if (!respuesta.status) {
        let pais=new Paises();
        pais.nombre=String(this.modif.controls['pais'].value);
        this.paises_servicio.insert(pais).subscribe((data)=>{
          this.pais_id=data.id;
          this.crearProvincia(this.pais_id);
          this.crearCiudad(this.provincia_id);
          this.crearCp(this.ciudad_id);
          this.crearDireccion(this.cp_id);
        })
      }else {
        this.pais_id = respuesta.id;
        this.crearProvincia(this.pais_id);
        this.crearCiudad(this.provincia_id);
        this.crearCp(this.ciudad_id);
        this.crearDireccion(this.cp_id);
      }
    });
  }
}
