export interface Periodo {
  time: number;
  type: TiposPeriodo;
}

export enum TiposPeriodo {
  HOURS,
  DAYS
}
