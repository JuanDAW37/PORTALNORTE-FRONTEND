import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { CpsService } from 'src/app/services/cps.service';
import { CiudadesService } from '../../../services/ciudades.service';
import { DireccionesService } from '../../../services/direcciones.service';
import { Direcciones } from '../../../models/direcciones.models';
import { ProvinciasService } from 'src/app/services/provincias.service';
import { PaisesService } from 'src/app/services/paises.service';
import { Router } from '@angular/router';
import { CP } from 'src/app/models/cps.models';
import { Paises } from 'src/app/models/paises.models';
import { Provincias } from 'src/app/models/provincias.models';
import { Ciudades } from 'src/app/models/ciudades.models';
import { Gestors } from 'src/app/models/gestors.models';
import { GestorsService } from 'src/app/services/gestors.service';
import { Telefonos } from 'src/app/models/telefonos.models';
import { TelefonosService } from 'src/app/services/telefonos.service';
import { Emails } from 'src/app/models/emails.models';
import { EmailService } from 'src/app/services/email.service';
import { DomSanitizer } from '@angular/platform-browser';
import { ImagenService } from 'src/app/services/imagen/imagen.service';

@Component({
  selector: 'app-gestors-alta',
  templateUrl: './gestors-alta.component.html',
  styleUrls: ['../../../app.component.css']
})

export class GestorsAltaComponent {
  public titulo: string = 'Alta de Gestor';
  public gestor!:Gestors;
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
  public error_telef:String="";
  public error_mail:String="";
  public archivo:any;
  public archivos:any=[];
  public previsualizacion!:String;
  public num_tel!:number;
  public edit_tel:boolean=false;
  public num_email!:number;
  public edit_email:boolean=false;
  public error_nif!:string;
  public error_user!:string;
  uploadForm!:FormGroup

  constructor(
    public paises_servicio: PaisesService,
    public provincia_servicio: ProvinciasService,
    public ciudad_servicio: CiudadesService,
    public cp_servicio: CpsService,
    private direccion: DireccionesService,
    public gestorsService: GestorsService,
    private router: Router,
    private telef_service: TelefonosService,
    private email_service: EmailService,
    private sanitizer: DomSanitizer,
    private formBuilder: FormBuilder,
    private imagen: ImagenService){
      this.telef=[];
      this.email=[];
    };

    ngOnInit(): void {
    //Defino los campos del formulario con las validaciones
      this.uploadForm=this.formBuilder.group({
        nombre: new FormControl('', [Validators.required, Validators.minLength(1)]),
        apellido1: new FormControl('', [Validators.required, Validators.minLength(1)]),
        apellido2: new FormControl(''),
        nif: new FormControl('', [Validators.required, Validators.minLength(4),Validators.maxLength(15)]),
        foto: new FormControl(''),
        user: new FormControl('', [Validators.required, Validators.minLength(1)]),
        password: new FormControl('', [Validators.required, Validators.minLength(1)]),
        contrato: new FormControl('',[Validators.required, Validators.minLength(1)]),
        sueldo: new FormControl(0, [Validators.required, Validators.min(1)]),
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
        tblEmail: new FormControl()});
    }

  /**Se les da un nombre descriptivo a los campos, a la hora de que sea más cómodo validarlos */
  get nombre():FormControl {
    return this.uploadForm.get('nombre') as FormControl;
  }

  get nif():FormControl {
    return this.uploadForm.get('nif') as FormControl;
  }

  get apellido1():FormControl {
    return this.uploadForm.get('apellido1') as FormControl;
  }

  get user():FormControl {
    return this.uploadForm.get('user') as FormControl;
  }

  get password():FormControl {
    return this.uploadForm.get('password') as FormControl;
  }

  get contrato():FormControl {
    return this.uploadForm.get('contrato') as FormControl;
  }

  get sueldo():FormControl {
    return this.uploadForm.get('sueldo') as FormControl;
  }

  get calle():FormControl {
    return this.uploadForm.get('calle') as FormControl;
  }

  get cp():FormControl {
    return this.uploadForm.get('cp') as FormControl;
  }

  get ciudad():FormControl {
    return this.uploadForm.get('ciudad') as FormControl;
  }

  get provincia():FormControl {
    return this.uploadForm.get('provincia') as FormControl;
  }

  get pais():FormControl {
    return this.uploadForm.get('pais') as FormControl;
  }

