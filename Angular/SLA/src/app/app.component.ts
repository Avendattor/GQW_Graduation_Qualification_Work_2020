import { Input, Component } from '@angular/core';
import { HttpClient, HttpHeaders, HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import {MatDatepickerModule} from '@angular/material/datepicker';


// import { Md5 } from 'angular-md5'

import { LoginFormComponent } from './login-form/login-form.component';
//import { LoginFormComponent } from './login-form/login-form.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {
  title = 'SLA';

  isDebugActive = false;

  // // using proxy cause of CORS policy restrictions 

  // // free, 200 requests per 60 minutes limit
  // proxyURL = "https://cors-anywhere.herokuapp.com/";

  // // personally builded & hosted, no limit 
  proxyURL = "https://stark-depths-37590.herokuapp.com/";

  testURL = "https://postman-echo.com/post/";
  currentSLAURL = "http://mysla.dlink.ru/api/";

  firmwareURL = "info/firmware";

  currentToken: string;
  isTokenReceived: boolean = false;

  receivedJSON: string = '';

  curLogin: string = '';



  getFirmware: object;
  isFirmwareDataReceived: boolean;
  firmwareData;

  // is Authorization complete
  isAuth: boolean;
  // login-form hide after Auth
  hideLogin = false;


  // gets data from login component
  receiveToken($event) {
    this.currentToken = $event;
    //console.log(this.currentToken);
    if (this.currentToken == $event || this.currentToken != '') {
      this.isTokenReceived = true;
    }

  }

  receiveUsername($event) {
    this.curLogin = $event;
  }

  receiveIsAuth($event) {
    this.isAuth = $event;

    if (this.isAuth = true && this.isTokenReceived == true && this.curLogin != '') {
      this.loadMainPage();
    }
  }



  hideLoginForm() {
    this.hideLogin = !this.hideLogin;
  }

  constructor(private http: HttpClient) { }



  private getFirmwareData() {
    //console.log(`CurToken = ` + this.currentToken);
    this.http.get(this.proxyURL + this.currentSLAURL + this.firmwareURL, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': this.currentToken
      })
    }).toPromise().then((data: any) => {
      //console.log(data);
      // console.log(data.token);
      this.firmwareData = data;
      // console.log(this.currentToken);
      // this.receivedJSON = JSON.stringify(data.receivedJSON);
      if (this.firmwareData != '') {
        this.isFirmwareDataReceived = true;
      }
    });
  }

  // hides login-form and loads some data
  private loadMainPage() {

    this.hideLoginForm();
    //this.getFirmwareData();
  }
}