import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Md5 } from 'ts-md5/dist/md5';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})


export class LoginFormComponent implements OnInit {

  inputUserName: string = '';
  inputPassword: string;
  hashedPassword;

  loginURL = "login";
  @Input() proxyURL: string = '';
  @Input() currentSLAURL: string = '';

  postLoginData: object;

  currentToken: string = '';

  isTokenReceived: boolean;
  loginProcess = false;

  // is Authorization complete
  isAuth = false;

  // loginForm: FormGroup;


  // @Output() loginEvent = new EventEmitter<any>();
  // @Output() passwordEvent = new EventEmitter<any>();
  @Output() sendTokenEvent = new EventEmitter<any>();
  @Output() loadMainPageEvent = new EventEmitter<any>();
  @Output() sendUsernameEvent = new EventEmitter<any>();



  constructor(
    // private formBuilder: FormBuilder,
    private http: HttpClient
  ) { }

  ngOnInit(): void { }

  usernameInput(event: any) {
    const value = event.target.value
    this.inputUserName = value
    // console.log(this.inputUserName)

  }

  passwordInput(event: any) {
    const value = event.target.value
    this.inputPassword = value
    // console.log(this.inputPassword)

  }

  logIn() {
    this.loginProcess = true;
    // this.loginEvent.emit([this.inputUserName, this.inputPassword]);

    this.hashedPassword = Md5.hashStr(this.inputPassword);
    this.postLoginData = {
      username: this.inputUserName,
      password: this.hashedPassword
    };


    if (this.currentToken == '') {
      this.authToken();
    }
    // else {}

    // if (this.currentToken != '') {}

  }

  loadMainPage() {
    this.sendTokenEvent.emit(this.currentToken);
    this.sendUsernameEvent.emit(this.inputUserName);
    this.loadMainPageEvent.emit(this.isAuth);


  }

  // posts login data to server, gets token,loads main page
  private authToken() {
    this.http.post(this.proxyURL + this.currentSLAURL + this.loginURL, this.postLoginData, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    }).toPromise().then((data: any) => {
      // console.log(data);
      // console.log(data.token);

      // console.log(this.currentToken);
      // this.receivedJSON = JSON.stringify(data.receivedJSON);

      if (this.currentToken == data.token) {
        this.isTokenReceived = true;
        this.isAuth = true;
      }
      if (this.currentToken != data.token) {
        this.currentToken = data.token;
        this.isTokenReceived = true;
        this.isAuth = true;
      }

      this.loadMainPage();
    });

  }

}



