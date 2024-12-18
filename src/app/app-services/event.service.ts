import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private snackEventSubject = new Subject<String>();

  snackEvent$ = this.snackEventSubject.asObservable();


  emitSnackEvent(msg: string){
    this.snackEventSubject.next(msg);
  }

}
