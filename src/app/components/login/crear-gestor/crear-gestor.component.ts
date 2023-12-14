import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Gestors } from 'src/app/models/gestors.models';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-crear-gestor',
  templateUrl: './crear-gestor.component.html',
  styleUrls: ['./crear-gestor.component.css']
})
export class CrearGestorComponent {
  public titulo: string = 'Crear Gestor';
  public gestor!:Gestors;
  crear!:FormGroup

  constructor(
    public login_service: LoginService,
    private router: Router,
    private formBuilder: FormBuilder){
    };

    ngOnInit(): void {
    //Defino los campos del formulario con las validaciones
      this.crear=this.formBuilder.group({
        nombre: new FormControl('', [Validators.required, Validators.minLength(1)]),
        apellido1: new FormControl('', [Validators.required, Validators.minLength(1)]),
        apellido2: new FormControl(''),
        nif: new FormControl('', [Validators.required, Validators.minLength(4),Validators.maxLength(15)]),
        foto: new FormControl(''),
        user: new FormControl('', [Validators.required, Validators.minLength(1)]),
        password: new FormControl('', [Validators.required, Validators.minLength(1)]),
        contrato: new FormControl('',[Validators.required, Validators.minLength(1)]),
        sueldo: new FormControl(0, [Validators.required, Validators.min(1)]),
        });
    }

  /**Se les da un nombre descriptivo a los campos, a la hora de que sea más cómodo validarlos */
  get nombre():FormControl {
    return this.crear.get('nombre') as FormControl;
  }

  get nif():FormControl {
    return this.crear.get('nif') as FormControl;
  }

  get apellido1():FormControl {
    return this.crear.get('apellido1') as FormControl;
  }

  get user():FormControl {
    return this.crear.get('user') as FormControl;
  }

  get password():FormControl {
    return this.crear.get('password') as FormControl;
  }

  get contrato():FormControl {
    return this.crear.get('contrato') as FormControl;
  }

  get sueldo():FormControl {
    return this.crear.get('sueldo') as FormControl;
  }


  /**
   * Da de alta la gestor
   * @returns void
  */
  guardar():void{
      let gestor=new Gestors();
      gestor.nombre = String(this.crear.controls['nombre']?.value);
      gestor.nif = String(this.crear.controls['nif']?.value);
      gestor.apellido1= String(this.crear.controls['apellido1']?.value);
      gestor.apellido2= String(this.crear.controls['apellido2']?.value);
      gestor.contrato=String(this.crear.controls['contrato']?.value);
      gestor.user=String(this.crear.controls['user']?.value);
      gestor.password=String(this.crear.controls['password']?.value);
      gestor.sueldo=parseFloat(String(this.crear.controls['sueldo']?.value));
      /*gestor.direccione_id = this.direccion_id;*/
      console.log(gestor);
      this.login_service.guardarPrimerGestor(gestor).subscribe((data) => {
        console.log(data);
        this.login_service.alta=true;
      });
  }
}
