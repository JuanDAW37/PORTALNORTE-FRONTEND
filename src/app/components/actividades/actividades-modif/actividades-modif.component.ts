import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
  selector: 'app-actividades-modif',
  templateUrl: './actividades-modif.component.html',
  styleUrls: ['../../../app.component.css']
})
export class ActividadesModifComponent {
  public titulo!:string;
  public list:number=1;
  public ivas!:Iva[];
  public gestors!:Gestors[];
  public tipos!:TiposActividades[];
  public modif!:FormGroup;
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
  public id!:number;
  public mensaje!:string;

  constructor (private router: Router, private sanitizer: DomSanitizer,
    private formBuilder: FormBuilder, private route : ActivatedRoute,
    private imagen: ImagenService, public actividades_service : ActividadesService,
    private  iva_service : IvasService, private gestor_service : GestorsService,
    private tipo_service : TiposActividadService, private guias_service : GuiasService,
    private ubicaciones_service : UbicacionesService, private material_service : MaterialesService){
      this.id=this.route.snapshot.params['id'];
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
    this.modif=this.formBuilder.group({
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
    this.datos();
    if (this.actividades_service.estado) {
      this.titulo="Consulta de actividad";
      this.modif.controls['actividad'].disable();
      this.modif.controls['tarifa'].disable();
      this.modif.controls['iva'].disable();
      this.modif.controls['gestor'].disable();
      this.modif.controls['tipo'].disable();
      this.modif.controls['descripcion'].disable();
      this.modif.controls['personas'].disable();
      this.modif.controls['duracion'].disable();
      this.modif.controls['material'].disable();
      this.modif.controls['foto'].disable();
      this.modif.controls['trabajador'].disable();
      this.modif.controls['ubicacion'].disable();
      this.modif.controls['inicio'].disable();
      this.modif.controls['fin'].disable();
      this.modif.controls['actividad'].removeValidators([Validators.required, Validators.minLength(1)]);
      this.modif.controls['tarifa'].removeValidators([Validators.required, Validators.minLength(1)]);
    }else{
      this.titulo="Modificación de Actividad";
    }
  }

  /**
   * Rellena los campos del formulario
   * @returns void
   */
  datos():void{
    this.actividades_service.leer(this.id).subscribe(data=>{
      this.modif.controls['actividad'].setValue(data.actividad);
      this.modif.controls['tarifa'].setValue(data.tarifa);
      this.modif.controls['iva'].setValue(data.iva_id);
      this.modif.controls['gestor'].setValue(data.gestor_id);
      this.modif.controls['tipo'].setValue(data.tiposactividade_id);
      this.modif.controls['descripcion'].setValue(data.descripcion);
      this.modif.controls['personas'].setValue(data.personas);
      this.modif.controls['duracion'].setValue(data.duracion);
      this.modif.controls['foto'].setValue(data.foto);
      this.modif.controls['inicio'].setValue(data.hora_inicio);
      this.modif.controls['fin'].setValue(data.hora_fin);
      for(let i of data.material){
        let act_mat=new Materiales();
        act_mat.id=i.id;
        act_mat.nombre=i.nombre;
        act_mat.list=this.list+((this.tablaMat.length)-1);
        this.tablaMat.push(act_mat);
      }
      for(let i of data.guias){
        let act_trabajador=new Trabajadores();
        act_trabajador.id=i.id;
        act_trabajador.nombre=i.nombre;
        act_trabajador.apellido1=i.apellido1;
        act_trabajador.apellido2=i.apellido2;
        act_trabajador.nif=i.nif;
        act_trabajador.list=this.list+((this.tablaTrab.length)-1);
        this.tablaTrab.push(act_trabajador);
      }
      for(let i of data.ubicacion){
        let act_ubi=new Ubicaciones();
        act_ubi.id=i.id;
        act_ubi.nombre=i.nombre;
        act_ubi.lat=i.lat;
        act_ubi.lon=i.lon;
        act_ubi.list=this.list+((this.tablaUbi.length)-1);
        this.tablaUbi.push(act_ubi);
      }
    })
  }

  /**Se les da un nombre descriptivo a los campos, a la hora de que sea más cómodo validarlos */
  get actividad():FormControl{
    return this.modif.get('actividad') as FormControl;
  }

  get tarifa():FormControl{
    return this.modif.get('tarifa') as FormControl;
  }

  /**
     * Quita el trabajador de la tabla
     * @param i
     * @returns void
     */
  borrarTrab(i: number):void{
    let acti_trab=new ActividadesTrabajadores();
    acti_trab.actividade_id=this.id;
    acti_trab.trabajadore_id=this.tablaTrab[i].id;
    this.actividades_service.detachTrabajadores(acti_trab).subscribe(()=>{
      this.tablaTrab.splice(i,1);
    });
  }

  /**
   * Añade el trabajador a la tabla Tablatrab
   * @returns void
   */
  addTrabajador():void{
    if (this.modif.controls['trabajador'].value!=null){
      let trab = this.modif.controls['trabajador'].value;
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
        let actitrab = new ActividadesTrabajadores();
        actitrab.actividade_id=this.id;
        actitrab.trabajadore_id=id_trab;
        this.actividades_service.attachTrabajadores(actitrab).subscribe();
      });
    }
  }

