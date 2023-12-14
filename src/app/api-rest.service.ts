import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiRestService {

  constructor(private http: HttpClient) { }

  //GET a la API suministrada
  public get(url:string){
    return this.http.get(url);
  }

  //POST a la API suministrada
  public post(url:string, body:any): Observable<any>{
    return this.http.post(url, body)
  }

  //PUT a la API suministrada
  public put(url:string, body:any): Observable<any>{
    return this.http.put(url, body)
  }

  //DELETE a la API suministrada
  public delete(url:string, body:any): Observable<any>{
    return this.http.delete(url, body)
  }
}
