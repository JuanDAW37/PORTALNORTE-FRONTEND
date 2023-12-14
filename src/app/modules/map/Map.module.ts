import { NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Inject, Input } from '@angular/core';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})

export class MapModule {

  protected lat!:number;
  protected long!:number;

  constructor(){}

  public guardaCoordenadas(latitud:number, longitud:number){
    this.lat=latitud;
    this.long=longitud;
  }

  public daCoordenadas(){
    return [this.lat, this.long];
  }
}

