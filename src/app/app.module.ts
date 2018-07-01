import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import {FormsModule, ReactiveFormsModule} from '@angular/forms'; // <-- here
// import { RoundProgressModule } from 'angular-svg-round-progressbar';
import {AppRoutingModule} from './app-routing.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule, // <-- here
    ReactiveFormsModule
    // RoundProgressModule, // <-- and here
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
