import { Injectable } from '@angular/core';
import {Actividad} from '../../models/actividad';
import {Observable} from 'rxjs/Rx';
import {of} from 'rxjs/index';
import {Diagnostico} from '../../models/diagnostico';

@Injectable({
  providedIn: 'root'
})
export class ActividadService {

  private actividades: Actividad[] = [
    {id: '0', name: 'Aspiración de vías aéreas', diagnosticoId: '0'},
    {id: '1', name: 'Cambios de posición', diagnosticoId: '0'},
    {id: '2', name: 'Precauciones para evitar la aspiración', diagnosticoId: '0'},
    {id: '3', name: 'Vigilar niveles de glucosa en sangre', diagnosticoId: '1'},
    {id: '4', name: 'Mantener vía permeable', diagnosticoId: '1'},
    {id: '5', name: 'Administrar insulina según prescripción', diagnosticoId: '1'},
    {id: '6', name: 'Manejo de la medicación', diagnosticoId: '2'},
    {id: '7', name: 'Manejo de líquidos', diagnosticoId: '2'},
    {id: '8', name: 'Sondaje vesical', diagnosticoId: '2'},
    {id: '9', name: 'Entrenamiento de la vejiga urinaria', diagnosticoId: '2'},
    {id: '10', name: 'Controlar la ingesta y eliminación', diagnosticoId: '3'},
    {id: '11', name: 'Mantener técnica aséptica estricta', diagnosticoId: '3'},
    {id: '12', name: 'Control de característica de la orina', diagnosticoId: '3'},
    {id: '13', name: 'Evaluar medicación con efectos secundarios', diagnosticoId: '4'},
    {id: '14', name: 'Valorar características de las deposiciones', diagnosticoId: '4'},
    {id: '15', name: 'Evitar la ingesta de lácteos', diagnosticoId: '4'},
    {id: '16', name: 'Determinar la presencia de sonidos intestinales', diagnosticoId: '5'},
    {id: '17', name: 'Comprobar la evacuación de las flatulencias', diagnosticoId: '5'},
    {id: '18', name: 'Establecer una dieta especifica', diagnosticoId: '5'},
    {id: '19', name: 'Monitorizar sonidos intestinales', diagnosticoId: '6'},
    {id: '20', name: 'Evaluar la incontinencia fecal', diagnosticoId: '6'},
    {id: '21', name: 'Administrar supositorios de glicerina si es necesario', diagnosticoId: '6'},
    {id: '22', name: 'Realizar enemas si se encuentra prescrito', diagnosticoId: '6'},
    {id: '23', name: 'Vigilar la presencia de peristaltismo', diagnosticoId: '7'},
    {id: '24', name: 'Fomentar ingesta de líquido a no ser que este contraindicado', diagnosticoId: '7'},
    {id: '25', name: 'Administrar enemas o irrigación', diagnosticoId: '7'},
    {id: '26', name: 'Lavar zona perianal después de cada deposición', diagnosticoId: '8'},
    {id: '27', name: 'Monitorizar evacuación intestinal adecuada', diagnosticoId: '8'},
    {id: '28', name: 'Vigilar la piel perianal', diagnosticoId: '8'},
    {id: '29', name: 'Administrar productos sanguíneos si procede', diagnosticoId: '9'},
    {id: '30', name: 'Promover la integridad de la piel', diagnosticoId: '9'},
    {id: '31', name: 'Vigilar el estado hemodinámico', diagnosticoId: '9'},
    {id: '32', name: 'Monitorizar los signos vitales', diagnosticoId: '10'},
    {id: '33', name: 'Monitorizar el estado cardiovascular', diagnosticoId: '10'},
    {id: '34', name: 'Monitorizar la función del marcapaso', diagnosticoId: '10'},
    {id: '35', name: 'Emplear terapia de relajación', diagnosticoId: '10'},
    {id: '36', name: 'Vigilar el estado de oxigenación', diagnosticoId: '11'},
    {id: '37', name: 'Colocar en la posición terapéutica especifica', diagnosticoId: '11'},
    {id: '38', name: 'Realizar los giros según indiquen el estado de la piel', diagnosticoId: '11'},
    {id: '39', name: 'Monitorización de signos vitales', diagnosticoId: '12'},
    {id: '40', name: 'Monitorizar los ruidos pulmonares', diagnosticoId: '12'},
    {id: '41', name: 'Monitorizar periódicamente el color, la temperatura y la humedad de la piel', diagnosticoId: '12'},
    {id: '42', name: 'Auscultar sonidos respiratorios', diagnosticoId: '13'},
    {id: '43', name: 'Eliminar secreciones', diagnosticoId: '13'},
    {id: '44', name: 'Administrar broncodilatadores', diagnosticoId: '13'},
    {id: '45', name: 'Administrar tratamiento con aerosol', diagnosticoId: '13'},
    {id: '46', name: 'Administrar aire u oxigeno humidificados', diagnosticoId: '13'},
    {id: '47', name: 'Administrar oxigeno suplementario', diagnosticoId: '14'},
    {id: '48', name: 'Controlar la eficacia de la oxigenoterapia', diagnosticoId: '14'},
    {id: '49', name: 'Observar si hay signos de toxicidad por el oxígeno y atelectasi', diagnosticoId: '14'},
    {id: '50', name: 'Aspirar vía aérea', diagnosticoId: '15'},
    {id: '51', name: 'Aspirar vía aérea', diagnosticoId: '15'},
    {id: '52', name: 'Observar estado hidroelectrolítico', diagnosticoId: '15'},
    {id: '53', name: 'Mantener oxigeno suplementario', diagnosticoId: '16'},
    {id: '54', name: 'Administrar broncodilatadores e inhaladores', diagnosticoId: '16'},
    {id: '55', name: 'Controlar estado respiratorio', diagnosticoId: '16'}
  ];

  constructor() { }

  public list(): Observable<Actividad[]> {
    return of(this.actividades);
  }

  public get(actividadId): Observable<Actividad> {
    return this.actividades
      .filter(actividad => actividad.id === actividadId)
      .map(value => of(value))
      .shift();
  }

  public getByDiagnostico(diagnosticoId): Observable<Actividad[]> {
    const filter: Actividad[] = [];

    for (const actividad of this.actividades) {
      if (actividad.diagnosticoId === diagnosticoId) {
        filter.push(actividad);
      }
    }

    return of(filter);
  }
}
