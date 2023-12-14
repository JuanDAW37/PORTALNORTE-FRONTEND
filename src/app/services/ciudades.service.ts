import { Injectable } from '@angular/core';
import { Ciudades } from '../models/ciudades.models';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CiudadesService {

  public ciudad!:Ciudades[];
  public headers!:HttpHeaders;
  public valores=JSON.parse(String(localStorage.getItem('token')));
  public token:string=this.valores.token;

  constructor(private http: HttpClient) {
    this.headers=new HttpHeaders({"Accept":"application/json", "Authorization":this.token});
  }

  /**
   * GET
   * @returns array json Ciudades
  */
  public get():Observable<[Ciudades]>{
    return this.http.get<[Ciudades]>(`${environment.url_api}/ciudades`,{headers:this.headers});
  }

  /**INSERT
   * @param ciudad
   * @return Ciudades
  */
  public insert(ciudad: Ciudades):Observable<Ciudades>{
    return this.http.post<Ciudades>(`${environment.url_api}/ciudades`, ciudad,{headers:this.headers});
  }

  /**UPDATE
   * @param ciudad
   * @return Ciudades
  */
  public update(ciudad: Ciudades):Observable<Ciudades>{
    return this.http.put<Ciudades>(`${environment.url_api}/ciudades/${ciudad.id}`, ciudad,{headers:this.headers});
  }

  /**DELETE
   * @param id
   * @return Ciudades
  */
  public delete(id: number):Observable<Ciudades>{
    return this.http.delete<Ciudades>(`${environment.url_api}/ciudades/${id}`,{headers:this.headers});
  }

  /**LEER
   * @param id
   * @return Ciudades
  */
  leer(id: number):Observable<Ciudades>{
    return this.http.get<Ciudades>(`${environment.url_api}/ciudades/${id}`,{headers:this.headers});
  }

  /**FILTRAR
   * @param ciudad
   * @return Ciudades
  */
  filtrar(ciudad: String):Observable<Ciudades>{
    return this.http.get<Ciudades>(`${environment.url_api}/buscaCiudad?ciudad=${ciudad}`,{headers:this.headers});
  }
}
