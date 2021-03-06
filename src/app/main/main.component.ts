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
import {Paciente} from '../models/paciente';
import {Periodo} from '../models/periodo';
import {PacienteService} from '../services/paciente/paciente.service';
import {Router} from '@angular/router';

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

  enableDatos: boolean;
  enableDiagnostico: boolean;
  enableResumen: boolean;

  constructor(private fb: FormBuilder,
              private dominioService: DominioService,
              private diagnosticoService: DiagnosticoService,
              private actividadService: ActividadService,
              private flashMessageService: FlashMessagesService,
              private messageService: MessageService,
              private pacienteService: PacienteService,
              private router: Router) {
    this.createForm();
  }

  ngOnInit() {
    this.enableDatos = true;
    this.enableDiagnostico = false;
    this.enableResumen = false;

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
        id: [actividad.id, Validators.required ],
        activity: [actividad, Validators.required ],
        time: [null, Validators.required ],
        type: ['Minutos', Validators.required ]
      });
      temporalAbstractControls.push(newItem);
    }

    (<FormArray> this.pacienteForm.controls['itemActividades']).controls = temporalAbstractControls;
  }

  handleChange(e) {
    var index = e.index;
  }

  changeTab(datos: boolean, diagnostico: boolean, resumen: boolean) {
    this.enableDatos = datos;
    this.enableDiagnostico = diagnostico;
    this.enableResumen = resumen;
  }

  showAlarm() {
    const itemActividades: AbstractControl[] = (<FormArray> this.pacienteForm.controls['itemActividades']).controls;

    const namePacient = this.pacienteForm.get('names').value;
    const room = this.pacienteForm.get('room').value;
    const bed = this.pacienteForm.get('bed').value;
    const clinicNumber = this.pacienteForm.get('clinic_number').value;

    const activities: Actividad[] = [];

    for (const item of itemActividades) {
      const actividad = item.get('activity').value;
      const time = item.get('time').value;
      const type = item.get('type').value;

      const summary = actividad.name;
      const detail = `${namePacient}\t ${room}/${bed}`;
      const idInterval = setInterval(() => {
          this.messageService.add({severity:'info', summary:summary, detail:detail});
          const myAudio = new Audio('assets/bip.mpeg');
          myAudio.play();
      }, this.calculateTime(time, type));

      const periodo: Periodo = {id: idInterval, time: time, type: type};
      actividad.periodo = periodo;
      activities.push(actividad);
    }

    const paciente: Paciente = {
      names: namePacient,
      clinicNumber: clinicNumber,
      room: room,
      bed: bed,
      actividades: activities,
      estado: 'PRE-ALTA'
    };

    this.pacienteService.add(paciente);

    this.pacienteService.list().subscribe(list => console.log(list));

    this.messageService.add(
      {severity:'success', summary:'Paciente Registrado!',
      detail:'Los datos fueron guardados exitosamente'});

    this.clearAll();

    this.router.navigate( ['']);
  }

  calculateTime(time, type) {
    if (!isNullOrUndefined(time)) {
      const value: number = type === 'Horas' ? time * 3600000 : time * 60000;
      return value;
    }
  }

  deleteActivity(item) {
    const temporalAbstractControls: AbstractControl[] = [...(<FormArray> this.pacienteForm.controls['itemActividades']).controls];
    temporalAbstractControls.splice(temporalAbstractControls.indexOf(item), 1);
    (<FormArray> this.pacienteForm.controls['itemActividades']).controls = temporalAbstractControls;
  }

  clearAll(){
    this.pacienteForm.get('names').setValue(null);
    this.pacienteForm.get('cedula').setValue(null);
    this.pacienteForm.get('edad').setValue(null);
    this.pacienteForm.get('gender').setValue('Femenino');
    this.pacienteForm.get('clinic_number').setValue(null);
    this.pacienteForm.get('room').setValue(null);
    this.pacienteForm.get('bed').setValue(null);
    this.pacienteForm.get('dominio').setValue(null);
    this.pacienteForm.get('diagnostico').setValue(null);
    this.pacienteForm.get('actividades').setValue(null);
    this.pacienteForm.get('itemActividades').setValue(null);
    (<FormArray> this.pacienteForm.controls['itemActividades']).controls = [];
    this.changeTab(true, false, false);
  }
}
