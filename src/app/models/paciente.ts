import {Actividad} from './actividad';

export interface Paciente {
  id?: string;
  names: string;
  cedula?: string;
  edad?: string;
  gender?: string;
  clinicNumber: string;
  room?: string;
  bed?: string;
  actividades: Actividad[];
  estado: string;
}
