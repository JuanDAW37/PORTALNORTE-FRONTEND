import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ImagenService {
  public headers!:HttpHeaders;
  public valores=JSON.parse(String(localStorage.getItem('token')));
  public token:string=this.valores.token;

  constructor(private http: HttpClient) {
    this.headers=new HttpHeaders({"Accept":"application/json", "Authorization":this.token});
  }

  /**
   * Envía a la carpeta ./public/gestors del servidor una foto
   * @param formData
   * @returns any
   */
  gestor(formData:any):Observable<any>{
    return this.http.post(`${environment.url_api}/fotoGestor`, formData,{headers:this.headers});
  }

  /**
   * Envía a la carpeta ./public/clientes del servidor una foto
   * @param formData
   * @returns any
   */
  cliente(formData:any):Observable<any>{
    return this.http.post(`${environment.url_api}/fotoCliente`, formData,{headers:this.headers});
  }

  /**
   * Envía a la carpeta ./public/trabajadores del servidor una foto
   * @param formData
   * @returns any
   */
  trabajador(formData:any):Observable<any>{
    return this.http.post(`${environment.url_api}/fotoTrabajador`, formData,{headers:this.headers});
  }

  /**
   * Envía a la carpeta ./public/actividades del servidor una foto
   * @param formData
   * @returns any
   */
  actividad(formData: any):Observable<any>{
    return this.http.post<any>(`${environment.url_api}/fotoActividad`, formData,{headers:this.headers});
  }

  /**
   * Envía a la carpeta ./public/publicidad del servidor una foto
   * @param formData
   * @returns any
   */
  publicidad(formData:any):Observable<any>{
    return this.http.post<any>(`${environment.url_api}/fotoPublicidad`, formData,{headers:this.headers});
  }

  /**
   * Envía a la carpeta ./public/tipos del servidor una foto
   * @param formData
   * @returns any
   */
  tipo(formData:any):Observable<any>{
    return this.http.post<any>(`${environment.url_api}/fotoTipo`, formData,{headers:this.headers});
  }


}
