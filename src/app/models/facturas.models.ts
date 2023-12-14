import { Clientes } from "./clientes.models";
import { Reservas } from "./reservas.models";

export class Facturas {
  id!:number;
  numero!:number;
  fecha!:Date;
  cliente_id!:number;
  reserva_id!:number;
  concepto!:string;
  base!:number;
  iva!:number;
  cuota!:number;
  total!:number;
  facturas!:Facturas[];
  factura!:Facturas;
  cliente!:Clientes;
  reserva!:Reservas;
  nombre!:string;
  apellido1!:string;
  apellido2!:string;
  nif!:string;
  mensaje!:string;
  status!:boolean;

  constructor(){}
}
