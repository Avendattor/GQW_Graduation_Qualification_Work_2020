import { Input, Component } from '@angular/core';
import { HttpClient, HttpHeaders, HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Md5 } from 'ts-md5/dist/md5';

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
  proxyURL = "https://cors-anywhere.herokuapp.com/";
  testURL = "https://postman-echo.com/post/";
  currentSLAURL = "http://mysla.dlink.ru:8090/";
  loginURL = "login";
  firmwareURL = "info/firmware";

  public currentToken: string = "not_yet";

  receivedJSON: string;

  curLogin: string;
  curPassword;

  postLoginData: object;

  getFirmware: object;
  isFirmwareDataReceived: boolean;
  firmwareData;

  hideLogin = true;
  

  receiveData($event) {
    this.curLogin = $event[0];
    this.curPassword = $event[1];
    this.curPassword = Md5.hashStr(this.curPassword);
    this.postLoginData = {
      username: this.curLogin,
      password: this.curPassword
    };
    this.auth();


  }


  hideLoginForm(){
    this.hideLogin = !this.hideLogin;
  }

  constructor(private http: HttpClient) {

    // if (this.curPassword != undefined && this.curLogin !== undefined) {
    //   this.Auth();
    // }

  }

  private auth() {
    this.http.post(this.proxyURL + this.currentSLAURL + this.loginURL, this.postLoginData, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    }).toPromise().then((data: any) => {
      // console.log(data);
      // console.log(data.token);
      this.currentToken = data.token;
      // console.log(this.currentToken);
      this.receivedJSON = JSON.stringify(data.receivedJSON);

      if (this.currentToken = data.token) {
        this.loadMainPage();
      }
    });

    
      
    
  }

  private getFirmwareData() {
    this.http.get(this.proxyURL + this.currentSLAURL + this.firmwareURL, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': this.currentToken
      })
    }).toPromise().then((data: any) => {
      // console.log(data);
      // console.log(data.token);
      this.firmwareData = data;
      // console.log(this.currentToken);
      this.receivedJSON = JSON.stringify(data.receivedJSON);
      if (this.firmwareData != undefined) {
        this.isFirmwareDataReceived = true;
      }
    });
  }

  private loadMainPage(){

    //if (this.currentToken != "not_yet") {
      this.getFirmwareData();
      this.hideLoginForm()
    //}


    
  }
}