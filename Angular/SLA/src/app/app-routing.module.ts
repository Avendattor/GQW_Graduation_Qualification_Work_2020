import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
//import { LoginFormComponent } from './login-form/login-form.component';


const routes: Routes = [];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    //LoginFormComponent,
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
