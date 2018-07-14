import { Component, OnInit } from '@angular/core';
import {SelectItem} from 'primeng/primeng';
import {AbstractControl, FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DominioService} from '../services/dominio/dominio.service';
import {Dominio} from '../models/dominio';
import {DiagnosticoService} from '../services/diagnostico/diagnostico.service';
import {Diagnostico} from '../models/diagnostico';
import {ActividadService} from '../services/actividad/actividad.service';
import {Actividad} from '../models/actividad';
import {FlashMessagesService} from "angular2-flash-messages";
import {MessageService} from 'primeng/components/common/messageservice';
import {isStrictNullChecksEnabled} from 'tslint';
import {isNullOrUndefined} from "util";

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
  activitiesClock: Actividad[];

  constructor(private fb: FormBuilder,
              private dominioService: DominioService,
              private diagnosticoService: DiagnosticoService,
              private actividadService: ActividadService,
              private flashMessageService: FlashMessagesService,
              private messageService: MessageService) {
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
      {label: 'Horas', value: 'Horas'},
      {label: 'Minutos', value: 'Minutos'},
    ];

    this.activitiesClock = [];
  }

  private changeValueDominio() {
    this.pacienteForm.get('dominio').valueChanges
      .subscribe((dominioId) => {
        this.pacienteForm.get('diagnostico').setValue(null);
        this.pacienteForm.get('actividades').setValue(null);
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
        this.pacienteForm.get('actividades').setValue(null);
        this.actividadService.getByDiagnostico(diagnosticoId).subscribe(
          (values: Actividad[]) => {
            this.actividades = values.map((actividad: Actividad) => {
              return {label: actividad.name, value: actividad};
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
      dominio: null,
      diagnostico: null,
      actividades: null,
      itemActividades: null
    });
  }

  confirm() {

  }

  public getDiagnostico(diagnosticoId): Diagnostico {
    let value: Diagnostico;
    this.diagnosticoService.get(diagnosticoId).subscribe((diagnostico: Diagnostico) => {
      value = diagnostico;
    });

    return value;
  }

  public addAcctivity() {
    const newActivities: Actividad[] = this.pacienteForm.get('actividades').value;
    const temporalAbstractControls: AbstractControl[] =
      isNullOrUndefined((<FormArray> this.pacienteForm.controls['itemActividades']).controls)  ?  [] : [...(<FormArray> this.pacienteForm.controls['itemActividades']).controls];

    for ( const actividad of newActivities) {

      const newItem: FormGroup = this.fb.group({
        id: actividad.id,
        activity: actividad,
        time: null,
        type: null
      });
      temporalAbstractControls.push(newItem);
    }

    (<FormArray> this.pacienteForm.controls['itemActividades']).controls = temporalAbstractControls;
  }

  showAlarm() {
    setTimeout(() => this.flashMessageService.show(
      'ALARM CLOCK WAKE UP 1',
      {cssClass: 'ui-messages-success', timeout: 5000}
    ), 5000);

    setTimeout(() =>
      this.messageService.add({severity:'info', summary:'Service Message', detail:'Via MessageService'}),
      4000);
    setTimeout(() =>
        this.messageService.add({severity:'info', summary:'Service Message', detail:'Via MessageService'}),
      4500);
    setTimeout(() =>
        this.messageService.add({severity:'info', summary:'Service Message', detail:'Via MessageService'}),
      5000);
    /*this.flashMessageService.show('Mostrando Alrma',
      {
        cssClass: 'ui-messages-success',
        timeout: 3000,
        closeOnClick: true,
        showCloseBtn: true});*/
  }

  deleteActivity(item) {
    const temporalAbstractControls: AbstractControl[] = [...(<FormArray> this.pacienteForm.controls['itemActividades']).controls];
    temporalAbstractControls.splice(temporalAbstractControls.indexOf(item), 1);
    (<FormArray> this.pacienteForm.controls['itemActividades']).controls = temporalAbstractControls;
  }
}
