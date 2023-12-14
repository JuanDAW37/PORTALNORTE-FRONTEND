import { Component } from '@angular/core';
import { SwitchService } from 'src/app/services/switch.service';
import { LoginService } from 'src/app/services/login.service';
import { Trabajadores } from 'src/app/models/trabajadores.models';
import { Gestors } from 'src/app/models/gestors.models';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

export interface Personas{
  user:string;
  password: string;
}


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  public token!: string;
  public user!: String;
  public rol!:number;
  public error!:string;
  public valor!:any;
  public alta:boolean=false;

  /**Defino los campos del formulario con las validaciones */
  public login=new FormGroup({
    'usuario':new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(25)]),
    'password': new FormControl('', [Validators.required, Validators.minLength(8)]),
  });


  constructor(public switch_servicio: SwitchService, public login_service : LoginService, public router: Router){}

  ngOnInit(): void {
    //Compruebo si existe algún gestor, para mostrar o no el formulario de alta para el primer gestor
    this.login_service.contarGestor().subscribe((data)=>{
        console.log(data);
        this.login_service.alta=data.status;
    });
  }


  /**Se les da un nombre descriptivo a los campos, a la hora de que sea más cómodo validarlos */
  get usuario():FormControl{
    return this.login.get('usuario') as FormControl;
  }

  get password():FormControl {
    return this.login.get('password') as FormControl;
  }


  /**
   * Busca al Gestor y al Trabajador, devolviendo el primero que encuentre
   * Guarda en LocalStorage el token, el rol y el nombre de la personas logeada
   * @return void
   */
  entrar():void{
    let usuario=String(this.login.controls['usuario'].value);
    let password=String(this.login.controls['password'].value);
    let persona: Personas;
    persona={
      user: usuario,
      password:password};
    this.login_service.loginGestor(persona).subscribe((data)=>{
      if(data.status){
        let persona={
          token: data.token,
          nombre:data.datos.nombre,
          rol:data.rol
        }
        localStorage.setItem("token", JSON.stringify(persona));
        this.switch_servicio.logeado=true;
        this.switch_servicio.usuario=data.datos.nombre;
        this.switch_servicio.rol=data.rol
        console.log("TOKEN=>",persona.token);
      }else{
        this.error=data.mensaje;
      }
    });
  }
}
