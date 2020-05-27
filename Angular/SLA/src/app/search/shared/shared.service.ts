import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class SharedService {

  private searchResultsForDialogMAC = new BehaviorSubject('First Message');
  sharedMessage = this.searchResultsForDialogMAC.asObservable();

  constructor() { }

  nextMessage(message: string) {
    this.searchResultsForDialogMAC.next(message)
  }

}