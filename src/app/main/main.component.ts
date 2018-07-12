import { Component, OnInit } from '@angular/core';
import {SelectItem} from 'primeng/primeng';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DominioService} from '../services/dominio/dominio.service';
import {Dominio} from '../models/dominio';
import {DiagnosticoService} from '../services/diagnostico/diagnostico.service';
import {Diagnostico} from '../models/diagnostico';
import {ActividadService} from '../services/actividad/actividad.service';
import {Actividad} from '../models/actividad';
import {FlashMessagesService} from "angular2-flash-messages";

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

  periodos: SelectItem[];

  constructor(private fb: FormBuilder,
              private dominioService: DominioService,
              private diagnosticoService: DiagnosticoService,
              private actividadService: ActividadService,
              private flashMessageService: FlashMessagesService) {
    this.createForm();
  }

  ngOnInit() {
    this.generos = [
      {label: 'Femenino', value: 'Femenino'},
      {label: 'Masculino', value: 'Masculino'},
      {label: 'Indefinido', value: 'Indefinido'}
    ];

    this.dominioService.list().subscribe((dominios: Dominio[]) =>{
      this.dominios = dominios.map((dominio: Dominio) => {
        return {label: dominio.name, value: dominio.id};
      });
    });

    this.changeValueDominio();
    this.changeValueDiagnostico();

    this.periodos = [
      {label: 'Horas', value: 'hours'},
      {label: 'Días', value: 'days'},
    ];
  }

  private changeValueDominio() {
    this.pacienteForm.get('dominio').valueChanges
      .subscribe((dominioId) => {
        this.diagnosticoService.getByDominio(dominioId).subscribe(
          (values: Diagnostico[]) => {
            this.diagnosticos = values.map((diagnostico: Diagnostico) => {
              return {label: diagnostico.name, value: diagnostico.id};
            });
          }
        );
    });
  }

  private changeValueDiagnostico() {
    this.pacienteForm.get('diagnostico').valueChanges
      .subscribe((diagnosticoId) => {
        console.log(diagnosticoId);
        this.actividadService.getByDiagnostico(diagnosticoId).subscribe(
          (values: Actividad[]) => {
            this.actividades = values.map((actividad: Actividad) => {
              return {label: actividad.name, value: actividad.id};
            });
          }
        );
      });
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
      dominio: [null, Validators.required ],
      diagnostico: [null, Validators.required ],
      actividad: [[], Validators.required ],
    });
  }

  confirm() {

  }

  showAlarm() {
    this.flashMessageService.show('Mostrando Alrma',
      {
        cssClass: 'ui-messages-success',
        timeout: 3000,
        closeOnClick: true,
        showCloseBtn: true});
  }
}
