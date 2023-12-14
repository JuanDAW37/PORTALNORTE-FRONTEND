import { Telefonos } from "./telefonos.models";
import { Emails } from "./emails.models";
import { Facturas } from "./facturas.models";
import { Reservas } from "./reservas.models";
export class Clientes {
  id!:number;
  nombre!:string;
  apellido1!:string;
  apellido2!:string;
  nif!:string;
  direccione_id!:number;
  foto!:string;
  user!:string;
  password!:string;
  baja!:string;
  bonificacion!:number;
  rol!:number;
  status!:boolean;
  calle!:string;
  km!:string;
  numero!:string;
  bloque!:string;
  piso!:string;
  letra!:string;
  cp!:number;
  ciudad!:string;
  provincia!:string;
  pais!:string;
  clientes!:Clientes[];
  telefono!:Telefonos[];
  email!:Emails[];
  facturas!:Facturas[];
  reservas!:Reservas[];
  mensaje!:string;
  editpassword:boolean=false;
  constructor(){
    this.rol=3;
  }
}
