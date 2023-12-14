import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Materiales } from '../models/materiales.models';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MaterialesService {
  public material!: Materiales[];
  public estado!:boolean;
  public headers!:HttpHeaders;
  public valores=JSON.parse(String(localStorage.getItem('token')));
  public token:string=this.valores.token;

  constructor(private http: HttpClient){
    this.headers=new HttpHeaders({"Accept":"application/json", "Authorization":this.token});
  }

  /**GET*/
  public get(): Observable<[Materiales]> {
    return this.http.get<[Materiales]>(`${environment.url_api}/material`, {headers:this.headers});
  }

  /**INSERT
   * @param material
   * @return Materiales
   */
  public insert(material: Materiales): Observable<Materiales> {
    return this.http.post<Materiales>(`${environment.url_api}/material`, material, {headers:this.headers});
  }

  /**UPDATE
   * @param material
   * @return Materiales
   */
  public update(material: Materiales): Observable<Materiales> {
    return this.http.put<Materiales>(`${environment.url_api}/material/${material.id}`, material, {headers:this.headers} );
  }

  /**DELETE
   * @param id
   * @return Materiales
   */
  public delete(id: number): Observable<Materiales> {
    return this.http.delete<Materiales>(`${environment.url_api}/material/${id}`, {headers:this.headers});
  }

  /**LEER
   * @param id
   * @return Materiales
   */
  leer(id: number): Observable<Materiales> {
    return this.http.get<Materiales>(`${environment.url_api}/material/${id}`, {headers:this.headers});
  }

  /** Busca el material por su nombre
   * @param string
   * @return Materiales
   */
  buscarPorNombre(nombre: string): Observable<Materiales> {
    return this.http.get<Materiales>(`${environment.url_api}/filtraMat?nombre=${nombre}`, {headers:this.headers});
  }

  /**Se activan o desactivan los campos del formulario dependiendo de si estamos en modificaciones o consultas */
  public activa(){
    return this.estado=false;
  }

  public desactiva(){
    return this.estado=true;
  }
}
