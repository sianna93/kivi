import {BaseView} from './baseView';
import {Diagnostico} from './diagnostico';

export interface Dominio extends BaseView {
  diagnosticos: Diagnostico[];
}
