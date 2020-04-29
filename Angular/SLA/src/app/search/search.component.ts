import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  inputToSearchByIP: string;
  inputToSearchByMAC: string;

  constructor() { }

  ngOnInit(): void { }

  searchByIPInput(event: any) {
    const value = event.target.value
    this.inputToSearchByIP = value
    //console.log(this.searchByIPInput)
  }

  searchByMACInput(event: any) {
    const value = event.target.value
    this.inputToSearchByMAC = value
    //console.log(this.searchByIPInput)
  }
}
