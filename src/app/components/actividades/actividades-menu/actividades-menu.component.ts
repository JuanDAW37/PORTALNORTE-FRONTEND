import { Component } from '@angular/core';
import { MisPipesPipe } from 'src/app/pipes/mis-pipes.pipe';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActividadesService } from 'src/app/services/actividades.service';
import { Actividades } from 'src/app/models/actividades.models';
import { SwitchService } from 'src/app/services/switch.service';

@Component({
  selector: 'app-actividades-menu',
  templateUrl: './actividades-menu.component.html',
  styleUrls: ['../../../app.component.css']
})
export class ActividadesMenuComponent {
  public actividades:Actividades[];
  public title = 'Actividades';
  public page!:number;
  public consulta:boolean=false;
  public moneda:string="€";
  public horas:string="horas";
  public menu_pipe!: MisPipesPipe;
  public valores=JSON.parse(String(localStorage.getItem('token')));
  public rol!:number;
  public tari:number=1;
  public pers:number=1;
  public dura:number=1;

  filtrar=new FormGroup({
    'duracion':new FormControl(),
    'tarifa':new FormControl(),
    'personas':new FormControl(),
  });

  constructor(public actividad_servicio : ActividadesService) {
    this.actividades=[];
  }

  ngOnInit(): void {
    this.datos();
  }

  /**
   * Recarga o inicializa el listado
   * @returns void
   */
  datos():void{
    this.actividad_servicio.get().subscribe(data=>{
      this.actividades=data;
      this.rol=this.valores.rol;
      this.consulta=true;
    });
  }

  /**
   * Realiza el filtrado dependiendo de la duración, personas y tarifa
   * @returns void
   */
  filtrarLista():void{
    let personas=this.tari;
    let tarifa=this.pers;
    let duracion=this.dura;
    let actividad=new Actividades();
    isNaN(duracion)?duracion=0:duracion=this.dura;
    isNaN(tarifa)?tarifa=0:tarifa=this.tari;
    isNaN(personas)?personas=0:personas=this.pers;
    actividad.personas=personas;
    actividad.duracion=duracion;
    actividad.tarifa=tarifa;
      this.actividad_servicio.filtrar(actividad).subscribe(data=>{
        this.actividades=[];
        if(data.status){
          for(let i =0 ; i<data.actividades.length;i++){
            let acti=new Actividades();
            acti.id=data.actividades[i].id;
            acti.actividad=data.actividades[i].actividad
            acti.tipo=data.actividades[i].tipo;
            acti.tarifa=data.actividades[i].tarifa;
            acti.descripcion=data.actividades[i].descripcion;
            acti.personas=data.actividades[i].personas;
            acti.duracion=data.actividades[i].duracion;
            console.log(acti);
            this.actividades.push(acti);
          }
        }else{
          this.limpiar();
        }
      });

  }

  /**
   * Limpia los campos del filtro y recarga el menú
   * @return void
   */
  limpiar():void{
    console.log('pulsado');
    this.filtrar.controls['tarifa'].setValue('');
    this.filtrar.controls['personas'].setValue('');
    this.filtrar.controls['duracion'].setValue('');
    this.tari=1;
    this.pers=1;
    this.dura=1;
    this.datos();
  }

  tarifa(){
    this.tari=this.filtrar.controls['tarifa'].value;
  }

  personas(){
    this.pers=this.filtrar.controls['personas'].value;
  }

  duracion(){
    this.dura=this.filtrar.controls['duracion'].value;
  }
}
