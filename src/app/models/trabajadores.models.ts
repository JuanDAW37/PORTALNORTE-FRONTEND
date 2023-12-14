import { Actividades } from "./actividades.models";
import { Telefonos } from "./telefonos.models";
import { Emails } from "./emails.models";

export class Trabajadores {
  list!:number;
  id!:number;
  nombre:string="";
  nif:string="";
  apellido1:string="";
  apellido2:string="";
  direccione_id!:number;
  foto!:string;
  user!:string;
  password!:string;
  contrato!:string;
  sueldo!:number;
  incentivo!:number;
  token!:string;
  empresa_id!:number;
  empresa!:string;
  rol!:number;
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
  trabajadores!:Trabajadores[];
  telefonos!:Telefonos[];
  emails!:Emails[];
  actividades!:Actividades[];
  mensaje!:string;
  status!:boolean;
  token_tipo!:string;
  editpassword:boolean=false;

  constructor(){
    this.rol=2;
  }
}
