import { Actividades } from './actividades.models';

export class Materiales{
  list!:number;
  id!:number;
  nombre!:string;
  actividad!:string;
  actividades!:Actividades[];
  materiales!:Materiales[];
  mensaje!:string;
  constructor(){}
}
