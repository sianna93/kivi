import {BaseView} from './baseView';
import {Actividad} from './actividad';

export interface Diagnostico extends BaseView {
  activities?: Actividad[];
  dominioId: string;
}
