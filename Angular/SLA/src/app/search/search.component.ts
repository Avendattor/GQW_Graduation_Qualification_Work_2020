import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  input_searchByIP: string;
  input_searchByMAC: string;

  constructor() { }

  ngOnInit(): void {
  }

}
