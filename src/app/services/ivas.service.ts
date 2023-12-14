import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Iva } from '../models/ivas.models';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class IvasService {

  public iva!:Iva[];
  public estado!:boolean;
  public headers!:HttpHeaders;
  public valores=JSON.parse(String(localStorage.getItem('token')));
  public token:string=this.valores.token;

  constructor(private http: HttpClient){
    this.headers=new HttpHeaders({"Accept":"application/json", "Authorization":this.token});
  }

  /**GET*/
  public get():Observable<[Iva]>{
    return this.http.get<[Iva]>(`${environment.url_api}/iva`, {headers:this.headers});
  }

  /**INSERT
   * @param iva
   * @returns IVA
  */
  public insert(iva: Iva):Observable<Iva>{
    return this.http.post<Iva>(`${environment.url_api}/iva`, iva, {headers:this.headers});
  }

  /**UPDATE
   * @param iva
   * @returns IVA
  */
  public update(iva: Iva):Observable<Iva>{
    return this.http.put<Iva>(`${environment.url_api}/iva/${iva.id}`, iva, {headers:this.headers});
  }

  /**DELETE
   * @param id
   * @return IVA
  */
  public delete(id: number):Observable<Iva>{
    return this.http.delete<Iva>(`${environment.url_api}/iva/${id}`, {headers:this.headers});
  }

  /**LEER
   * @param id
   * @return IVA
  */
  leer(id: any):Observable<Iva>{
    return this.http.get<Iva>(`${environment.url_api}/iva/${id}`, {headers:this.headers});
  }

  /**Se activan o desactivan los campos del formulario dependiendo de si estamos en modificaciones o consultas */
  public activa(){
    return this.estado=false;
  }

  public desactiva(){
    return this.estado=true;
  }
}
