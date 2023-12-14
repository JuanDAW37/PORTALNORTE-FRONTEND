import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Empresas } from '../models/empresas.models';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

  empresa!:Empresas[];
  public estado!:boolean;
  public headers!:HttpHeaders;
  public valores=JSON.parse(String(localStorage.getItem('token')));
  public token:string=this.valores.token;

  constructor(private http: HttpClient){
    this.headers=new HttpHeaders({"Accept":"application/json", "Authorization":this.token});
  }


  /**GET*/
  public get(): Observable<[Empresas]> {
    return this.http.get<[Empresas]>(`${environment.url_api}/empresa`, {headers:this.headers});
  }

  /**INSERT
   * @param empresa
   * @return Empresas
   */
  public insert(empresa: Empresas): Observable<Empresas> {
    return this.http.post<Empresas>(`${environment.url_api}/empresa`, empresa, {headers:this.headers});
  }

  /**UPDATE
   * @param empresa
   * @return Empresas
   */
  public update(empresa: Empresas): Observable<Empresas> {
    return this.http.put<Empresas>(`${environment.url_api}/empresa/${empresa.id}`, empresa, {headers:this.headers});
  }

  /**DELETE
   * @param id
   * @return Empresas
   */
  public delete(id: number): Observable<Empresas> {
    return this.http.delete<Empresas>(`${environment.url_api}/empresa/${id}`, {headers:this.headers});
  }

  /**LEER
   * @param id
   * @return Empresas
   */
  leer(id: number): Observable<Empresas> {
    return this.http.get<Empresas>(`${environment.url_api}/empresa/${id}`, {headers:this.headers});
  }

  /**Se activan o desactivan los campos del formulario dependiendo de si estamos en modificaciones o consultas */
  public activa(){
    return this.estado=false;
  }

  public desactiva(){
    return this.estado=true;
  }
}
