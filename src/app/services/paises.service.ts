import { Injectable } from '@angular/core';
import { Paises } from '../models/paises.models';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PaisesService {
  public pais!: Paises[];
  public headers!:HttpHeaders;
  public valores=JSON.parse(String(localStorage.getItem('token')));
  public token:string=this.valores.token;

  constructor(private http: HttpClient){
    this.headers=new HttpHeaders({"Accept":"application/json", "Authorization":this.token});
  }

  /**GET
   * @return Paises
   */
  public get(): Observable<[Paises]> {
    return this.http.get<[Paises]>(`${environment.url_api}/pais`, {headers:this.headers});
  }

  /**INSERT
   * @param pais
   * @return Paises
   */
  public insert(pais: Paises): Observable<Paises> {
    return this.http.post<Paises>(`${environment.url_api}/pais`, pais, {headers:this.headers});
  }

  /**UPDATE
   * @param pais
   * @return Paises
   */
  public update(pais: Paises): Observable<Paises> {
    return this.http.put<Paises>(`${environment.url_api}/pais/${pais.id}`, pais, {headers:this.headers});
  }

  /**DELETE
   * @param id
   * @return Paises
   */
  public delete(id: number): Observable<Paises> {
    return this.http.delete<Paises>(`${environment.url_api}/pais/${id}`, {headers:this.headers});
  }

  /**LEER
   * @param id
   * @return Paises
   */
  leer(id: number): Observable<Paises> {
    return this.http.get<Paises>(`${environment.url_api}/pais/${id}`, {headers:this.headers});
  }

  /** Busca el pais por su nombre
   * @param string
   * @return Paises
   */
  buscarPorNombre(nombre: string): Observable<Paises> {
    return this.http.get<Paises>(`${environment.url_api}/buscarPais?nombre=${nombre}`, {headers:this.headers});
  }
}
