import { Component, OnInit, Input } from '@angular/core';
import { HttpClient, HttpHeaders, HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

export interface GeneralTable {
  name: string;
  data: any;
}

var GENERAL_TABLE_DATA: GeneralTable[] = [
  { name: 'Current login', data: '' },
  { name: 'Last hour reports', data: '' },
  { name: 'Devices in total', data: '' },
];

@Component({
  selector: 'app-main-top',
  templateUrl: './main-top.component.html',
  styleUrls: ['./main-top.component.css']
})
export class MainTopComponent implements OnInit {

  receivedJSON: object;
  // stringifiedJSON;
  totalDevices: string = '';
  totalDevicesURL = "/info/totalDevices";

  // data for main table
  generalTableDataToShow;
  displayedColumnsGeneralInfo: string[] = [
    'name',
    'data'
  ];

  timestamp: number;
  reportsLastHour = '';
  reportsLastHourURL: string = "logs/lasthour/";

  // is Authorization complete
  @Input() isAuth: boolean = false;

  @Input() curLogin: string = '';

  // data for HTTP GET
  @Input() currentToken;
  @Input() proxyURL = '';
  @Input() currentSLAURL = '';

  panelOpenState = false;

  getTotalDevices() {
    if (this.isAuth == true) {
      //console.log(this.currentToken);
      this.http.get(this.proxyURL + this.currentSLAURL + this.totalDevicesURL, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'token': this.currentToken
        })
      }).toPromise().then((data: any) => {
        //console.log("TD");
        this.totalDevices = data.length;
        // this.stringifiedJSON = JSON.stringify(data.receivedJSON);
        GENERAL_TABLE_DATA[2].data = data.length;
      });
    }
  }

  getLastHourReports() {
    if (this.isAuth == true) {
      this.makeTimeStamp();
      this.http.get(this.proxyURL + this.currentSLAURL + this.reportsLastHourURL + this.timestamp, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'token': this.currentToken
        })
      }).toPromise().then((data: any) => {
        this.reportsLastHour = data;
        // this.stringifiedJSON = JSON.stringify(data.receivedJSON);
        GENERAL_TABLE_DATA[1].data = data;
      });
    }
  }

  makeTimeStamp() {
    var currentDate = new Date();
    this.timestamp = currentDate.getTime();
  }

  constructor(private http: HttpClient) { }

  fillGeneralTable() {
    GENERAL_TABLE_DATA = [
      { name: 'Current login', data: this.curLogin },
      { name: 'Last hour reports', data: this.reportsLastHour },
      { name: 'Devices in total', data: this.totalDevices },
    ];


    this.generalTableDataToShow = GENERAL_TABLE_DATA;
  }

  ngOnInit(): void {
    if (this.isAuth == true) {
      this.getTotalDevices();
      this.getLastHourReports();
      this.fillGeneralTable();
    }

  }


}
