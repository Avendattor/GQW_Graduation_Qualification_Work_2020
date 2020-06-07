import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})



export class TopBarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @Input() hideLogin: boolean;

  refresh(): void {
    window.location.reload();
  }

}
