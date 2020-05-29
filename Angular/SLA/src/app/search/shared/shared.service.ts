import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class SharedService {

  private searchResultsForDialogMACJSON = new BehaviorSubject(
    {
      
    }
  );

  sharedSearchResultsJSON = this.searchResultsForDialogMACJSON.asObservable();

  constructor() { }

  updateJSON(JSON: object) {
    this.searchResultsForDialogMACJSON.next(JSON)
  }

}