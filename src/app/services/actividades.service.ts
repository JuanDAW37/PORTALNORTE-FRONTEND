import { Actividades_Ubicaciones } from 'src/app/models/actividades_ubicaciones.models';
import { ActividadesTrabajadores } from '../models/activiades_trabajadores_models';
import { ActividadesMateriales } from '../models/actividades_materiales.models';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Actividades } from '../models/actividades.models';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ActividadesService {
  public actividad!: Actividades[];
  public estado!:boolean;
  public headers!:HttpHeaders;
  public valores=JSON.parse(String(localStorage.getItem('token')));
  public token:string=this.valores.token;

  constructor(private http: HttpClient ) {
    this.headers=new HttpHeaders({"Accept":"application/json", "Authorization":this.token});
  }

  /**GET*/
  public get(): Observable<[Actividades]> {

    return this.http.get<[Actividades]>(`${environment.url_api}/actividades`,{headers:this.headers});
  }

  /**INSERT
   * @param actividad
   * @return Actividades
   */
  public insert(actividad: Actividades): Observable<Actividades> {
    return this.http.post<Actividades>(`${environment.url_api}/actividades`, actividad,{headers:this.headers});
  }

  /**UPDATE
   * @param actividad
   * @return Actividades
   */
  public update(actividad: Actividades): Observable<Actividades> {
    return this.http.put<Actividades>(`${environment.url_api}/actividades/${actividad.id}`,
      actividad, {headers:this.headers}
    );
  }

  /**DELETE
   * @param id
   * @return Actividades
   */
  public delete(id: number): Observable<Actividades> {
    return this.http.delete<Actividades>(`${environment.url_api}/actividades/${id}`,{headers:this.headers});
  }

  /**LEER
   * @param id
   * @return Actividades
   */
  leer(id: number): Observable<Actividades> {
    return this.http.get<Actividades>(`${environment.url_api}/actividades/${id}`,{headers:this.headers});
  }

  /**FILTRAR
   * @param actividad
   * @return Actividades
   */
  filtrar(actividad: Actividades): Observable<Actividades> {
    return this.http.get<Actividades>(
      `${environment.url_api}/filtraActividad?tarifa=${actividad.tarifa}&personas=${actividad.personas}&duracion=${actividad.duracion}`
      ,{headers:this.headers});
  }

  /**ATTACH TABLA PIVOTE ACTIVIDADES_UBICACIONES
   * @param actividades
   * @return Actividades
   */
  attachUbicaciones(actividades: Actividades_Ubicaciones): Observable<Actividades_Ubicaciones> {
    return this.http.post<Actividades_Ubicaciones>(`${environment.url_api}/actividades/ubicacion/atach`,actividades,{headers:this.headers});
  }

  /**DETACH TABLA PIVOTE ACTIVIDADES_UBICACIONES
   * @param actividades
   * @return Actividades
   */
  detachUbicaciones(actividades: Actividades_Ubicaciones): Observable<Actividades_Ubicaciones> {
    return this.http.post<Actividades_Ubicaciones>(
      `${environment.url_api}/actividades/ubicacion/detach`,
      actividades,{headers:this.headers});
  }

  /**ATTACH TABLA PIVOTE ACTIVIDADES_TRABAJADORES
   * @param actividades
   * @return Actividades
   */
  attachTrabajadores(actividades: ActividadesTrabajadores): Observable<ActividadesTrabajadores> {
    return this.http.post<ActividadesTrabajadores>(`${environment.url_api}/actividades/guia/atach`, actividades,{headers:this.headers});
  }

  /**DETACH TABLA PIVOTE ACTIVIDADES_TRABAJADORES
   * @param actividades
   * @return Actividades
   */
  detachTrabajadores(actividades: ActividadesTrabajadores): Observable<ActividadesTrabajadores> {
    return this.http.post<ActividadesTrabajadores>(`${environment.url_api}/actividades/guia/detach`, actividades,{headers:this.headers});
  }

  /**ATTACH TABLA PIVOTE ACTIVIDADES_MATERIALES
   * @param actividades
   * @return Actividades
   */
  attachMateriales(actividades: ActividadesMateriales): Observable<ActividadesMateriales> {
    return this.http.post<ActividadesMateriales>(`${environment.url_api}/actividades/material/atach`, actividades,{headers:this.headers});
  }

  /**DETACH TABLA PIVOTE ACTIVIDADES_MATERIALES
   * @param actividades
   * @return Actividades
   */
  detachMaterial(actividades: ActividadesMateriales): Observable<any> {
    return this.http.post(
      `${environment.url_api}/actividades/material/detach`, actividades,{headers:this.headers});
  }

  /**Se activan o desactivan los campos del formulario dependiendo de si estamos en modificaciones o consultas */
  public activa(){
    return this.estado=false;
  }

  public desactiva(){
    return this.estado=true;
  }
}
