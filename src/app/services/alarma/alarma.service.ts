import { Injectable } from '@angular/core';
import {FlashMessagesService} from 'angular2-flash-messages';
import {Subject} from 'rxjs/Rx';

@Injectable({
  providedIn: 'root'
})
export class AlarmaService {

  public invokeEvent: Subject<any> = new Subject();
  constructor(private FlashMessage: FlashMessagesService) {}

}
