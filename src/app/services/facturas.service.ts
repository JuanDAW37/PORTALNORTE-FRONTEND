import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Facturas } from '../models/facturas.models';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FacturasService {

  public facturas!:Facturas[];
  public estado!:boolean;
  public headers!:HttpHeaders;
  public valores=JSON.parse(String(localStorage.getItem('token')));
  public token:string=this.valores.token;

  constructor(private http: HttpClient){
    this.headers=new HttpHeaders({"Accept":"application/json", "Authorization":this.token});
  }

  /**GET*/
  public get(): Observable<[Facturas]> {
    return this.http.get<[Facturas]>(`${environment.url_api}/factura`, {headers:this.headers});
  }

  /**INSERT
   * @param factura
   * @return Facturas
   */
  public insert(factura: Facturas): Observable<Facturas> {
    return this.http.post<Facturas>(`${environment.url_api}/factura`, factura, {headers:this.headers});
  }

  /**UPDATE
   * @param factura
   * @return Facturas
   */
  public update(factura: Facturas): Observable<Facturas> {
    return this.http.put<Facturas>(`${environment.url_api}/factura/${factura.id}`, factura, {headers:this.headers});
  }

  /**LEER
   * @param id
   * @return Facturas
   */
  leer(id: number): Observable<Facturas> {
    return this.http.get<Facturas>(`${environment.url_api}/factura/${id}`, {headers:this.headers});
  }

  /**FILTRAR
   * @param numero
   * @param fecha
   * @param concepto
   * @return Facturas
   */
  filtrar(numero: number, fecha: string, concepto: string): Observable<Facturas> {
    return this.http.get<Facturas>(`${environment.url_api}/filtraFact?numero=${numero}&fecha=${fecha}&concepto=${concepto}`, {headers:this.headers});
  }

  /**
   * Imprimir PDF
   * @param id
   * @return PDF
   */
  imprimirPDF(id:number){
    return window.open(`${environment.url_api}/verPDF?id=${id}`);
  }

  /**
   * Envia la factura por email y devuelve si se envió o no
   * @param factura
   * @returns
   */
  enviaEmail(id: number): Observable<Facturas>{
    return this.http.get<Facturas>(`${environment.url_api}/enviaEmail?id=${id}`, {headers:this.headers});
  }

  /**
   *  Localiza la factura por el año
   * @param anio
   * @returns
   */
  cogeNumFactura(anio : number): Observable<Facturas>{
    return this.http.get<Facturas>(`${environment.url_api}/cogeNumFactura?anio=${anio}`, {headers:this.headers});
  }

  /**Se activan o desactivan los campos del formulario dependiendo de si estamos en modificaciones o consultas */
  public activa(){
    return this.estado=false;
  }

  public desactiva(){
    return this.estado=true;
  }
}
