import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Materiales } from 'src/app/models/materiales.models';
import { Router } from '@angular/router';
import { MaterialesService } from 'src/app/services/materiales.service';
import { ActividadesService } from './../../../services/actividades.service';
import { Actividades } from 'src/app/models/actividades.models';
import { ActividadesMateriales } from 'src/app/models/actividades_materiales.models';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-materiales-modif',
  templateUrl: './materiales-modif.component.html',
  styleUrls: ['../../../app.component.css']
})
export class MaterialesModifComponent {
  public mat=new Materiales();
  public actividades!:Actividades[];
  public tablaActi!:Actividades[];
  public list:number=1;
  public titulo="Alta de Material";
  mensaje!:string;
  public id!:number;

   /**Defino los campos del formulario con las validaciones */
   public formModif=new FormGroup({
    'nombre':new FormControl('', [Validators.required, Validators.minLength(1)]),
    'activ': new FormControl()
  });

  constructor (private router: Router, public service: MaterialesService, private actividad: ActividadesService,
    private route: ActivatedRoute){
    this.id=this.route.snapshot.params['id'];
    //Creo un array vacío para las actividades
    this.actividades=[];
    this.tablaActi=[];
  }

  /**Al iniciarse, se cargan las actividades
   * @returns void
  */
  ngOnInit(): void {
    this.datos();
    this.actividad.get().subscribe((acti)=>{
      this.actividades = acti;
    });
    this.formModif.controls['activ'].setValue(1);
    if(this.service.estado){
      this.formModif.get('activ')?.disable();
      this.formModif.controls.nombre.removeValidators([Validators.required, Validators.minLength(1)]);
      this.formModif.get('nombre')?.disable();
      this.titulo="Consultar Material";
    }else{
      this.titulo="Modificar Material";
    }
  }

  /**
   * Traigo los datos del material y todas las actividades que haya
   * @returns void
   * */
  public datos():void {
    this.service.leer(this.id).subscribe((respuesta)=>{
      this.formModif.controls['nombre'].setValue(respuesta.nombre);
      for (let i of respuesta.actividades) {
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
   * Método que se llama al pulsar el + para añadir a la ubicación, la actividad seleccionada
   * y da un alta en la tabla pivote
   * @returns void
   * */
  addActi():void{
    if (this.formModif.controls['activ'].value!=null){
      let acti = this.formModif.controls['activ'].value;
      this.actividad.leer(acti).subscribe((valor)=>{
        let mat_acti=new Actividades();
        let id_acti=valor.id;
        let nom_acti=valor.actividad;
        let tar_acti=valor.tarifa;
        let dur_acti=valor.duracion;
        mat_acti.list=this.list+((this.tablaActi.length)-1);
        mat_acti.id=id_acti;
        mat_acti.actividad=nom_acti;
        mat_acti.tarifa=tar_acti;
        mat_acti.duracion=dur_acti;
        let acti_mat=new ActividadesMateriales();
        acti_mat.actividade_id=mat_acti.id;
        acti_mat.materiale_id=this.id;
        this.actividad.attachMateriales(acti_mat).subscribe(()=>{
          this.tablaActi.push(mat_acti);
        });
      })
    }
  }

  /**
   * Elimina la actividad de la tabla y hace el DETACH en la tabla pivote
   * @param id any
   * @returns void
  */
  borrarActi(i: number):void{
    let acti_mat=new ActividadesMateriales();
    acti_mat.actividade_id=this.tablaActi[i].id;
    acti_mat.materiale_id=this.id;
    this.actividad.detachMaterial(acti_mat).subscribe(()=>{
      this.tablaActi.splice(i,1);
    });
  }

  /**Se les da un nombre descriptivo a los campos, a la hora de que sea más cómodo validarlos */
  get nombre():FormControl {
    return this.formModif.get('nombre') as FormControl;
  }

  /**Cierra el formulario
   * @returns void
  */
  cerrar():void{
    this.router.navigate(['/materiales']);
  }

  /**Da de alta el material, y si hubiese actividades seleciconadas para ese material,
   * da un alta por cada una en la tabla pivote actividades_materiales y cierra el formulario
   * @returns void
   */
  guardar(){
    this.mat.nombre=String(this.formModif.get('nombre')?.value);
    this.mat.id=this.id;
    this.service.update(this.mat).subscribe((data)=>{
      this.mensaje=data.mensaje;
      this.service.get().subscribe(()=>{});
    });
  }
}
