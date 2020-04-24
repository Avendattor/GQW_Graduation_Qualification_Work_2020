import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})


export class LoginFormComponent implements OnInit {

  public inputUserName: string
  public inputPassword: string 

  loginProcess = false;

  // loginForm: FormGroup;

  
  @Output() loginEvent = new EventEmitter<any>();
  @Output() passwordEvent = new EventEmitter<any>();
  

  constructor(
    // private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {}

  usernameInput(event: any){
    const value = event.target.value
    this.inputUserName = value
    // console.log(this.inputUserName)
    
  }

  passwordInput(event: any){
    const value = event.target.value
    this.inputPassword = value
    // console.log(this.inputPassword)

  }

  sendData() {
    this.loginProcess = !this.loginProcess;
    this.loginEvent.emit([this.inputUserName, this.inputPassword]);
    this.passwordEvent.emit(this.inputPassword)
    
  }
  
}



