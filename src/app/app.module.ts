import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import {FormsModule, ReactiveFormsModule} from '@angular/forms'; // <-- here
// import { RoundProgressModule } from 'angular-svg-round-progressbar';
import {AppRoutingModule} from './app-routing.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {DominioService} from './services/dominio/dominio.service';
import {DiagnosticoService} from './services/diagnostico/diagnostico.service';
import {ActividadService} from './services/actividad/actividad.service';

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
  providers: [
    DominioService,
    DiagnosticoService,
    ActividadService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
