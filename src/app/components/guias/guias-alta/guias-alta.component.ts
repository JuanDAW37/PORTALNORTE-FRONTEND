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
  selector: 'app-guias-alta',
  templateUrl: './guias-alta.component.html',
  styleUrls: ['../../../app.component.css']
})
export class GuiasAltaComponent {
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
  public edit_email:boolean=false;
  public num_email!:number;
  public num_tel!:number;
  public edit_tel:boolean=false;
  public alta!:FormGroup
  public mensaje_nif!:string;
  public mensaje_user!:string;

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
    private actividad_service: ActividadesService){
    this.telef=[];
    this.email=[];
    this.empresas=[];
    this.actividades=[];
    this.tablaActi=[];

    //Defino los campos del formulario con las validaciones
    this.alta=this.formBuilder.group({
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
     */
  ngOnInit(): void {
    this.actividad_service.get().subscribe(data=>{
      this.actividades= data;
    });
    this.empresas_service.get().subscribe((data)=>{
      this.empresas=data;
    });
  }

  /**Método que se llama al pulsar el + para añadir la actividad seleccionada
   * @returns void
   */
  addActi():void{
    if (this.alta.controls['activ'].value!=null){
      let acti = this.alta.controls['activ'].value;
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
        this.tablaActi.push(trab_acti);
      });
    }
  }

  /**Elimina la actividad de la tabla   *
   * @param id any
   * @returns void
  */
  borrarActi(id: any):void{
    let nuevoArray=this.tablaActi.splice(id,1);
    if(this.tablaActi.length==1){
      this.tablaActi=nuevoArray;
    }
  }

  /**
   * Incluye el teléfono en la lista, verificando antes si existe o no
   * @returns void
   */
  guardaTelefono():void{
    let telef=String(this.alta.controls['nTelef'].value);
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
        }else{
          let tel=new Telefonos();
          tel.numero=telef;
          this.telef.push(tel);
        }
      });
    }
  }

  /**
   * Quita el teléfono de la lista, actualizando la tabla.
   * @param number i
   * @returns void
   */
  borraTelefono(i:number):void{
    this.telef.splice(i, 1);
  }

  /**
   * Coge el teléfono para modificarlo   *
   *  @param number i
   * @returns void
   */
  cogeTelefono(i:number):void{
    this.alta.controls['nTelef'].setValue(this.telef[i].numero);
    this.edit_tel=true;
    this.num_tel=i;
  }

  /**
   * Incluye el email en la lista, verificando antes si existe o no
   * @returns void
   */
  guardaEmail():void{
    let email=String(this.alta.controls['dEmail']?.value);
    let noexiste=true;
    for(let i in this.email){
      if(this.email[i].email==email) {
        noexiste=false;
        this.error_mail="Este email ya existe";
      }
    }
    if(noexiste){
      this.email_service.filtrar(email).subscribe((data)=>{
        if (data.status){
          this.error_mail="Este email ya existe en la base de datos";
        }else{
          let ema=new Emails();
          ema.email=email;
          this.email.push(ema);
        }
      });
    }
  }

  /**
   * Quita el email de la lista, actualizando la tabla.
   * @param number i
   * @returns void
   */
  borraEmail(i:number):void{
    this.email.splice(i, 1);
  }

  /**
   * Coge el email para modificarlo
   *  @param number i
   * @returns void
   */
  cogeEmail(i:number):void{
    this.alta.controls['dEmail'].setValue(this.email[i].email);
    this.edit_email=true;
    this.num_email=i;
  }


  /**
   * Cierra y vuelve al listado
   * @returns void
   */
  cerrar():void{
    this.router.navigate(['/guias']);
  }

  /**Se les da un nombre descriptivo a los campos, a la hora de que sea más cómodo validarlos */
  get nombre():FormControl {
    return this.alta.get('nombre') as FormControl;
  }

  get nif():FormControl {
    return this.alta.get('nif') as FormControl;
  }

  get apellido1():FormControl {
    return this.alta.get('apellido1') as FormControl;
  }

  get user():FormControl {
    return this.alta.get('user') as FormControl;
  }

  get password():FormControl {
    return this.alta.get('password') as FormControl;
  }

  get contrato():FormControl {
    return this.alta.get('contrato') as FormControl;
  }

  get sueldo():FormControl {
    return this.alta.get('sueldo') as FormControl;
  }

  get calle():FormControl {
    return this.alta.get('calle') as FormControl;
  }

  get cp():FormControl {
    return this.alta.get('cp') as FormControl;
  }

  get ciudad():FormControl {
    return this.alta.get('ciudad') as FormControl;
  }

  get provincia():FormControl {
    return this.alta.get('provincia') as FormControl;
  }

  get pais():FormControl {
    return this.alta.get('pais') as FormControl;
  }

  /**
   * Comprueba el NIF al salir del input, en caso de que exista coge de nuevo el control
   * @params any event
   * @return void
   */
  compruebaNIF(event:any):void{
    if((this.alta.controls['nif'].value!=undefined)||(this.alta.controls['nif'].value!=null)){
      let nif=this.alta.controls['nif'].value;
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
    if((this.alta.controls['user'].value!=undefined)||(this.alta.controls['user'].value!=null)){
      let nif=""
      let user=this.alta.controls['user'].value;;
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

  /**Da de alta la guia
   * Si hay lista de emails, los guarda
   * Si hay lista de teléfonos, los guarda
   * @return void
  */
  guardar():void {
    try{
      let guia=new Trabajadores();
      guia.nombre = String(this.alta.controls['nombre']?.value);
      guia.nif = String(this.alta.controls['nif']?.value);
      guia.apellido1= String(this.alta.controls['apellido1']?.value);
      guia.apellido2= String(this.alta.controls['apellido2']?.value);
      guia.contrato=String(this.alta.controls['contrato']?.value);
      guia.user=String(this.alta.controls['user']?.value);
      guia.password=String(this.alta.controls['password']?.value);
      guia.incentivo=parseFloat(this.alta.controls['incentivo'].value);
      guia.empresa_id=parseInt(this.alta.controls['empresa'].value);
      if(this.archivo!=undefined){
        guia.foto=this.archivo.name;
      }else{
        guia.foto="";
      }
      guia.sueldo=parseFloat(String(this.alta.controls['sueldo']?.value));
      guia.direccione_id = this.direccion_id;
      this.guias_service.insert(guia).subscribe((data) => {
        if(this.archivo!=undefined){
          this.subir();
        }
        let trabajador_id=data.id;
        if (this.email.length>0){
          for (let i = 0; i < this.email.length ; i++) {
            let em=new Emails();
            em.email=this.email[i].email;
            em.trabajadore_id=trabajador_id;
            this.email_service.insert(em).subscribe(()=>{});
          }
        }
        if (this.telef.length>0){
          for (let i = 0; i < this.telef.length ; i++) {
            let tel=new Telefonos();
            tel.numero=this.telef[i].numero;
            tel.trabajadore_id=trabajador_id;
            this.telef_service.insert(tel).subscribe(()=>{});
          }
        }
        //Hacemos los attach
        if(this.tablaActi.length>0){
          for (let i = 0; i < this.tablaActi.length ; i++) {
            let acti_trab=new ActividadesTrabajadores();
            acti_trab.actividade_id=this.tablaActi[i].id;
            acti_trab.trabajadore_id=data.id;
            this.actividad_service.attachTrabajadores(acti_trab).subscribe((data)=>{
            });
          }
        }
        this.router.navigate(['/guias']);
        return;
      });
    }catch(e){
      console.log(e);
    }
  }

  /**
   * Dirección, si se encuentra, trae cp, ciudad, provincia y país
   * @return void
   */
  buscarDireccion():void {
    let calle = String(this.alta.controls['calle']?.value);
    let km = String(this.alta.controls['km']?.value);
    let numero = String(this.alta.controls['numero']?.value);
    let bloque = String(this.alta.controls['bloque'].value);
    let piso = String(this.alta.controls['piso'].value);
    let letra = String(this.alta.controls['letra'].value);
    this.direccion.filtrar(calle, km, numero, bloque, piso, letra).subscribe((respuesta) => {
        if (!respuesta.status) {
          //Pongo a true para dar de alta la dirección
          this.alta_direccion = true;
          this.direccion_id=0;
          console.log(this.alta_direccion, respuesta);
          this.alta.controls['cp'].setValue('');
          this.alta.controls['ciudad'].setValue('');
          this.alta.controls['provincia'].setValue('');
          this.alta.controls['pais'].setValue('');
        }else {
          this.direccion_id = respuesta.id;
          this.alta.controls['cp'].setValue(respuesta.cp);
          this.alta.controls['ciudad'].setValue(respuesta.ciudad);
          this.alta.controls['provincia'].setValue(respuesta.provincia);
          this.alta.controls['pais'].setValue(respuesta.pais);
        }
      });
  }

  /**
   * Si no existe la dirección la crea y guarda el id
   * @param cp_id
   * @return void
   */
  crearDireccion(cp_id:number):void{
    //Pregunto si se encontró antes la dirección, para darla o no de alta
    if (this.alta_direccion) {
      let direccion=new Direcciones();
      direccion.calle=String(this.alta.controls['calle']?.value);
      direccion.km=String(this.alta.controls['km']?.value);
      direccion.numero=String(this.alta.controls['numero']?.value);
      direccion.bloque=String(this.alta.controls['bloque'].value);
      direccion.piso=String(this.alta.controls['piso'].value);
      direccion.letra=String(this.alta.controls['letra'].value);
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
      //Pongo a true para dar de alta el CP
        this.alta_cp = true;
        this.alta.controls['ciudad'].setValue('');
        this.alta.controls['provincia'].setValue('');
        this.alta.controls['pais'].setValue('');
      }else {
        this.cp_id = respuesta.id;
        this.crearDireccion(this.cp_id);
        this.alta.controls['ciudad'].setValue(respuesta.ciudad);
        this.alta.controls['provincia'].setValue(respuesta.provincia);
        this.alta.controls['pais'].setValue(respuesta.pais);
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
      cp.numero=parseInt(String(this.alta.controls['cp']?.value));
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
        //Pongo a true para dar de alta la ciudad
        this.alta_ciudad = true;
        this.alta.controls['provincia'].setValue('');
        this.alta.controls['pais'].setValue('');
      }else {
        this.ciudad_id = respuesta.id;
        this.alta.controls['provincia'].setValue(respuesta.provincia);
        this.alta.controls['pais'].setValue(respuesta.pais);
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
      ciudad.ciudad=String(this.alta.controls['ciudad'].value);
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
  buscarProvincia($event: any):void{
    let provincia = $event.target.value;
    this.provincia_servicio.buscarPorNombre(provincia).subscribe((respuesta) => {
      if (!respuesta.status) {
        //Pongo a true para dar de alta la provincia
        this.alta_provincia = true;
        this.alta.controls['pais'].setValue('');
      }else {
        this.provincia_id = respuesta.id;
        this.alta.controls['pais'].setValue(respuesta.pais);
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
        provin.nombre=String(this.alta.controls['provincia'].value);
        provin.codigo=parseInt(String(this.alta.controls['cp'].value).substring(0,2));
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

  /**País, si no se encuentra, lo da de alta
   * @param $event
   * @return void
   */
  buscarPais($event: any):void {
    let pais = $event.target.value;
    this.paises_servicio.buscarPorNombre(pais).subscribe((respuesta) => {
      if (!respuesta.status) {
        let pais=new Paises();
        pais.nombre=String(this.alta.controls['pais'].value);
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
