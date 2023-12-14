import { Actividades } from 'src/app/models/actividades.models';

export class Ubicaciones{
  list!:number;
  public id!:number;
  public nombre!:string;
  public lat!:number;
  public lon!:number;
  public actividades!:Actividades[];
  public mensaje!:string;
  public ubicaciones!:Ubicaciones[];
  constructor(){}
}
