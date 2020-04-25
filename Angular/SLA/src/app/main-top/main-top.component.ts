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
  stringifiedJSON;
  totalDevices: string;
  totalDevicesURL = "/info/totalDevices";

  // is Authorization complete
  @Input() isAuth: boolean;

  @Input() currentToken;
  @Input() proxyURL;
  @Input() currentSLAURL;

  getTotalDevices() {
    if (this.isAuth == true) {
      this.http.get(this.proxyURL + this.currentSLAURL + this.totalDevicesURL, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'token': this.currentToken
        })
      }).toPromise().then((data: any) => {
        this.totalDevices = data.length;
        this.stringifiedJSON = JSON.stringify(data.receivedJSON);

      });
    }
  }

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getTotalDevices();
  }


}
