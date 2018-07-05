import {BaseView} from './baseView';
import {Periodo} from './periodo';

export interface Actividad extends BaseView {
  period: Periodo;
  diagnosticoId: string;
}
