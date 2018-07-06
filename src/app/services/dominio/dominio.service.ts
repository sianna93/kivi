import { Injectable } from '@angular/core';
import {Dominio} from '../../models/dominio';
import {Observable} from 'rxjs/Rx';
import {of} from 'rxjs/index';

@Injectable({
  providedIn: 'root'
})
export class DominioService {

  private dominios: Dominio[] = [
    {id: '0', name: 'Nutrición'},
    {id: '1', name: 'Urinario'},
    {id: '2', name: 'Gastrointestinal'},
    {id: '3', name: 'Cardiovascular'},
    {id: '4', name: 'Respiratorio'}
  ];

  constructor() { }

  public list(): Observable<Dominio[]> {
    return of(this.dominios);
  }

  public get(dominioId): Observable<Dominio> {
    return this.dominios
      .filter(dominio => dominio.id === dominioId)
      .map(value => of(value))
      .shift();
  }
}
