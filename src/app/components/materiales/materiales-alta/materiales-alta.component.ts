import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Materiales } from 'src/app/models/materiales.models';
import { Router } from '@angular/router';
import { MaterialesService } from 'src/app/services/materiales.service';
import { ActividadesService } from './../../../services/actividades.service';
import { Actividades } from 'src/app/models/actividades.models';
import { ActividadesMateriales } from 'src/app/models/actividades_materiales.models';

@Component({
  selector: 'app-materiales-alta',
  templateUrl: './materiales-alta.component.html',
  styleUrls: ['../../../app.component.css']
})
export class MaterialesAltaComponent {
  public mat=new Materiales();
  public actividades!:Actividades[];
  public tablaActi!:Actividades[];
  public list:number=1;
  public titulo="Alta de Material";

  /**Defino los campos del formulario con las validaciones */
  public formAlta=new FormGroup({
    'nombre':new FormControl('', [Validators.required, Validators.minLength(1)]),
    'activ': new FormControl()
  });

  constructor (private router: Router, private service: MaterialesService, private actividad: ActividadesService){
    //Creo un array vacío para las actividades
    this.actividades=[];
    this.tablaActi=[];
  }

  /**Método que se llama al pulsar el + para añadir la actividad seleccionada
   * @return void
   */
  addActi():void{
    if (this.formAlta.controls['activ'].value!=null){
      let acti = this.formAlta.controls['activ'].value;
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
   * @return void
   */
  ngOnInit(): void {
    this.actividad.get().subscribe((acti)=>{
      this.actividades = acti;
    });
    this.formAlta.controls['activ'].setValue(1);
  }

  /**Elimina la actividad de la tabla
   * @param id any
   * @return void
  */
  borrarActi(id: any):void{
    let nuevoArray=this.tablaActi.splice(id,1);
    if(this.tablaActi.length==1){
      this.tablaActi=nuevoArray;
    }
  }

  /**Se les da un nombre descriptivo a los campos, a la hora de que sea más cómodo validarlos
   * @return FormControl
   */
  get nombre():FormControl {
    return this.formAlta.get('nombre') as FormControl;
  }

  /**Cierra el formulario
   * @return void
  */
  cerrar():void{
    this.router.navigate(['/materiales']);
  }

  /**Da de alta el material, y si hubiese actividades seleciconadas para ese material,
   * da un alta por cada una en la tabla pivote actividades_materiales y cierra el formulario
   * @return void
    */
  guardar():void{
    this.mat.nombre=String(this.formAlta.get('nombre')?.value);
    this.service.insert(this.mat).subscribe((data)=>{
      if(this.tablaActi.length>0){
        for (let i = 0; i < this.tablaActi.length ; i++) {
          let acti_mat=new ActividadesMateriales();
          acti_mat.actividade_id=this.tablaActi[i].id;
          acti_mat.materiale_id=data.id;
          this.actividad.attachMateriales(acti_mat).subscribe(()=>{});
        }
      }
    });
    this.service.get().subscribe(()=>{});
    this.router.navigate(['/materiales']);
  }
}
