import { Component, OnInit } from '@angular/core';
import {SelectItem} from 'primeng/primeng';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  generos: SelectItem[];
  dominios: SelectItem[];
  diagnosticos: SelectItem[];
  actividades: SelectItem[];
  pacienteForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.createForm();
  }

  ngOnInit() {
    this.generos = [
      {label: 'Femenino', value: 'Femenino'},
      {label: 'Masculino', value: 'Masculino'},
      {label: 'Indefinido', value: 'Indefinido'}
    ];

    this.dominios = [
      {label: 'Dominios', value: 'Dominios'},
      {label: 'Dominios2', value: 'Dominios2'},
    ];

    this.diagnosticos = [
      {label: 'Deterioro de la deglucion', value: 'Deterioro de la deglucion'},
      {label: 'Deterioro de la deglucion2', value: 'Deterioro de la deglucion2'},
    ];

    this.actividades = [
      {label: 'Aspiración de vías aéreas', value: 'Aspiración de vías aéreas'},
      {label: 'Aspiración de vías aéreas2', value: 'Aspiración de vías aéreas2'},
    ];
  }

  createForm() {
    this.pacienteForm = this.fb.group({
      names: [null, Validators.required ],
      cedula: [null, Validators.required ],
      edad: [null, Validators.required ],
      gender: ['Femenino', Validators.required ],
      clinic_number: [null, Validators.required ],
      room: [null, Validators.required ],
      bed: [null, Validators.required ],
      dominio: ['Dominios', Validators.required ],
      diagnostico: ['Deterioro de la deglucion', Validators.required ],
      actividad: [['Aspiración de vías aéreas'], Validators.required ],
    });
  }

  confirm() {

  }
}
