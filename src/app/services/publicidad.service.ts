import { Injectable } from '@angular/core';
import { Publicidades } from '../models/publicidades.models';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PublicidadService {

  public publicidad!:Publicidades[];
  public estado:boolean=false;
  public headers!:HttpHeaders;
  public valores=JSON.parse(String(localStorage.getItem('token')));
  public token:string=this.valores.token;

  constructor(private http: HttpClient){
    this.headers=new HttpHeaders({"Accept":"application/json", "Authorization":this.token});
  }

  /**GET
   * @return Publicidades
   */
  public get(): Observable<[Publicidades]> {
    return this.http.get<[Publicidades]>(`${environment.url_api}/publicidad`, {headers:this.headers});
  }

  /**INSERT
   * @param publicidad
   * @return Publicidades
   */
  public insert(publicidad: Publicidades): Observable<Publicidades> {
    return this.http.post<Publicidades>(`${environment.url_api}/publicidad`, publicidad, {headers:this.headers});
  }

  /**UPDATE
   * @param publicidad
   * @return Publicidades
   */
  public update(publicidad: Publicidades): Observable<Publicidades> {
    return this.http.put<Publicidades>(`${environment.url_api}/publicidad/${publicidad.id}`, publicidad, {headers:this.headers});
  }

  /**DELETE
   * @param id
   * @return Publicidades
   */
  public delete(id: number): Observable<Publicidades> {
    return this.http.delete<Publicidades>(`${environment.url_api}/publicidad/${id}`, {headers:this.headers});
  }

  /**LEER
   * @param id number
   * @return Publicidades
   */
  leer(id: number): Observable<Publicidades> {
    return this.http.get<Publicidades>(`${environment.url_api}/publicidad/${id}`, {headers:this.headers});
  }

  /** Busca el anuncio publicitario por su nombre
   * @param string titulo
   * @return Publicidades
   */
  buscarPorNombre(titulo: string): Observable<Publicidades> {
    return this.http.get<Publicidades>(`${environment.url_api}/buscaPubli?titulo=${titulo}`, {headers:this.headers});
  }

  /**Se activan o desactivan los campos del formulario dependiendo de si estamos en modificaciones o consultas */
  public activa(){
    return this.estado=false;
  }

  public desactiva(){
    return this.estado=true;
  }
}
