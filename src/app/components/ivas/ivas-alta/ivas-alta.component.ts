import {Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Iva } from 'src/app/models/ivas.models';
import { Router } from '@angular/router';
import { IvasService } from 'src/app/services/ivas.service';

@Component({
  selector: 'app-ivas-alta',
  templateUrl: './ivas-alta.component.html',
  styleUrls: ['../../../app.component.css']
})
export class IvasAltaComponent {
  public current_iva=new Iva;
  public formIva=new FormGroup({
    'nombre':new FormControl('', Validators.required),
    'tipo': new FormControl(0, Validators.required)
  });

  constructor (private router: Router, private service: IvasService){ }

  /**Se les da un nombre descriptivo a los campos, a la hora de que sea más cómodo validarlos
   * @return FormControl
   */
  get nombre():FormControl {
    return this.formIva.get('nombre') as FormControl;
  }

  get tipo():FormControl{
    return this.formIva.get('tipo') as FormControl;
  }

  /**Cierra el formulario
   * @return void
  */
  cerrar():void{
    this.router.navigate(['/ivas']);
  }

  /**Da de alta y cierra el formulario
   * @return void
  */
  guardar():void{
    this.current_iva.nombre=String(this.formIva.get('nombre')?.value);
    this.current_iva.tipo=parseFloat(String(this.formIva.get('tipo')?.value));
    this.service.insert(this.current_iva).subscribe(()=>{});
    this.service.get().subscribe(()=>{});
    this.router.navigate(['/ivas']);
    return
  }
}
