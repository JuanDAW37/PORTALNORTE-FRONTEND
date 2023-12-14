import { Injectable } from '@angular/core';
import { TiposActividades } from '../models/tiposactividades.models';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TiposActividadService {

  public tipos!:TiposActividades[];
  public estado!:boolean;
  public headers!:HttpHeaders;
  public valores=JSON.parse(String(localStorage.getItem('token')));
  public token:string=this.valores.token;

  constructor(private http: HttpClient){
    this.headers=new HttpHeaders({"Accept":"application/json", "Authorization":this.token});
  }

  /**GET
   * @return TiposActividades
   */
  public get(): Observable<[TiposActividades]> {
    return this.http.get<[TiposActividades]>(`${environment.url_api}/tipos`, {headers:this.headers});
  }

  /**INSERT
   * @param tipos TiposActividades
   * @return TiposActividades
   */
  public insert(tipos: TiposActividades): Observable<TiposActividades> {
    return this.http.post<TiposActividades>(`${environment.url_api}/tipos`, tipos, {headers:this.headers});
  }

  /**UPDATE
   * @param tipos TiposActividades
   * @return TiposActividades
   */
  public update(tipos: TiposActividades): Observable<TiposActividades> {
    return this.http.put<TiposActividades>(`${environment.url_api}/tipos/${tipos.id}`, tipos, {headers:this.headers});
  }

  /**DELETE
   * @param id number
   * @return TiposActividades
   */
  public delete(id: number): Observable<TiposActividades> {
    return this.http.delete<TiposActividades>(`${environment.url_api}/tipos/${id}`, {headers:this.headers});
  }

  /**LEER
   * @param id number
   * @return TiposActividades
   */
  leer(id: number): Observable<TiposActividades> {
    return this.http.get<TiposActividades>(`${environment.url_api}/tipos/${id}`, {headers:this.headers});
  }

  /** Busca el tipo de actividad
   * @param string tipos
   * @return TiposActividades
   */
  buscarTipo(tipos: string): Observable<TiposActividades> {
    return this.http.get<TiposActividades>(`${environment.url_api}/filtraTipo?tipo=${tipos}`, {headers:this.headers});
  }

   /**Se activan o desactivan los campos del formulario dependiendo de si estamos en modificaciones o consultas */
  public activa(){
    return this.estado=false;
  }

  public desactiva(){
    return this.estado=true;
  }
}

