import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Actividades } from 'src/app/models/actividades.models';
import { ActividadesService } from 'src/app/services/actividades.service';
import { Actividades_Ubicaciones } from '../../../models/actividades_ubicaciones.models';
import { ActividadesMateriales } from '../../../models/actividades_materiales.models';
import { Materiales } from 'src/app/models/materiales.models';
import { Trabajadores } from 'src/app/models/trabajadores.models';
import { Ubicaciones } from 'src/app/models/ubicaciones.models';
import { Iva } from 'src/app/models/ivas.models';
import { IvasService } from 'src/app/services/ivas.service';
import { Gestors } from 'src/app/models/gestors.models';
import { GestorsService } from 'src/app/services/gestors.service';
import { TiposActividades } from 'src/app/models/tiposactividades.models';
import { TiposActividadService } from 'src/app/services/tipos-actividad.service';
import { ActividadesTrabajadores } from '../../../models/activiades_trabajadores_models';
import { DomSanitizer } from '@angular/platform-browser';
import { ImagenService } from 'src/app/services/imagen/imagen.service';
import { MaterialesService } from '../../../services/materiales.service';
import { UbicacionesService } from 'src/app/services/ubicaciones.service';
import { GuiasService } from 'src/app/services/guias.service';

@Component({
  selector: 'app-actividades-alta',
  templateUrl: './actividades-alta.component.html',
  styleUrls: ['../../../app.component.css']
})
export class ActividadesAltaComponent {
  public titulo:string="Alta de Actividad";
  public list:number=1;
  public ivas!:Iva[];
  public gestors!:Gestors[];
  public tipos!:TiposActividades[];
  public alta!:FormGroup;
  public activ=new Actividades();
  public materiales!:Materiales[];
  public trabajadores!:Trabajadores[];
  public ubicaciones!:Ubicaciones[];
  public archivo:any;
  public archivos:any=[];
  public previsualizacion!:String;
  public tablaTrab!:Trabajadores[];
  public tablaUbi!:Ubicaciones[];
  public tablaMat!:Materiales[];
  public error!:string;

  constructor (private router: Router, private sanitizer: DomSanitizer,
    private formBuilder: FormBuilder,
    private imagen: ImagenService, public actividades_service : ActividadesService,
    private  iva_service : IvasService, private gestor_service : GestorsService,
    private tipo_service : TiposActividadService, private guias_service : GuiasService,
    private ubicaciones_service : UbicacionesService, private material_service : MaterialesService,){
      this.ivas=[];
      this.gestors=[];
      this.tipos=[];
      this.materiales=[];
      this.trabajadores=[];
      this.ubicaciones=[];
      this.tablaMat=[];
      this.tablaTrab=[];
      this.tablaUbi=[];
      this.iva_service.get().subscribe(data=>{
        this.ivas=data;
      });
      this.gestor_service.get().subscribe(data=>{
        this.gestors=data;
      });
      this.tipo_service.get().subscribe(data=>{
        this.tipos=data;
      });
      this.material_service.get().subscribe(data=>{
        this.materiales=data;
      });
      this.guias_service.get().subscribe(data=>{
        this.trabajadores=data;
      });
      this.ubicaciones_service.get().subscribe(data=>{
        this.ubicaciones=data;
      });
  }

  ngOnInit(): void {
    /*Campos del formulario con validación*/
    this.alta=this.formBuilder.group({
      actividad: new FormControl('', [Validators.required, Validators.minLength(1)]),
      tarifa:new FormControl(0,[Validators.required, Validators.minLength(1)]),
      iva: new FormControl(1),
      gestor: new FormControl(1),
      tipo:new FormControl(1),
      descripcion:new FormControl(''),
      personas:new FormControl(),
      duracion:new FormControl(),
      material:new FormControl(1),
      foto:new FormControl(),
      trabajador:new FormControl(1),
      ubicacion:new FormControl(1),
      inicio:new FormControl(),
      fin:new FormControl(),
    });
  }


  /**Se les da un nombre descriptivo a los campos, a la hora de que sea más cómodo validarlos */
  get actividad():FormControl {
    return this.alta.get('actividad') as FormControl;
  }

  get tarifa():FormControl {
    return this.alta.get('tarifa') as FormControl;
  }

  /**
   * Quita el trabajador de la tabla
   * @param i
   * @return void
   */
  borrarTrab(i: number):void{
    let nuevoArray=this.tablaTrab.splice(i,1);
    if(this.tablaTrab.length==1){
      this.tablaTrab=nuevoArray;
    }
  }

  /**
   * Añade el trabajador a la tabla Tablatrab
   * @return void
   */
  addTrabajador():void{
    if (this.alta.controls['trabajador'].value!=null){
      let trab = this.alta.controls['trabajador'].value;
      this.guias_service.leer(trab).subscribe((valor)=>{
        let acti_trab=new Trabajadores();
        let id_trab=valor.id;
        let nom_trab=valor.nombre;
        let ape1_trab=valor.apellido1;
        let ape2_trab=valor.apellido2;
        acti_trab.list=this.list+((this.tablaTrab.length)-1);
        acti_trab.id=id_trab;
        acti_trab.nombre=nom_trab;
        acti_trab.apellido1=ape1_trab;
        acti_trab.apellido2=ape2_trab;
        this.tablaTrab.push(acti_trab);
      })
    }
  }

