import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CommunicationService {

  public accessAllowed: Subject<boolean>;

  constructor( private http: HttpClient ) {
    this.accessAllowed = new Subject();
   }

  checkAccessAllowed() {
    this.accessAllowed.next(true);
  }

  getAccessAllowed() {
    return this.accessAllowed.asObservable();
  }

  post(url, data) {
    return this.http.post(url, data);
  }

}
