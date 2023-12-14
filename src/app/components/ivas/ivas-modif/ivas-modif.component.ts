import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Iva } from 'src/app/models/ivas.models';
import { IvasService } from 'src/app/services/ivas.service';

@Component({
  selector: 'app-ivas-modif',
  templateUrl: './ivas-modif.component.html',
  styleUrls: ['../../../app.component.css']
})
export class IvasModifComponent {

  id!:number;
  iva=new Iva();
  data!:any;
  public titulo:string="";
  mensaje!:string;

  public formIva=new FormGroup({
    'nombre':new FormControl('', Validators.required),
    'tipo': new FormControl(0, Validators.required)
  });


  constructor( private route: ActivatedRoute, private router: Router, public service:IvasService){
      this.id=this.route.snapshot.params['id'];
      if(this.service.estado){
        this.formIva.controls['nombre'].disable();
        this.formIva.controls['tipo'].disable();
        this.formIva.controls['nombre'].removeValidators(Validators.required);
        this.formIva.controls['tipo'].removeValidators(Validators.required);
        this.titulo="Consulta de IVA";
      }else{
        this.titulo="Modificación de IVA";
      }
    }

  /**Se les da un nombre descriptivo a los campos, a la hora de que sea más cómodo validarlos
   * @return FormControl
   */
  get nombre():FormControl {
    return this.formIva.get('nombre') as FormControl;
  }

  get tipo():FormControl{
    return this.formIva.get('tipo') as FormControl;
  }

  ngOnInit(): void {
    this.datos();
  }

  /**
   * Cargamos el listado
   * @returns void
  */
  public datos():void {
    this.service.leer(this.id).subscribe((respuesta)=>{
      this.data = respuesta;
      this.formIva.controls['nombre'].setValue(this.data.iva.nombre);
      this.formIva.controls['tipo'].setValue(this.data.iva.tipo);
    })
  }

  /**Se cierra el formulario
   * @returns void
   */
  cerrar():void{
    this.router.navigate(['/ivas']);
  }

  /**Hace la modificación del tipo de IVA
   * @returns void
  */
  guardar():void{
    this.iva.id=this.id;
    this.iva.nombre=String(this.formIva.get('nombre')?.value);
    this.iva.tipo=parseFloat(String(this.formIva.get('tipo')?.value));
    this.service.update(this.iva).subscribe((data)=>{
      this.mensaje=data.mensaje;
    });
    this.service.get().subscribe(()=>{});
  }
}
