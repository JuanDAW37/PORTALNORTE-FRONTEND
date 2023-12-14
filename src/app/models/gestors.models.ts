import { Telefonos } from "./telefonos.models";
import { Emails } from "./emails.models";
import { Direcciones } from "./direcciones.models";
export class Gestors
{
  id!:number;
  nif!:string;
  nombre!:string;
  apellido1!:string;
  apellido2!:string;
  direccione_id!:number;
  foto!:any;
  user!:string;
  password!:string;
  contrato!:string;
  sueldo!:number;
  token!:string;
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
  status!:boolean;
  mensaje!:string;
  telefono!:Telefonos[];
  email!:Emails[];
  gestors!:Gestors[];
  direccion!:Direcciones;
  token_tipo!:string;
  editpassword:boolean=false;

  constructor() {
    this.rol=1;
  }
}