  /**
   * Quita el material de la tabla
   * @param i
   * @returns void
   */
  borrarMat(i: number):void{
    let acti_mat=new ActividadesMateriales();
    acti_mat.actividade_id=this.id;
    acti_mat.materiale_id=this.tablaMat[i].id;
    this.actividades_service.detachMaterial(acti_mat).subscribe(()=>{
      this.tablaMat.splice(i,1);
    });
  }

  /**
   * Añade el material a la tabla tablaMat
   * @returns void
   */
  addMaterial():void{
    if (this.modif.controls['material'].value!=null){
      let mat = this.modif.controls['material'].value;
      this.material_service.leer(mat).subscribe((valor)=>{
        let acti_mat=new Materiales();
        let id_mat=valor.id;
        let nom_mat=valor.nombre;
        acti_mat.list=this.list+((this.tablaTrab.length)-1);
        acti_mat.id=id_mat;
        acti_mat.nombre=nom_mat;
        this.tablaMat.push(acti_mat);
        let actimat = new ActividadesMateriales();
        actimat.actividade_id=this.id;
        actimat.materiale_id=id_mat;
        this.actividades_service.attachMateriales(actimat).subscribe();
      })
    }
  }

  /**
   * Quita la ubicación de la tabla
   * @param i
   * @returns void
  */
  borrarUbi(i: number):void{
    let acti_ubi=new Actividades_Ubicaciones();
    acti_ubi.actividade_id=this.id;
    acti_ubi.ubicacione_id=this.tablaUbi[i].id;
    this.actividades_service.detachUbicaciones(acti_ubi).subscribe(()=>{
      this.tablaUbi.splice(i,1);
    });
  }

  /**
  * Añade el material a la tabla tablaMat
  * @returns void
  */
  addUbicacion():void{
    if (this.modif.controls['ubicacion'].value!=null){
      let ubi = this.modif.controls['ubicacion'].value;
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
        let actiubi = new Actividades_Ubicaciones();
        actiubi.actividade_id=this.id;
        actiubi.ubicacione_id=acti_ubi.id;
        this.actividades_service.attachUbicaciones(actiubi).subscribe();
      })
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
    if((this.modif.controls['inicio'].value!=null)&&(this.modif.controls['fin'].value!=null)){
      let inicio=(this.modif.controls['inicio'].value).split(":");
      let fin=(this.modif.controls['fin'].value).split(":");
      let t1=new Date();
      let t2=new Date();
      t1.setHours(fin[0],fin[1]);
      t2.setHours(inicio[0],inicio[1]);
      t1.setHours(t1.getHours() - t2.getHours(), t1.getMinutes() - t2.getMinutes());
      let horas=t1.getHours();
      if(parseInt(this.modif.controls['duracion'].value)<horas){
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

  /**Guarda la modificación cierra el formulario
   * @returns void
  */
  guardar():void{
    this.activ.id=this.id;
    this.activ.actividad=this.modif.controls['actividad'].value;
    this.activ.descripcion=this.modif.controls['descripcion'].value;
    this.activ.tarifa=parseFloat(this.modif.controls['tarifa'].value);
    this.activ.personas=parseInt(this.modif.controls['personas'].value);
    this.activ.duracion=parseInt(this.modif.controls['duracion'].value);
    this.activ.hora_inicio=this.modif.controls['inicio'].value;
    this.activ.hora_fin=this.modif.controls['fin'].value;
    this.activ.gestor_id=this.modif.controls['gestor'].value;
    this.activ.iva_id=this.modif.controls['iva'].value;
    this.activ.tiposactividade_id=this.modif.controls['tipo'].value;
    this.activ.foto=this.modif.controls['foto'].value;
    if(this.archivo!=undefined){
      this.activ.foto=this.archivo.name;
    }else{
      this.activ.foto="";
    }
    this.actividades_service.update(this.activ).subscribe((data)=>{
      if(this.activ.foto!=""){
        this.subir();
      }
      this.mensaje=data.mensaje;
    });
  }
}
