import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import {MainRoutingModule} from './main-routing.module';
import {DropdownModule, InputTextModule, ListboxModule, MultiSelectModule, ScrollPanelModule, TabViewModule} from 'primeng/primeng';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ButtonModule} from 'primeng/button';

@NgModule({
  imports: [
    CommonModule,
    MainRoutingModule,
    TabViewModule,
    InputTextModule,
    DropdownModule,
    FormsModule,
    ReactiveFormsModule,
    ListboxModule,
    MultiSelectModule,
    ScrollPanelModule,
    ButtonModule
  ],
  declarations: [MainComponent],
  providers: []
})
export class MainModule { }
