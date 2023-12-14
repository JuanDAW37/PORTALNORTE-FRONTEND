import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Trabajadores } from '../models/trabajadores.models';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GuiasService {

  public cliente!:Trabajadores[];
  public estado!:boolean;
  public headers!:HttpHeaders;
  public valores=JSON.parse(String(localStorage.getItem('token')));
  public token:string=this.valores.token;

  constructor(private http: HttpClient){
    this.headers=new HttpHeaders({"Accept":"application/json", "Authorization":this.token});
  }

  /**GET*/
  public get(): Observable<Trabajadores[]> {
    return this.http.get<Trabajadores[]>(`${environment.url_api}/trabajador`, {headers:this.headers});
  }

  /**INSERT
   * @param trabajador
   * @return Trabajadores
   */
  public insert(trabajador: Trabajadores): Observable<Trabajadores> {
    return this.http.post<Trabajadores>(`${environment.url_api}/trabajador`, trabajador, {headers:this.headers});
  }

  /**UPDATE
   * @param trabajador
   * @return Trabajadores
   */
  public update(trabajador: Trabajadores): Observable<Trabajadores> {
    return this.http.put<Trabajadores>(`${environment.url_api}/trabajador/${trabajador.id}`, trabajador, {headers:this.headers});
  }

  /**DELETE
   * @param id
   * @return Trabajadores
   */
  public delete(id: number): Observable<Trabajadores> {
    return this.http.delete<Trabajadores>(`${environment.url_api}/trabajador/${id}`, {headers:this.headers});
  }

  /**LEER
   * @param id
   * @return Trabajadores
   */
  leer(id: number): Observable<Trabajadores> {
    return this.http.get<Trabajadores>(`${environment.url_api}/trabajador/${id}`, {headers:this.headers});
  }

  /**LOGIN
   * @param string user
   * @param string password
   * @return json
   */
  login(user: string, password: string): Observable<Trabajadores> {
    return this.http.get<Trabajadores>(`${environment.url_api}loginTrab?user=${user}&password=${password}`, {headers:this.headers});
  }

  /**FILTRAR
   * @param string nombre
   * @param string apellido1
   * @param string apellido2
   * @param string nif
   * @return Trabajdores
   */
  filtrar(nombre: string, apellido1: string, apellido2: string, nif: string): Observable<Trabajadores> {
    return this.http.get<Trabajadores>(`${environment.url_api}/filtraTrab?nombre=${nombre}&apellido1=${apellido1}
    &apellido2=${apellido2}&nif=${nif}`, {headers:this.headers});
  }

  /**
   * Verificar que no existe un gestor con el mismo nif o usuario
   * @param nif
   * @param user
   * @returns Gestors
   */
  nifUser(nif: string, user:string):Observable<Trabajadores>{
    return this.http.get<Trabajadores>(`${environment.url_api}/nifUserTrab?nif=${nif}&user=${user}`, {headers:this.headers});
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
