import { Direcciones } from './direcciones.models';
import { Trabajadores } from './trabajadores.models';

export class Empresas {
  id!:number;
  nombre!:string;
  nif!:string
  calle!:string;
  km!:string;
  numero!:string;
  bloque!:string;
  piso!:string;
  letra!:string;
  direccione_id!:number;
  cp!:number;
  ciudad!:string;
  provincia!:string;
  pais!:string;
  trabajadores!:Trabajadores[];
  mensaje!:string;
  direccion!:Direcciones;
  constructor() {}
}
