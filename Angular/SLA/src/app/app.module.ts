import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { FooterComponent } from './footer/footer.component';
import { MainTopComponent } from './main-top/main-top.component';
import { SearchComponent } from './search/search.component';
import { SharedService } from "./search/shared/shared.service";
import { ResultDialogComponent } from './search/result-dialog/result-dialog.component';





@NgModule({
  declarations: [
    AppComponent,
    TopBarComponent,
    LoginFormComponent,
    FooterComponent,
    MainTopComponent,
    SearchComponent,
    ResultDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HttpClientJsonpModule,
    MatDatepickerModule,
    MatFormFieldModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatButtonModule,
    MatExpansionModule,
    MatInputModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatNativeDateModule,
    MatDialogModule,
  ],
  providers: [SharedService],
  bootstrap: [AppComponent]
})
export class AppModule {
  
 }
