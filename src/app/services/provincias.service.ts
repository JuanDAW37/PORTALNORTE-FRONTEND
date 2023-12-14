import { Injectable } from '@angular/core';
import { Provincias } from '../models/provincias.models';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProvinciasService {

  public provincia!:Provincias[];
  public headers!:HttpHeaders;
  public valores=JSON.parse(String(localStorage.getItem('token')));
  public token:string=this.valores.token;

  constructor(private http: HttpClient){
    this.headers=new HttpHeaders({"Accept":"application/json", "Authorization":this.token});
  }

  /**GET
   * @return Provincias
   */
  public get(): Observable<[Provincias]> {
    return this.http.get<[Provincias]>(`${environment.url_api}/provincia`, {headers:this.headers});
  }

  /**INSERT
   * @param provincia
   * @return Provincias
   */
  public insert(provincia: Provincias): Observable<Provincias> {
    return this.http.post<Provincias>(`${environment.url_api}/provincia`, provincia, {headers:this.headers});
  }

  /**UPDATE
   * @param provincia
   * @return Provincias
   */
  public update(provincia: Provincias): Observable<Provincias> {
    return this.http.put<Provincias>(`${environment.url_api}/provincia/${provincia.id}`, provincia, {headers:this.headers});
  }

  /**DELETE
   * @param id
   * @return Provincias
   */
  public delete(id: number): Observable<Provincias> {
    return this.http.delete<Provincias>(`${environment.url_api}/provincia/${id}`, {headers:this.headers});
  }

  /**LEER
   * @param id
   * @return Provincias
   */
  leer(id: number): Observable<Provincias> {
    return this.http.get<Provincias>(`${environment.url_api}/provincia/${id}`, {headers:this.headers});
  }

  /** Busca el provincia por su nombre
   * @param string
   * @return Provincias
   */
  buscarPorNombre(nombre: string): Observable<Provincias> {
    return this.http.get<Provincias>(`${environment.url_api}/buscarProvincia?nombre=${nombre}`, {headers:this.headers});
  }
}
