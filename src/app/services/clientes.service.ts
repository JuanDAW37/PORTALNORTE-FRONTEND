import { Injectable } from '@angular/core';
import { Clientes } from '../models/clientes.models';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ClientesService {
  public cliente!: Clientes[];
  public estado!:boolean;
  public headers!:HttpHeaders;
  public valores=JSON.parse(String(localStorage.getItem('token')));
  public token:string=this.valores.token;

  constructor(private http: HttpClient) {
    this.headers=new HttpHeaders({"Accept":"application/json", "Authorization":this.token});
  }

  /**
   * GET
   * @returns Clientes
  */
  public get(): Observable<[Clientes]> {
    return this.http.get<[Clientes]>(`${environment.url_api}/clientes`, {headers:this.headers});
  }

  /**INSERT
   * @param cliente Clientes
   * @return Clientes
   */
  public insert(cliente: Clientes): Observable<Clientes> {
    return this.http.post<Clientes>(`${environment.url_api}/clientes`, cliente, {headers:this.headers});
  }

  /**UPDATE
   * @param cliente Clientes
   * @return Clientes
   */
  public update(cliente: Clientes): Observable<Clientes> {
    return this.http.put<Clientes>(`${environment.url_api}/clientes/${cliente.id}`, cliente, {headers:this.headers});
  }

  /**LEER
   * @param id number
   * @return Clientes
   */
  leer(id: number): Observable<Clientes> {
    return this.http.get<Clientes>(`${environment.url_api}/clientes/${id}`, {headers:this.headers});
  }

  /**FILTRAR
  * @param ni
  * @param no
  * @param ape1
  * @param ape2
   * @return Clientes
   */
  filtrar(ni: string, no: string, ape1: string, ape2: string): Observable<Clientes> {
    return this.http.get<Clientes>(
      `${environment.url_api}/filtraClient?nif=${ni}&nombre=${no}&apellido1=${ape1}&apellido2=${ape2}`, {headers:this.headers});
  }

  /**
   * Verificar que no existe un cliente con el mismo nif o usuario
   * @param nif
   * @param user
   * @returns Clientes
   */
  nifUser(nif: string, user:string):Observable<Clientes>{
    return this.http.get<Clientes>(`${environment.url_api}/nifUserCli?nif=${nif}&user=${user}`, {headers:this.headers});
  }

  uploadFile(archivo:any):any {
    return this.http.post(`${environment.url_api}/fotoCli`, JSON.stringify(archivo));
  }

  /**Se activan o desactivan los campos del formulario dependiendo de si estamos en modificaciones o consultas */
  public activa(){
    return this.estado=false;
  }

  public desactiva(){
    return this.estado=true;
  }
}
