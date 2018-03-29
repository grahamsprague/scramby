import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';



@Injectable()
export class DataService {
  // this class allows components to send messages for other components to observe
  //
  //

  private viewModeComponent = new BehaviorSubject<string>('default message');
  viewModeComponentMessage = this.viewModeComponent.asObservable();

  constructor() { }

  changeViewMode(message: string) {
    this.viewModeComponent.next(message);
  }



}
