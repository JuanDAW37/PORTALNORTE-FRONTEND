import { Component } from '@angular/core';
import { SwitchService } from 'src/app/services/switch.service';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  public usuario!:string;

  constructor(public sw_servicio: SwitchService, public login_servicio : LoginService, private router: Router ){
    this.usuario=this.sw_servicio.usuario;
  }

  ngOnInit(): void {
    this.usuario=this.sw_servicio.usuario;
  }

  logout(){
    let valores=JSON.parse(String(localStorage.getItem('token')));
    localStorage.removeItem('token');
    this.login_servicio.logout(valores.token).subscribe((data)=>{
      console.log(data);
    })
    this.sw_servicio.logeado=false;
    this.router.navigate(['/']);
  }
}
