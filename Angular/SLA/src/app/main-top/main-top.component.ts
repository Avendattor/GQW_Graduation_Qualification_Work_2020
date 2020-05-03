import { Component, OnInit, Input } from '@angular/core';
import { HttpClient, HttpHeaders, HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

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

      });
    }
  }

  makeTimeStamp() {
    var currentDate = new Date();
    this.timestamp = currentDate.getTime();
  }

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    if (this.isAuth == true) {
      this.getTotalDevices();
      this.getLastHourReports();
    }

  }


}
