import {Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class SwitchService {
  public logeado:boolean=false;
  public usuario!:string;
  public rol!:number;
  public user!:string;


  constructor() {}

  logged(){
    this.logeado=true;
  }

  nologged(){
    this.logeado=false;
  }
}
