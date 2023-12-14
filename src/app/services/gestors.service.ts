import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Gestors } from '../models/gestors.models';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GestorsService {

  public gestor!:Gestors[];
  public estado!:boolean;
  public headers!:HttpHeaders;
  public valores=JSON.parse(String(localStorage.getItem('token')));
  public token:string=this.valores.token;

  constructor(private http: HttpClient){
    this.headers=new HttpHeaders({"Accept":"application/json", "Authorization":this.token});
  }

  /**GET*/
  public get(): Observable<Gestors[]> {
    return this.http.get<Gestors[]>(`${environment.url_api}/gestor`, {headers:this.headers});
  }

  /**INSERT
   * @param gestor
   * @return Gestors
   */
  public insert(gestor: Gestors): Observable<Gestors> {
    return this.http.post<Gestors>(`${environment.url_api}/gestor`, gestor, {headers:this.headers});
  }

  /**UPDATE
   * @param gestor
   * @return Gestors
   */
  public update(gestor: Gestors): Observable<Gestors> {
    return this.http.put<Gestors>(`${environment.url_api}/gestor/${gestor.id}`, gestor, {headers:this.headers});
  }

  /**DELETE
   * @param id
   * @return Gestors
   */
  public delete(id: number): Observable<Gestors> {
    return this.http.delete<Gestors>(`${environment.url_api}/gestor/${id}`, {headers:this.headers});
  }

  /**LEER
   * @param id
   * @return Gestors
   */
  leer(id: number): Observable<Gestors> {
    return this.http.get<Gestors>(`${environment.url_api}/gestor/${id}`, {headers:this.headers});
  }

  /**FILTRAR
   * @param nombre
   * @param apellido1
   * @param apellido2
   * @param nif
   * @return Gestors
   */
  filtrar(nombre: any, apellido1: any, apellido2: any, nif: any): Observable<Gestors> {
    return this.http.get<Gestors>(
      `${environment.url_api}/filtraGestor?nombre=${nombre}&apellido1=${apellido1}&apellido2=${apellido2}&nif=${nif}`, {headers:this.headers});
  }

/**
   * Verificar que no existe un gestor con el mismo nif o usuario
   * @param nif
   * @param user
   * @returns Gestors
   */
nifUser(nif: string, user:string):Observable<Gestors>{
  return this.http.get<Gestors>(`${environment.url_api}/nifUserGest?nif=${nif}&user=${user}`, {headers:this.headers});
}

  /**Se activan los campos del formulario si estamos en modificaciones
   * @return boolean
  */
  public activa():boolean{
    return this.estado=false;
  }

  /**Se desactivan los campos del formulario si estamos en consulta
   * @return boolean
   */
  public desactiva():boolean{
    return this.estado=true;
  }
}
