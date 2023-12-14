import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Direcciones } from '../models/direcciones.models';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DireccionesService {
  public headers!:HttpHeaders;
  public valores=JSON.parse(String(localStorage.getItem('token')));
  public token:string=this.valores.token;

  constructor(private http: HttpClient){
    this.headers=new HttpHeaders({"Accept":"application/json", "Authorization":this.token});
  }

  /**GET*/
  public get(): Observable<[Direcciones]> {
    return this.http.get<[Direcciones]>(`${environment.url_api}/direccion`, {headers:this.headers});
  }

  /**INSERT
   * @param direccion
   * @return Direcciones
   */
  public insert(direccion: Direcciones): Observable<Direcciones> {
    return this.http.post<Direcciones>(`${environment.url_api}/direccion`, direccion, {headers:this.headers});
  }

  /**UPDATE
   * @param direccion
   * @return Direcciones
   */
  public update(direccion: Direcciones): Observable<Direcciones> {
    return this.http.put<Direcciones>(`${environment.url_api}/direccion/${direccion.id}`, direccion, {headers:this.headers});
  }

  /**DELETE
   * @param id
   * @return Direcciones
   */
  public delete(id: number): Observable<Direcciones> {
    return this.http.delete<Direcciones>(`${environment.url_api}/direccion/${id}`, {headers:this.headers});
  }

  /**LEER
   * @param id
   * @return Direcciones
   */
  leer(id: number): Observable<Direcciones> {
    return this.http.get<Direcciones>(`${environment.url_api}/direccion/${id}`, {headers:this.headers});
  }

  /**FILTRAR
   * @param calle
   * @param km
   * @param numero
   * @param bloque
   * @param piso
   * @param letra
   * @return Direcciones
   */
  filtrar(calle: string, km: string, numero: string, bloque: string, piso: string, letra:string): Observable<Direcciones> {
    console.log(calle, km, numero, bloque, piso, letra);
    return this.http.get<Direcciones>(`${environment.url_api}/buscarDireccion?calle=${calle}&km=${km}&numero=${numero}
    &bloque=${bloque}&piso=${piso}&letra=${letra}`, {headers:this.headers});
  }
}

