import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CP } from '../models/cps.models';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CpsService {
  public cp!: CP[];
  public headers!:HttpHeaders;
  public valores=JSON.parse(String(localStorage.getItem('token')));
  public token:string=this.valores.token;

  constructor(private http: HttpClient){
    this.headers=new HttpHeaders({"Accept":"application/json", "Authorization":this.token});
  }

  /**GET*/
  public get(): Observable<[CP]> {
    return this.http.get<[CP]>(`${environment.url_api}/cp`, {headers:this.headers});
  }

  /**INSERT
   * @param cp
   * @return CP
   */
  public insert(cp: CP): Observable<CP> {
    return this.http.post<CP>(`${environment.url_api}/cp`, cp, {headers:this.headers});
  }

  /**UPDATE
   * @param cp
   * @return CP
   */
  public update(cp: CP): Observable<CP> {
    return this.http.put<CP>(`${environment.url_api}/cp/${cp.id}`, cp, {headers:this.headers});
  }

  /**DELETE
   * @param id
   * @return
   */
  public delete(id: number): Observable<CP> {
    return this.http.delete<CP>(`${environment.url_api}/cp/${id}`, {headers:this.headers});
  }

  /**LEER
   * @param id
   * @return
   */
  leer(id: number): Observable<CP> {
    return this.http.get<CP>(`${environment.url_api}/cp/${id}`, {headers:this.headers});
  }

  /**FILTRAR
   * @param cp
   * @return CP
  */
  filtrar(cp: number):Observable<CP>{
    return this.http.get<CP>(`${environment.url_api}/buscaCp?numero=${cp}`, {headers:this.headers});
  }
}