  /**
   * Comprueba el NIF al salir del input, en caso de que exista coge de nuevo el control
   * @params any event
   * @return void
   */
  compruebaNIF(event:any):void{
    if((this.uploadForm.controls['nif'].value!=undefined)||(this.uploadForm.controls['nif'].value!=null)){
      let nif=this.uploadForm.controls['nif'].value;
      let user="";
      this.gestorsService.nifUser(nif, user).subscribe((data)=>{
        if(data.status){
          this.error_nif=data.mensaje;
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
    if((this.uploadForm.controls['user'].value!=undefined)||(this.uploadForm.controls['user'].value!=null)){
      let nif=""
      let user=this.uploadForm.controls['user'].value;;
      this.gestorsService.nifUser(nif, user).subscribe((data)=>{
        if(data.status){
          this.error_user=data.mensaje;
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
    this.error_nif="";
    this.error_user="";
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
  })

  /**
   * Incluye el teléfono en la lista, verificando antes si existe o no
   * @returns void
   */
  guardaTelefono():void{
    let telef=String(this.uploadForm.controls['nTelef'].value);
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
   * Coge el teléfono para modificarlo
   *  @param number i
   * @returns void
   */
  cogeTelefono(i:number):void{
    this.uploadForm.controls['nTelef'].setValue(this.telef[i].numero);
    this.edit_tel=true;
    this.num_tel=i;
  }

  /**
   * Incluye el teléfono en la lista, verificando antes si existe o no
   * @returns void
   */
  guardaEmail():void{
    let email=String(this.uploadForm.controls['dEmail']?.value);
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
    this.uploadForm.controls['dEmail'].setValue(this.email[i].email);
    this.edit_email=true;
    this.num_email=i;
  }

  /**Cierra el formulario
   * @returns void
  */
  cerrar():void {
    this.router.navigate(['/gestor']);
  }

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
      this.imagen.gestor(formData).subscribe((data)=>{
        console.log(data);
      });
    }catch(e){
      console.log(e);
    }
  }

  /**Da de alta la gestor
   * Si hay lista de emails, los guarda
   * Si hay lista de teléfonos, los guarda
   * @returns void
  */
  guardar():void{
    try{
      let gestor=new Gestors();
      gestor.nombre = String(this.uploadForm.controls['nombre']?.value);
      gestor.nif = String(this.uploadForm.controls['nif']?.value);
      gestor.apellido1= String(this.uploadForm.controls['apellido1']?.value);
      gestor.apellido2= String(this.uploadForm.controls['apellido2']?.value);
      gestor.contrato=String(this.uploadForm.controls['contrato']?.value);
      gestor.user=String(this.uploadForm.controls['user']?.value);
      gestor.password=String(this.uploadForm.controls['password']?.value);
      if(this.archivo!=undefined){
        gestor.foto=this.archivo.name;
      }else{
        gestor.foto="";
      }
      gestor.sueldo=parseFloat(String(this.uploadForm.controls['sueldo']?.value));
      gestor.direccione_id = this.direccion_id;
      this.gestorsService.insert(gestor).subscribe((data) => {
        if(this.archivo!=undefined){
          this.subir();
        }
        let gestor_id=data.id;
        if (this.email.length>0){
          for (let i = 0; i < this.email.length ; i++) {
            let em=new Emails();
            em.email=this.email[i].email;
            em.gestor_id=gestor_id;
            this.email_service.insert(em).subscribe(()=>{});
          }
        }
        if (this.telef.length>0){
          for (let i = 0; i < this.telef.length ; i++) {
            let tel=new Telefonos();
            tel.numero=this.telef[i].numero;
            tel.gestor_id=gestor_id;
            this.telef_service.insert(tel).subscribe(()=>{});
          }
        }
        this.router.navigate(['/gestor']);
        return;
      });
    }catch(e){
      console.log(e);
    }
  }

  /**
   * Dirección, si se encuentra, trae cp, ciudad, provincia y país
   * @returns void
   */
  buscarDireccion():void{
    let calle = String(this.uploadForm.controls['calle']?.value);
    let km = String(this.uploadForm.controls['km']?.value);
    let numero = String(this.uploadForm.controls['numero']?.value);
    let bloque = String(this.uploadForm.controls['bloque'].value);
    let piso = String(this.uploadForm.controls['piso'].value);
    let letra = String(this.uploadForm.controls['letra'].value);
    this.direccion.filtrar(calle, km, numero, bloque, piso, letra).subscribe((respuesta) => {
        if (!respuesta.status) {
          //Pongo a true para dar de alta la dirección
          this.alta_direccion = true;
          this.direccion_id=0;
          console.log(this.alta_direccion, respuesta);
          this.uploadForm.controls['cp'].setValue('');
          this.uploadForm.controls['ciudad'].setValue('');
          this.uploadForm.controls['provincia'].setValue('');
          this.uploadForm.controls['pais'].setValue('');
        }else {
          this.direccion_id = respuesta.id;
          this.uploadForm.controls['cp'].setValue(respuesta.cp);
          this.uploadForm.controls['ciudad'].setValue(respuesta.ciudad);
          this.uploadForm.controls['provincia'].setValue(respuesta.provincia);
          this.uploadForm.controls['pais'].setValue(respuesta.pais);
        }
      });
  }

  /**
   * Si no existe la dirección la crea y guarda el id
   * @param cp_id
   * @returns void
   */
  crearDireccion(cp_id:number):void{
    //Pregunto si se encontró antes la dirección, para darla o no de alta
    if (this.alta_direccion) {
      let direccion=new Direcciones();
      direccion.calle=String(this.uploadForm.controls['calle']?.value);
      direccion.km=String(this.uploadForm.controls['km']?.value);
      direccion.numero=String(this.uploadForm.controls['numero']?.value);
      direccion.bloque=String(this.uploadForm.controls['bloque'].value);
      direccion.piso=String(this.uploadForm.controls['piso'].value);
      direccion.letra=String(this.uploadForm.controls['letra'].value);
      direccion.cp_id=cp_id;
      this.direccion.insert(direccion).subscribe((alta_dir)=>{
        this.direccion_id=alta_dir.id;
        this.alta_direccion=false;
      });
    }
  }

  /**
   * Inicializa las flags de dirección y cp y llama a buscar dirección
   * @returns void
   */
  entraCp():void{
    this.alta_direccion=false;
    this.buscarDireccion();
    this.alta_cp=false;
  }

  /**Cp, si se encuentra, trae la ciudad, provincia y país y crea la dirección
   * @param $event
   * @returns void
   */
  buscarCp($event: any):void{
    let cp = parseInt($event.target.value);
    this.cp_servicio.filtrar(cp).subscribe((respuesta)=>{
      if (!respuesta.status) {
      //Pongo a true para dar de alta el CP
        this.alta_cp = true;
        this.uploadForm.controls['ciudad'].setValue('');
        this.uploadForm.controls['provincia'].setValue('');
        this.uploadForm.controls['pais'].setValue('');
      }else {
        this.cp_id = respuesta.id;
        this.crearDireccion(this.cp_id);
        this.uploadForm.controls['ciudad'].setValue(respuesta.ciudad);
        this.uploadForm.controls['provincia'].setValue(respuesta.provincia);
        this.uploadForm.controls['pais'].setValue(respuesta.pais);
      }
    });
  }

  /**
   * Crea el código postal, en caso de que no exista y guarda su id
   * @param ciudad_id
   * @returns void
   */
  crearCp(ciudad_id:number):void{
    if (this.alta_cp) {
      let cp=new CP();
      cp.numero=parseInt(String(this.uploadForm.controls['cp']?.value));
      cp.ciudade_id=ciudad_id;
      this.cp_servicio.insert(cp).subscribe((alta_cp)=>{
        this.cp_id=alta_cp.id;
        this.alta_cp=false;
      });
    }
  }

  /**
   * Inicializa la flag para ciudad
   * @returns void
   */
  entraCiudad():void{
    this.alta_ciudad=false;
  }

  /**Ciudad, si se encuentra, trae la provincia y país, y crea el cp y la dirección
   * @param $event
   * @returns void
   */
  buscarCiudad($event: any):void {
    let ciudad = $event.target.value;
    this.ciudad_servicio.filtrar(ciudad).subscribe((respuesta) => {
      if (!respuesta.status) {
        //Pongo a true para dar de alta la ciudad
        this.alta_ciudad = true;
        this.uploadForm.controls['provincia'].setValue('');
        this.uploadForm.controls['pais'].setValue('');
      }else {
        this.ciudad_id = respuesta.id;
        this.uploadForm.controls['provincia'].setValue(respuesta.provincia);
        this.uploadForm.controls['pais'].setValue(respuesta.pais);
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
   * @returns void
   */
  crearCiudad(provin_id:number):void{
    if(this.alta_ciudad){
      let ciudad=new Ciudades();
      ciudad.ciudad=String(this.uploadForm.controls['ciudad'].value);
      ciudad.provincia_id=provin_id;
      this.ciudad_servicio.insert(ciudad).subscribe((ins_ciu)=>{
        this.ciudad_id=ins_ciu.id;
        this.alta_ciudad=false;
      });
    }
  }

  /**
   * Inicializa la flag de provincia
   *  @returns void
   */
  entraProvincia():void{
    this.alta_provincia=false;
  }

  /**Provincia, si se encuentra trae el país
   * @param $event
   * @returns void
   */
  buscarProvincia($event: any):void{
    let provincia = $event.target.value;
    this.provincia_servicio.buscarPorNombre(provincia).subscribe((respuesta) => {
      if (!respuesta.status) {
        //Pongo a true para dar de alta la provincia
        this.alta_provincia = true;
        this.uploadForm.controls['pais'].setValue('');
      }else {
        this.provincia_id = respuesta.id;
        this.uploadForm.controls['pais'].setValue(respuesta.pais);
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
        provin.nombre=String(this.uploadForm.controls['provincia'].value);
        provin.codigo=parseInt(String(this.uploadForm.controls['cp'].value).substring(0,2));
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
   * @returns void
   */
  buscarPais($event: any):void {
    let pais = $event.target.value;
    this.paises_servicio.buscarPorNombre(pais).subscribe((respuesta) => {
      if (!respuesta.status) {
        let pais=new Paises();
        pais.nombre=String(this.uploadForm.controls['pais'].value);
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
