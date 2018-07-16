import { Injectable } from '@angular/core';
import {Diagnostico} from '../../models/diagnostico';
import {Observable} from 'rxjs/Rx';
import {of} from 'rxjs/index';
import {Dominio} from '../../models/dominio';

@Injectable({
  providedIn: 'root'
})
export class DiagnosticoService {

  private diagnosticos: Diagnostico[] = [
    {id: '0', name: 'Deterioro de la deglución', dominioId: '0'},
    {id: '1', name: 'Riesgo de nivel de glucemia inestable', dominioId: '0'},
    {id: '2', name: 'Deterioro de la eliminación urinaria ', dominioId: '1'},
    {id: '3', name: 'Retención Urinaria', dominioId: '1'},
    {id: '4', name: 'Diarrea', dominioId: '2'},
    {id: '5', name: 'Riesgo de motilidad gastrointestinal disfuncional', dominioId: '2'},
    {id: '6', name: 'Motilidad gastrointestinal disfuncional', dominioId: '2'},
    {id: '7', name: 'Estreñimiento', dominioId: '2'},
    {id: '8', name: 'Incontinencia fecal', dominioId: '2'},
    {id: '9', name: 'Disminución del gasto cardiaco', dominioId: '3'},
    {id: '10', name: 'Riesgo de disminución cardiaca ', dominioId: '3'},
    {id: '11', name: 'Riesgo de disminución de la perfusión tisular cardiaca', dominioId: '3'},
    {id: '12', name: 'Riesgo de perfusión tisular cerebral ineficaz', dominioId: '3'},

    {id: '13', name: 'Deterioro del intercambio de gases', dominioId: '4'},
    {id: '14', name: 'Patrón respiratorio ineficaz', dominioId: '4'},
    {id: '15', name: 'Respuesta ventilatoria disfuncional al destete', dominioId: '4'},
    {id: '16', name: 'Deterioro de la ventilación espontánea', dominioId: '4'},

    {id: '17', name: 'Déficit de volumen de líquidos', dominioId: '5'},
    {id: '18', name: 'Exceso de volumen de líquidos', dominioId: '5'},
    {id: '19', name: 'Riesgo de déficit de volumen de líquidos', dominioId: '5'},
    {id: '20', name: 'Riesgo de desequilibrio de volumen de líquidos', dominioId: '5'},
    {id: '21', name: 'Riesgo De Sangrado', dominioId: '6'},
    {id: '22', name: 'Disminución De La Hemorragia', dominioId: '6'},
    {id: '23', name: 'Riesgo De Shock', dominioId: '6'},
    {id: '24', name: 'Riesgo De Traumatismo', dominioId: '6'},
    {id: '25', name: 'Riesgo De Ulcera Por Presión', dominioId: '6'},
    {id: '26', name: 'Riesgo De Desequilibrio De La Temperatura Corporal', dominioId: '6'},
    {id: '27', name: 'Dolor Agudo', dominioId: '6'},
    {id: '28', name: 'Deterioro De La Movilidad Física', dominioId: '6'},
    {id: '29', name: 'Riesgo de infección', dominioId: '6'},
    {id: '30', name: 'Riesgo de aspiración', dominioId: '6'},
    {id: '31', name: 'Riesgo de caídas', dominioId: '6'},
    {id: '32', name: 'Deterioro de la integridad cutánea', dominioId: '6'},
    {id: '33', name: 'Deterioro de la integridad tisular', dominioId: '6'},
    {id: '34', name: 'Riesgo de lesión', dominioId: '6'},
    {id: '35', name: 'Riesgo de la lesión del tracto urinario', dominioId: '6'},
    {id: '36', name: 'Riesgo de la lesión postural perioperatoria', dominioId: '6'},
  ];

  constructor() { }

  public list(): Observable<Diagnostico[]> {
    return of(this.diagnosticos);
  }

  public get(diagnosticoId): Observable<Diagnostico> {
    return this.diagnosticos
      .filter(diagnostico => diagnostico.id === diagnosticoId)
      .map(value => of(value))
      .shift();
  }

  public getByDominio(dominioId): Observable<Diagnostico[]> {
    const filter: Diagnostico[] = [];

    for (const diagnostico of this.diagnosticos) {
      if (diagnostico.dominioId === dominioId) {
        filter.push(diagnostico);
      }
    }

    return of(filter);
  }
}
