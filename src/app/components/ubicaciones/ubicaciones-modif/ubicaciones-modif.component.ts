import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Ubicaciones } from 'src/app/models/ubicaciones.models';
import { Router } from '@angular/router';
import { UbicacionesService } from 'src/app/services/ubicaciones.service';
import { ActividadesService } from './../../../services/actividades.service';
import { Actividades } from 'src/app/models/actividades.models';
import { Actividades_Ubicaciones } from 'src/app/models/actividades_ubicaciones.models';
import { MapModule } from 'src/app/modules/map/Map.module';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ubicaciones-modif',
  templateUrl: './ubicaciones-modif.component.html',
  styleUrls: ['../../../app.component.css']
})
export class UbicacionesModifComponent {
  public current_ubi=new Ubicaciones();
  public actividades!:Actividades[];
  public tablaActi!:Actividades[];
  public list:number=1;
  public id!:number;
  public data!:any;
  public titulo:string=""
  public cargaMapa:boolean=false;
  public mapa:string="Ver mapa";
  public vMap:boolean=false;
  public mensaje:string="";

  /**Defino los campos del formulario con las validaciones */
  public formModUb=new FormGroup({
    'nombre':new FormControl('', [Validators.required, Validators.minLength(1)]),
    'lat':new FormControl([Validators.required, Validators.minLength(4), Validators.maxLength(8)]),
    'lon':new FormControl([Validators.required, Validators.minLength(4), Validators.maxLength(8)]),
    'activ': new FormControl(),
  });

  constructor(private route: ActivatedRoute, private router: Router, public service: UbicacionesService, private actividad: ActividadesService,
    private mapas: MapModule){
    //Creo un array vacío para las actividades
    this.actividades=[];
    this.tablaActi=[];
    this.id=this.route.snapshot.params['id'];
    if(this.service.estado){
      this.formModUb.get('activ')?.disable();
      this.formModUb.controls.nombre.removeValidators([Validators.required, Validators.minLength(1)]);
      this.formModUb.get('nombre')?.disable();
      this.titulo="Consultar ubicación";
    }else{
      this.titulo="Modificar ubicación";
    }

  }

  /**
   * Método que se llama al pulsar el + para añadir a la ubicación, la actividad seleccionada
   * y da un alta en la tabla pivote
   * @returns void
   * */
  addActi():void{
    if (this.formModUb.controls['activ'].value!=null){
      let acti = this.formModUb.controls['activ'].value;
      this.actividad.leer(acti).subscribe((valor)=>{
        let ubi_acti=new Actividades();
        let id_acti=valor.id;
        let nom_acti=valor.actividad;
        let tar_acti=valor.tarifa;
        let dur_acti=valor.duracion;
        ubi_acti.list=this.list+((this.tablaActi.length)-1);
        ubi_acti.id=id_acti;
        ubi_acti.actividad=nom_acti;
        ubi_acti.tarifa=tar_acti;
        ubi_acti.duracion=dur_acti;
        let acti_ubi=new Actividades_Ubicaciones();
        acti_ubi.actividade_id=ubi_acti.id;
        acti_ubi.ubicacione_id=this.id;
        this.actividad.attachUbicaciones(acti_ubi).subscribe(()=>{
          this.tablaActi.push(ubi_acti);
        });
      })
    }
  }

  /**
   * Al iniciarse, se cargan las actividades
   * @returns void
   * */
  ngOnInit():void {
    this.datos();
    this.formModUb.controls['activ'].setValue(1);
  }

  /**
   * Traigo los datos de la ubicación y todas las actividades que haya
   * @returns void
   * */
  public datos():void {
    this.service.leer(this.id).subscribe((respuesta)=>{
      this.data = respuesta;
      this.formModUb.controls['nombre'].setValue(this.data.nombre);
      this.formModUb.controls['lat'].setValue(this.data.lat);
      this.formModUb.controls['lon'].setValue(this.data.lon);
      for (let i of this.data.actividades) {
        let ubi=new Actividades();
        let id_acti=i.id;
        let nom_acti=i.actividad;
        let tar_acti=i.tarifa;
        let dur_acti=i.duracion;
        ubi.list=this.list+((this.tablaActi.length)-1);
        ubi.id=id_acti;
        ubi.actividad=nom_acti;
        ubi.tarifa=tar_acti;
        ubi.duracion=dur_acti;
        this.tablaActi.push(ubi);
      }
    });
    this.actividad.get().subscribe((acti)=>{
      this.actividades = acti;
    });
  }

  /**
   * Elimina la actividad de la tabla y hace el DETACH en la tabla pivote
   * @param id any
   * @returns void
  */
  borrarActi(i: number):void{
    let acti_ubi=new Actividades_Ubicaciones();
    acti_ubi.actividade_id=this.tablaActi[i].id;
    acti_ubi.ubicacione_id=this.id;
    this.actividad.detachUbicaciones(acti_ubi).subscribe(()=>{
      this.tablaActi.splice(i,1);
    });
  }

  /**Se les da un nombre descriptivo a los campos, a la hora de que sea más cómodo validarlos */
  get lat():FormControl{
    return this.formModUb.get('lat') as FormControl;
  }

  get nombre():FormControl{
    return this.formModUb.get('nombre') as FormControl;
  }

  get lon():FormControl{
    return this.formModUb.get('lon') as FormControl;
  }

  /**
   * Recogemos las coordenadas se consulta a la API de OpenStreetMaps y se trae el mapa
   * @returns void
   * */
  verMapa():void{
    if ((this.formModUb.get('lat')?.valid) && (this.formModUb.get('lon')?.valid)) {
      this.vMap=!this.vMap;
      if(this.vMap){
        this.mapa="Ocultar mapa";
        this.vMap=true;
        let lat=parseFloat(String(this.formModUb.get('lat')?.value));
        let lon=parseFloat(String(this.formModUb.get('lon')?.value));
        this.cargaMapa=true;
        this.mapas.guardaCoordenadas(lat, lon);
      }else{
        this.mapa="Ver mapa";
        this.vMap=false;
        this.cargaMapa=false;
      }
    }
  }

  /**
   * Cierra el formulario
   * @returns void
   * */
  cerrar():void{
    this.router.navigate(['/ubicaciones']);
    return;
  }

  /**
   * Hace la actualización en Ubicaciones
   * @returns void
   * */
  guardar():void{
    this.current_ubi.id=this.id;
    this.current_ubi.nombre=String(this.formModUb.get('nombre')?.value);
    this.current_ubi.lat=parseFloat(String(this.formModUb.get('lat')?.value));
    this.current_ubi.lon=parseFloat(String(this.formModUb.get('lon')?.value));
    this.service.update(this.current_ubi).subscribe((data)=>{
      this.mensaje=data.mensaje;
      this.service.get().subscribe(()=>{});
    });
  }
}
