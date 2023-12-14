import { Clientes } from './clientes.models';
import { Actividades } from "./actividades.models";
import { Facturas } from "./facturas.models";

export class Reservas {
  id!:number;
  facturada!:boolean;
  numero!:string;
  fecha!:Date;
  hora!:string;
  personas!:number;
  mensaje!:string;
  status!:boolean;
  actividade_id!:number;
  cliente_id!:number;
  actividades!:Actividades[];
  actividad!:Actividades;
  activida!:string;
  cliente!:Clientes;
  nombre!:string;
  nif!:string;
  apellido1!:string;
  apellido2!:string;
  clientes!:Clientes[];
  factura!:Facturas;
  reservas!:Reservas[];
  constructor(){}
}
