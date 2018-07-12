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
    {id: '8', name: 'Disminución del gasto cardiaco', dominioId: '3'},
    {id: '9', name: 'Riesgo de disminución cardiaca ', dominioId: '3'},
    {id: '10', name: 'Riesgo de disminución de la perfusión tisular cardiaca', dominioId: '3'},
    {id: '11', name: 'Riesgo de perfusión tisular cerebral ineficaz', dominioId: '3'},
    {id: '12', name: 'Deterioro del intercambio de gases', dominioId: '4'},
    {id: '13', name: 'Patrón respiratorio ineficaz', dominioId: '4'},
    {id: '14', name: 'Respuesta ventilatoria disfuncional al destete', dominioId: '4'},
    {id: '15', name: 'Deterioro de la ventilación espontánea', dominioId: '4'}
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
