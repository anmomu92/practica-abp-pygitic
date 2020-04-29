import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommunicationService {

  public accessAllowed: Subject<boolean>;

  constructor() {
    this.accessAllowed = new Subject();
   }

  checkAccessAllowed() {
    this.accessAllowed.next(true);
  }

  getAccessAllowed() {
    return this.accessAllowed.asObservable();
  }

}
