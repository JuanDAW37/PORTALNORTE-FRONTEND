import { Injectable } from '@angular/core';
import { Reservas } from '../models/reservas.models';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReservasService {

  public reserva!:Reservas[];
  public estado!:boolean;
  public headers!:HttpHeaders;
  public valores=JSON.parse(String(localStorage.getItem('token')));
  public token:string=this.valores.token;

  constructor(private http: HttpClient){
    this.headers=new HttpHeaders({"Accept":"application/json", "Authorization":this.token});
  }

  /**GET
   * @return Reservas
   */
  public get(): Observable<[Reservas]> {
    return this.http.get<[Reservas]>(`${environment.url_api}/reserva`, {headers:this.headers});
  }

  /**INSERT
   * @param reserva
   * @return Reservas
   */
  public insert(reserva: Reservas): Observable<Reservas> {
    return this.http.post<Reservas>(`${environment.url_api}/reserva`, reserva, {headers:this.headers});
  }

  /**UPDATE
   * @param reserva
   * @return Reservas
   */
  public update(reserva: Reservas): Observable<Reservas> {
    return this.http.put<Reservas>(`${environment.url_api}/reserva/${reserva.id}`, reserva, {headers:this.headers});
  }

  /**DELETE
   * @param id
   * @return Reservas
   */
  public delete(id: number): Observable<Reservas> {
    return this.http.delete<Reservas>(`${environment.url_api}/reserva/${id}`, {headers:this.headers});
  }

  /**LEER
   * @param id number
   * @return Reservas
   */
  leer(id: number): Observable<Reservas> {
    return this.http.get<Reservas>(`${environment.url_api}/reserva/${id}`, {headers:this.headers});
  }

  /** Busca la reserva por su número
   * @param string
   * @return Reservas
   */
  buscarReserva(numero: string): Observable<Reservas> {
    return this.http.get<Reservas>(`${environment.url_api}/filtraReserv?numero=${numero}`, {headers:this.headers});
  }

  /** Busca la reserva por su número
   * @param string
   * @return Reservas
   */
  validarReserva(fecha: string, inicio: any, fin: any): Observable<Reservas> {
    return this.http.get<Reservas>(`${environment.url_api}/validarReserva?fecha=${fecha}&inicio=${inicio}&fin=${fin}`, {headers:this.headers});
  }

  /**Se activan o desactivan los campos del formulario dependiendo de si estamos en modificaciones o consultas */
  public activa(){
    return this.estado=false;
  }

  public desactiva(){
    return this.estado=true;
  }
}
