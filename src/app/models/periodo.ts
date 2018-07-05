export interface Periodo {
  time: number;
  tipe: TiposPeriodo;
}

export enum TiposPeriodo {
  HOURS,
  DAYS
}
