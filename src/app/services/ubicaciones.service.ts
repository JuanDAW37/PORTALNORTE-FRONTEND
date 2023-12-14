import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ubicaciones } from '../models/ubicaciones.models';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UbicacionesService {
  public ubicaciones!: Ubicaciones[];
  public estado!:boolean;
  public headers!:HttpHeaders;
  public valores=JSON.parse(String(localStorage.getItem('token')));
  public token:string=this.valores.token;

  constructor(private http: HttpClient){
    this.headers=new HttpHeaders({"Accept":"application/json", "Authorization":this.token});
  }

  /**GET
   * @return Ubicaciones
  */
  public get(): Observable<[Ubicaciones]> {
    return this.http.get<[Ubicaciones]>(`${environment.url_api}/ubicacion`, {headers:this.headers});
  }

  /**INSERT
   * @param ubicacion
   * @return Ubicaciones
  */
  public insert(ubicacion: Ubicaciones): Observable<Ubicaciones> {
    return this.http.post<Ubicaciones>(`${environment.url_api}/ubicacion`, ubicacion, {headers:this.headers});
  }

  /**UPDATE
   * @param ubicacion
   * @return Ubicaciones
  */
  public update(ubicacion: Ubicaciones): Observable<Ubicaciones> {
    return this.http.put<Ubicaciones>(`${environment.url_api}/ubicacion/${ubicacion.id}`, ubicacion, {headers:this.headers});
  }

  /**DELETE
   * @param id
   * @return Ubicaciones
  */
  public delete(id: number): Observable<Ubicaciones> {
    return this.http.delete<Ubicaciones>(`${environment.url_api}/ubicacion/${id}`, {headers:this.headers});
  }

  /**LEER
   * @param id
   * @return Ubicaciones
  */
  leer(id: number): Observable<Ubicaciones> {
    return this.http.get<Ubicaciones>(`${environment.url_api}/ubicacion/${id}`, {headers:this.headers});
  }

  /**FILTRAR
   * @param no
   * @return Ubicaciones
  */
  filtrar(no: any):Observable<Ubicaciones> {
    return this.http.get<Ubicaciones>(`${environment.url_api}/buscaUbicacion?nombre=${no}`, {headers:this.headers});
  }

  /**MAPA
   * @param latnor
   * @param latsur
   * @param lonnor
   * @param lonsur
   * @return Map
  */
  mapas(latnor: number, latsur: number, lonnor: number, lonsur: number) {
    let mapa = `[bbox:${latnor},${latsur},${lonnor},${lonsur}] [out:json][timeout:25];(node["amenity"="drinking_water"];
  node["natural"="spring"];
  node["drinking_water"="yes"]; );out center;>;`;
    return this.http.post('https://overpass-api.de/api/interpreter', mapa, {headers:this.headers});
  }

  /**Se activan o desactivan los campos del formulario dependiendo de si estamos en modificaciones o consultas */
  public activa(){
    return this.estado=false;
  }

  public desactiva(){
    return this.estado=true;
  }
}
