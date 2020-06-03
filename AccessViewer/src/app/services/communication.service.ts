import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CommunicationService {

  public accessAllowed: Subject<number>;

  constructor( private http: HttpClient ) {
    this.accessAllowed = new Subject();
   }

  checkAccessAllowed( value ) {
    this.accessAllowed.next(value > 70 ? 1 : 0);
  }

  getAccessAllowed() {
    return this.accessAllowed.asObservable();
  }

  postAWS(endpoint, data = {}) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json; charset=utf-8'
      })
    };
    return this.http.post(`https://6um12052n6.execute-api.us-east-1.amazonaws.com/dev/${endpoint}`, data, httpOptions);
  }

}
