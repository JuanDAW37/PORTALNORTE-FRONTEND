import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Gestors } from '../models/gestors.models';
import { Trabajadores } from '../models/trabajadores.models';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public gestor!:Gestors[];
  public guia!:Trabajadores[];
  public alta:boolean=false;


  constructor(private http: HttpClient ) {}

  /**
   * Devuelve si existe o no algún gestor para presentar
   * o no el formulario de primer alta
   * @returns boolean
   */
  contarGestor():Observable<Gestors>{
    return this.http.get<Gestors>(`${environment.url_api}/contarGestor`);
  }

  /**LOGIN
   * @param string user
   * @param string password
   * @return json
   */
  loginGuia(trabajador: Trabajadores ): Observable<Trabajadores> {
    return this.http.post<Trabajadores>(`${environment.url_api}/login`, trabajador);
  }

  /**LOGIN
   * @param string user
   * @param string password
   * @return json
   */
  loginGestor(persona: any): Observable<any> {
    return this.http.post<any>(`${environment.url_api}/login`, persona);
  }

  /**
   * Nos desconectamos enviando el token de autenticación
   * @param token
   * @returns
   */
  logout(token:string):Observable<any>{
    let headers=new HttpHeaders({"Accept":"application/json", "Authorization":token});
    return this.http.get<any>(`${environment.url_api}/logout`, {headers:headers});
  }

  /**
   * Guardar el primer gestor de la tabla Gestors
   * @param gestor
   * @returns
   */
  guardarPrimerGestor(gestor: Gestors):Observable<Gestors>{
    return this.http.post<Gestors>(`${environment.url_api}/registro`, gestor);
  }
}
