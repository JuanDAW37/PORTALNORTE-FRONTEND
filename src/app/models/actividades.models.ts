import { TiposActividades } from "./tiposactividades.models";
import { Iva } from "./ivas.models";
import { Gestors } from "./gestors.models";
import { Trabajadores } from './trabajadores.models';
import { Ubicaciones } from './ubicaciones.models';
import { Materiales } from "./materiales.models";
import { Reservas } from "./reservas.models";
import { Time } from "@angular/common";

export class Actividades{
  list!:number;
  mensaje!:string;
  status!:boolean;
  id!:number;
  actividad!:string;
  hora_inicio!:string;
  hora_fin!:string;
  foto!:string;
  tiposactividade_id!:number;
  tarifa!:number;
  gestor_id!:number;
  descripcion!:string;
  personas!:number;
  iva_id!:number;
  tipo_iva!:number;
  duracion!:number;
  tipoActividad!:string;
  ubicacion!:Ubicaciones[];
  material!:Materiales[];
  guias!:Trabajadores[];
  gestor!:Gestors[];
  iva!:Iva[];
  tipo!:string;
  tipoactividad!:TiposActividades[];
  actividades!:Actividades[];
  reservas!:Reservas[];
}