  /**
   * Quita el material de la tabla
   * @param i
   * @return void
   */
  borrarMat(i: number):void{
    let nuevoArray=this.tablaMat.splice(i,1);
    if(this.tablaMat.length==1){
      this.tablaMat=nuevoArray;
    }
  }

  /**
   * Añade el material a la tabla tablaMat
   * @return void
   */
  addMaterial():void{
    if (this.alta.controls['material'].value!=null){
      let mat = this.alta.controls['material'].value;
      this.material_service.leer(mat).subscribe((valor)=>{
        let acti_mat=new Materiales();
        let id_mat=valor.id;
        let nom_mat=valor.nombre;
        acti_mat.list=this.list+((this.tablaTrab.length)-1);
        acti_mat.id=id_mat;
        acti_mat.nombre=nom_mat;
        this.tablaMat.push(acti_mat);
      })
    }
  }

  /**
     * Quita el material de la tabla
     * @param i
     * @return void
     */
  borrarUbi(i: number):void{
    let nuevoArray=this.tablaUbi.splice(i,1);
    if(this.tablaUbi.length==1){
      this.tablaUbi=nuevoArray;
    }
  }

  /**
   * Añade el material a la tabla tablaMat
   * @return void
   */
  addUbicacion():void{
    if (this.alta.controls['ubicacion'].value!=null){
      let ubi = this.alta.controls['ubicacion'].value;
      this.ubicaciones_service.leer(ubi).subscribe((valor)=>{
        let acti_ubi=new Ubicaciones();
        let id_ubi=valor.id;
        let nom_ubi=valor.nombre;
        let lat_ubi=valor.lat;
        let lon_ubi=valor.lon;
        acti_ubi.list=this.list+((this.tablaTrab.length)-1);
        acti_ubi.id=id_ubi;
        acti_ubi.nombre=nom_ubi;
        acti_ubi.lat=lat_ubi;
        acti_ubi.lon=lon_ubi;
        this.tablaUbi.push(acti_ubi);
      });
    }
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
   * Controla que las horas no se excedan del horario de inicio y fin
   * @return void
   */
  horas():void{
    if((this.alta.controls['inicio'].value!=null)&&(this.alta.controls['fin'].value!=null)){
      let inicio=(this.alta.controls['inicio'].value).split(":");
      let fin=(this.alta.controls['fin'].value).split(":");
      let t1=new Date();
      let t2=new Date();
      t1.setHours(fin[0],fin[1]);
      t2.setHours(inicio[0],inicio[1]);
      t1.setHours(t1.getHours() - t2.getHours(), t1.getMinutes() - t2.getMinutes());
      let horas=t1.getHours();
      if(parseInt(this.alta.controls['duracion'].value)<horas){
        this.error="Te estás excediendo de las horas";
      }
    }
  }

  //Cierra el formulario
  cerrar():void{
    this.router.navigate(['/actividades']);
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
      this.imagen.actividad(formData).subscribe((data)=>{
        console.log(data);
      });
    }catch(e){
      console.log(e);
    }
  }

  /**Da de alta y cierra el formulario
   * @return void
  */
  guardar():void{
    this.activ.actividad=this.alta.controls['actividad'].value;
    this.activ.descripcion=this.alta.controls['descripcion'].value;
    this.activ.tarifa=parseFloat(this.alta.controls['tarifa'].value);
    this.activ.personas=parseInt(this.alta.controls['personas'].value);
    this.activ.duracion=parseInt(this.alta.controls['duracion'].value);
    this.activ.hora_inicio=this.alta.controls['inicio'].value;
    this.activ.hora_fin=this.alta.controls['fin'].value;
    this.activ.gestor_id=this.alta.controls['gestor'].value;
    this.activ.iva_id=this.alta.controls['iva'].value;
    this.activ.tiposactividade_id=this.alta.controls['tipo'].value;
    this.activ.foto=this.alta.controls['foto'].value;
    if(this.archivo!=undefined){
      this.activ.foto=this.archivo.name;
    }else{
      this.activ.foto="";
    }
    this.actividades_service.insert(this.activ).subscribe((data)=>{
      if(this.activ.foto!=""){
        this.subir();
      }
      if(this.tablaTrab.length>0){
        //Atach de la tabla de trabajadores
        for (let i of this.tablaTrab) {
          let acti_trab = new ActividadesTrabajadores();
          acti_trab.actividade_id=data.id;
          acti_trab.trabajadore_id=i.id;
          this.actividades_service.attachTrabajadores(acti_trab).subscribe();
        }
      }
      if(this.tablaMat.length>0){
        //Atach de la tabla de materiales
        for (let i of this.tablaMat) {
          let acti_mat = new ActividadesMateriales();
          acti_mat.actividade_id=data.id;
          acti_mat.materiale_id=i.id;
          this.actividades_service.attachMateriales(acti_mat).subscribe();
        }
      }
      if(this.tablaUbi.length>0){
        //Atach de la tabla de ubicaciones
        for (let i of this.tablaUbi) {
          let acti_ubi = new Actividades_Ubicaciones();
          acti_ubi.actividade_id=data.id;
          acti_ubi.ubicacione_id=i.id;
          this.actividades_service.attachUbicaciones(acti_ubi).subscribe();
        }
      }
    });
    this.router.navigate(['/actividades']);
    return;
  }
}
