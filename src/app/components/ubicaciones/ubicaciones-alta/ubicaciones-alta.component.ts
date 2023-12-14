import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Ubicaciones } from 'src/app/models/ubicaciones.models';
import { Router } from '@angular/router';
import { UbicacionesService } from 'src/app/services/ubicaciones.service';
import { ActividadesService } from './../../../services/actividades.service';
import { Actividades } from 'src/app/models/actividades.models';
import { Actividades_Ubicaciones } from 'src/app/models/actividades_ubicaciones.models';
import { MapModule } from 'src/app/modules/map/Map.module';

@Component({
  selector: 'app-ubicaciones-alta',
  templateUrl: './ubicaciones-alta.component.html',
  styleUrls: ['../../../app.component.css']
})

export class UbicacionesAltaComponent {
  public current_ubi=new Ubicaciones();
  public actividades!:Actividades[];
  public tablaActi!:Actividades[];
  public list:number=1;
  public cargaMapa:boolean=false;
  public mapa:string="Ver mapa";
  public vMap:boolean=false;
  public titulo="Alta de Ubicación";


/**Defino los campos del formulario con las validaciones */
  public formAltaUb=new FormGroup({
    'nombre':new FormControl('', [Validators.required, Validators.minLength(1)]),
    'lat': new FormControl([Validators.required, Validators.minLength(4), Validators.maxLength(8)]),
    'lon': new FormControl([Validators.required, Validators.minLength(4), Validators.maxLength(8)]),
    'activ': new FormControl()
  });

  constructor (private router: Router, private service: UbicacionesService, private actividad: ActividadesService,
    private mapas: MapModule){
    //Creo un array vacío para las actividades
    this.actividades=[];
    this.tablaActi=[];
  }

  /**Método que se llama al pulsar el + para añadir la actividad seleccionada
   * @returns void
  */
  addActi():void{
    if (this.formAltaUb.controls['activ'].value!=null){
      let acti = this.formAltaUb.controls['activ'].value;
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
        this.tablaActi.push(ubi_acti);
      })
    }
  }

  /**Al iniciarse, se cargan las actividades
   * @returns void
   */
  ngOnInit(): void {
    this.actividad.get().subscribe((acti)=>{
      this.actividades = acti;
    });
    this.formAltaUb.controls['activ'].setValue(1);
  }

  /**
   * Elimina la actividad de la tabla
   * @param id any
   *  @returns void
  */
borrarActi(id: any):void{
  let nuevoArray=this.tablaActi.splice(id,1);
  if(this.tablaActi.length==1){
    this.tablaActi=nuevoArray;
  }
}

  /**Se les da un nombre descriptivo a los campos, a la hora de que sea más cómodo validarlos */
  get lat():FormControl{
    return this.formAltaUb.get('lat') as FormControl;
  }

  get nombre():FormControl {
    return this.formAltaUb.get('nombre') as FormControl;
  }

  get lon():FormControl{
    return this.formAltaUb.get('lon') as FormControl;
  }

  /**Recogemos las coordenadas se consulta a la API de OpenStreetMaps y se trae el mapa
   * @returns void
  */
  verMapa():void{
    if ((this.formAltaUb.get('lat')?.valid) && (this.formAltaUb.get('lon')?.valid)) {
      this.vMap=!this.vMap;
      if(this.vMap){
        this.mapa="Ocultar mapa";
        this.vMap=true;
        let lat=parseFloat(String(this.formAltaUb.get('lat')?.value));
        let lon=parseFloat(String(this.formAltaUb.get('lon')?.value));
        this.cargaMapa=true;
        this.mapas.guardaCoordenadas(lat, lon);
      }else{
        this.mapa="Ver mapa";
        this.vMap=false;
        this.cargaMapa=false;
      }
    }
  }

  /**Cierra el formulario
   * @returns void
  */
  cerrar(){
    this.router.navigate(['/ubicaciones']);
  }

  /**Da de alta en Ubicaciones, y si hubiese datos en la tabla, también en la tabla pivote actividades_ubicaciones
   * y cierra el formulario
   * @returns void
   * */
  guardar():void{
    this.current_ubi.nombre=String(this.formAltaUb.get('nombre')?.value);
    this.current_ubi.lat=parseFloat(String(this.formAltaUb.get('lat')?.value));
    this.current_ubi.lon=parseFloat(String(this.formAltaUb.get('lon')?.value));
    this.service.insert(this.current_ubi).subscribe((data)=>{
      console.log(data);
      if(this.tablaActi.length>0){
        for (let i = 0; i < this.tablaActi.length ; i++) {
          let acti_ubi=new Actividades_Ubicaciones();
          acti_ubi.actividade_id=this.tablaActi[i].id;
          alert(this.tablaActi[i].id)
          acti_ubi.ubicacione_id=data.id;
          alert(data.id)
          this.actividad.attachUbicaciones(acti_ubi).subscribe(()=>{});
        }
      }
    });
    this.service.get().subscribe(()=>{});
    this.router.navigate(['/ubicaciones']);
  }
}
