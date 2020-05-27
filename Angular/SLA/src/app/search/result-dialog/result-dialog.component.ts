import { SharedService } from "../shared/shared.service";


import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-result-dialog',
  templateUrl: './result-dialog.component.html',
  styleUrls: ['./result-dialog.component.css']
})
export class ResultDialogComponent implements OnInit {

  // shared data for serach results dialog
  searchResultsForDialogMAC;
  searchResultsForDialogIP;

  constructor(
    private sharedService: SharedService,
  ) { }

  ngOnInit() {
    this.sharedService.sharedMessage.subscribe(message => this.searchResultsForDialogMAC = message);
  }

  newMessage() {
    this.sharedService.nextMessage("message from dialog");
  }

}


// @Component({
//   selector: 'search-result-dialog.component',
//   templateUrl: 'search-result-dialog.component.html',
// })
// export class SearchResultDialogComponent {

