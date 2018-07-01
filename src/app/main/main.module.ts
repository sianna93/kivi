import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import {MainRoutingModule} from './main-routing.module';
import {DropdownModule, InputTextModule, ListboxModule, MultiSelectModule, TabViewModule} from 'primeng/primeng';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

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
    MultiSelectModule
  ],
  declarations: [MainComponent]
})
export class MainModule { }
