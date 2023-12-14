import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Emails } from '../models/emails.models';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EmailService {
  public email!: Emails[];
  public headers!:HttpHeaders;
  public valores=JSON.parse(String(localStorage.getItem('token')));
  public token:string=this.valores.token;

  constructor(private http: HttpClient){
    this.headers=new HttpHeaders({"Accept":"application/json", "Authorization":this.token});
  }

  /**GET*/
  public get(): Observable<[Emails]> {
    return this.http.get<[Emails]>(`${environment.url_api}/email`, {headers:this.headers});
  }

  /**INSERT
   * @param email
   * @return Emails
   */
  public insert(email: Emails): Observable<Emails> {
    return this.http.post<Emails>(`${environment.url_api}/email`, email, {headers:this.headers});
  }

  /**UPDATE
   * @param email
   * @return Emails
   */
  public update(email: Emails): Observable<Emails> {
    return this.http.put<Emails>(`${environment.url_api}/email/${email.id}`, email, {headers:this.headers});
  }

  /**DELETE
   * @param id
   * @return Emails
   */
  public delete(id: number): Observable<Emails> {
    return this.http.delete<Emails>(`${environment.url_api}/email/${id}`, {headers:this.headers});
  }

  /**LEER
   * @param id
   * @return Emails
   */
  leer(id: number): Observable<Emails> {
    return this.http.get<Emails>(`${environment.url_api}/email/${id}`, {headers:this.headers});
  }

  /**FILTRAR
   * @param email
   * @return Emails
   */
  filtrar(email: string): Observable<Emails> {
    return this.http.get<Emails>(`${environment.url_api}/buscaEmail?email=${email}`, {headers:this.headers});
  }
}
