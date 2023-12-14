import { Injectable } from '@angular/core';
import { Telefonos } from '../models/telefonos.models';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TelefonosService {

  public telefono!:Telefonos[];
  public headers!:HttpHeaders;
  public valores=JSON.parse(String(localStorage.getItem('token')));
  public token:string=this.valores.token;

  constructor(private http: HttpClient){
    this.headers=new HttpHeaders({"Accept":"application/json", "Authorization":this.token});
  }

  /**GET
   * @return Telefonos
   */
  public get(): Observable<[Telefonos]> {
    return this.http.get<[Telefonos]>(`${environment.url_api}/telefono`, {headers:this.headers});
  }

  /**INSERT
   * @param telefono
   * @return Telefonos
   */
  public insert(telefono: Telefonos): Observable<Telefonos> {
    return this.http.post<Telefonos>(`${environment.url_api}/telefono`, telefono, {headers:this.headers});
  }

  /**UPDATE
   * @param telefono
   * @return Telefonos
   */
  public update(telefono: Telefonos): Observable<Telefonos> {
    return this.http.put<Telefonos>(`${environment.url_api}/telefono/${telefono.id}`, telefono, {headers:this.headers});
  }

  /**DELETE
   * @param id
   * @return Telefonos
   */
  public delete(id: number): Observable<Telefonos> {
    return this.http.delete<Telefonos>(`${environment.url_api}/telefono/${id}`, {headers:this.headers});
  }

  /**LEER
   * @param id
   * @return Telefonos
   */
  leer(id: number): Observable<Telefonos> {
    return this.http.get<Telefonos>(`${environment.url_api}/telefono/${id}`, {headers:this.headers});
  }

  /** Busca el teléfono por su número
   * @param telefono
   * @return Telefonos
   */
  filtrar(telefono: string): Observable<Telefonos> {
    return this.http.get<Telefonos>(`${environment.url_api}/buscaTelefono?telefono=${telefono}`, {headers:this.headers});
  }
}
