import { Injectable } from '@angular/core';
import {Actividad} from '../../models/actividad';
import {Observable} from 'rxjs/Rx';
import {of} from 'rxjs/index';
import {Diagnostico} from '../../models/diagnostico';

@Injectable({
  providedIn: 'root'
})
export class ActividadService {

  private actividades: Actividad[] = [
    {id: '0', name: 'Aspiración de vías aéreas', diagnosticoId: '0'},
    {id: '1', name: 'Cambios de posición', diagnosticoId: '0'},
    {id: '2', name: 'Precauciones para evitar la aspiración', diagnosticoId: '0'},
    {id: '56', name: 'Cambios Postulares', diagnosticoId: '0'},
    {id: '3', name: 'Vigilar niveles de glucosa en sangre', diagnosticoId: '1'},
    {id: '4', name: 'Mantener vía permeable', diagnosticoId: '1'},
    {id: '5', name: 'Administrar insulina según prescripción', diagnosticoId: '1'},
    {id: '57', name: 'Cambios Postulares', diagnosticoId: '1'},
    {id: '6', name: 'Manejo de la medicación', diagnosticoId: '2'},
    {id: '7', name: 'Manejo de líquidos', diagnosticoId: '2'},
    {id: '8', name: 'Sondaje vesical', diagnosticoId: '2'},
    {id: '9', name: 'Entrenamiento de la vejiga urinaria', diagnosticoId: '2'},
    {id: '58', name: 'Cambios Postulares', diagnosticoId: '2'},
    {id: '10', name: 'Controlar la ingesta y eliminación', diagnosticoId: '3'},
    {id: '11', name: 'Mantener técnica aséptica estricta', diagnosticoId: '3'},
    {id: '12', name: 'Control de característica de la orina', diagnosticoId: '3'},
    {id: '59', name: 'Cambios Postulares', diagnosticoId: '3'},
    {id: '13', name: 'Evaluar medicación con efectos secundarios', diagnosticoId: '4'},
    {id: '14', name: 'Valorar características de las deposiciones', diagnosticoId: '4'},
    {id: '15', name: 'Evitar la ingesta de lácteos', diagnosticoId: '4'},
    {id: '60', name: 'Cambios Postulares', diagnosticoId: '4'},
    {id: '16', name: 'Determinar la presencia de sonidos intestinales', diagnosticoId: '5'},
    {id: '17', name: 'Comprobar la evacuación de las flatulencias', diagnosticoId: '5'},
    {id: '18', name: 'Establecer una dieta especifica', diagnosticoId: '5'},
    {id: '61', name: 'Cambios Postulares', diagnosticoId: '5'},
    {id: '19', name: 'Monitorizar sonidos intestinales', diagnosticoId: '6'},
    {id: '20', name: 'Evaluar la incontinencia fecal', diagnosticoId: '6'},
    {id: '21', name: 'Administrar supositorios de glicerina si es necesario', diagnosticoId: '6'},
    {id: '22', name: 'Realizar enemas si se encuentra prescrito', diagnosticoId: '6'},
    {id: '61', name: 'Cambios Postulares', diagnosticoId: '6'},
    {id: '23', name: 'Vigilar la presencia de peristaltismo', diagnosticoId: '7'},
    {id: '24', name: 'Fomentar ingesta de líquido a no ser que este contraindicado', diagnosticoId: '7'},
    {id: '25', name: 'Administrar enemas o irrigación', diagnosticoId: '7'},
    {id: '62', name: 'Cambios Postulares', diagnosticoId: '7'},
    {id: '26', name: 'Lavar zona perianal después de cada deposición', diagnosticoId: '8'},
    {id: '27', name: 'Monitorizar evacuación intestinal adecuada', diagnosticoId: '8'},
    {id: '28', name: 'Vigilar la piel perianal', diagnosticoId: '8'},
    {id: '63', name: 'Cambios Postulares', diagnosticoId: '8'},
    {id: '29', name: 'Administrar productos sanguíneos si procede', diagnosticoId: '9'},
    {id: '30', name: 'Promover la integridad de la piel', diagnosticoId: '9'},
    {id: '31', name: 'Vigilar el estado hemodinámico', diagnosticoId: '9'},
    {id: '63', name: 'Cambios Postulares', diagnosticoId: '9'},
    {id: '32', name: 'Monitorizar los signos vitales', diagnosticoId: '10'},
    {id: '33', name: 'Monitorizar el estado cardiovascular', diagnosticoId: '10'},
    {id: '34', name: 'Monitorizar la función del marcapaso', diagnosticoId: '10'},
    {id: '35', name: 'Emplear terapia de relajación', diagnosticoId: '10'},
    {id: '64', name: 'Cambios Postulares', diagnosticoId: '10'},
    {id: '36', name: 'Vigilar el estado de oxigenación', diagnosticoId: '11'},
    {id: '37', name: 'Colocar en la posición terapéutica especifica', diagnosticoId: '11'},
    {id: '38', name: 'Realizar los giros según indiquen el estado de la piel', diagnosticoId: '11'},
    {id: '65', name: 'Cambios Postulares', diagnosticoId: '11'},
    {id: '39', name: 'Monitorización de signos vitales', diagnosticoId: '12'},
    {id: '40', name: 'Monitorizar los ruidos pulmonares', diagnosticoId: '12'},
    {id: '41', name: 'Monitorizar periódicamente el color, la temperatura y la humedad de la piel', diagnosticoId: '12'},
    {id: '66', name: 'Cambios Postulares', diagnosticoId: '12'},
    {id: '42', name: 'Auscultar sonidos respiratorios', diagnosticoId: '13'},
    {id: '43', name: 'Eliminar secreciones', diagnosticoId: '13'},
    {id: '44', name: 'Administrar broncodilatadores', diagnosticoId: '13'},
    {id: '45', name: 'Administrar tratamiento con aerosol', diagnosticoId: '13'},
    {id: '46', name: 'Administrar aire u oxigeno humidificados', diagnosticoId: '13'},
    {id: '67', name: 'Cambios Postulares', diagnosticoId: '13'},
    {id: '47', name: 'Administrar oxigeno suplementario', diagnosticoId: '14'},
    {id: '48', name: 'Controlar la eficacia de la oxigenoterapia', diagnosticoId: '14'},
    {id: '49', name: 'Observar si hay signos de toxicidad por el oxígeno y atelectasi', diagnosticoId: '14'},
    {id: '68', name: 'Cambios Postulares', diagnosticoId: '14'},
    {id: '50', name: 'Aspirar vía aérea', diagnosticoId: '15'},
    {id: '51', name: 'Administrar fisioterapia torácica', diagnosticoId: '15'},
    {id: '52', name: 'Observar estado hidroelectrolítico', diagnosticoId: '15'},
    {id: '69', name: 'Cambios Postulares', diagnosticoId: '15'},
    {id: '53', name: 'Mantener oxigeno suplementario', diagnosticoId: '16'},
    {id: '54', name: 'Administrar broncodilatadores e inhaladores', diagnosticoId: '16'},
    {id: '55', name: 'Controlar estado respiratorio', diagnosticoId: '16'},
    {id: '70', name: 'Cambios Postulares', diagnosticoId: '16'},
    {id: '71', name: 'Vigilar el estado de hidratación ', diagnosticoId: '17'},
    {id: '72', name: 'Pesar a diario y controlar evolución ', diagnosticoId: '17'},
    {id: '73', name: 'Controlar resultados de laboratorio', diagnosticoId: '17'},
    {id: '74', name: 'Monitorizar estado hemodinámico', diagnosticoId: '17'},
    {id: '75', name: 'Cambios Postulares', diagnosticoId: '17'},
    {id: '76', name: 'Vigilar el nivel sérico de electrolitos ', diagnosticoId: '18'},
    {id: '77', name: 'Observar si hay desequilibrios acido básicos', diagnosticoId: '18'},
    {id: '78', name: 'Vigilar la osmolaridad sérica urinaria', diagnosticoId: '18'},
    {id: '79', name: 'Observar si hay nauseas, vómitos y diarrea', diagnosticoId: '18'},
    {id: '80', name: 'Cambios Postulares', diagnosticoId: '18'},
    {id: '81', name: 'Vigilar las posibles fuentes de pérdidas de líquidos', diagnosticoId: '19'},
    {id: '82', name: 'Controlar la pulsioximetria', diagnosticoId: '19'},
    {id: '83', name: 'Vigilar la temperatura y el estado respiratorio', diagnosticoId: '19'},
    {id: '84', name: 'Comprobar los valores de laboratorio', diagnosticoId: '19'},
    {id: '85', name: 'Cambios Postulares', diagnosticoId: '19'},
    {id: '86', name: 'Determinar la cantidad de ingesta de líquidos', diagnosticoId: '20'},
    {id: '87', name: 'Identificar factores de desequilibrio de líquidos', diagnosticoId: '20'},
    {id: '86', name: 'Monitorización del peso', diagnosticoId: '20'},
    {id: '87', name: 'Observar el color, cantidad, y gravedad de la orina', diagnosticoId: '20'},
    {id: '88', name: 'Cambios Postulares', diagnosticoId: '20'},
    {id: '89', name: 'Vigilar si se producen hemorragias', diagnosticoId: '21'},
    {id: '90', name: 'Controlar signos vitales', diagnosticoId: '21'},
    {id: '91', name: 'Administrar hemoderivados', diagnosticoId: '21'},
    {id: '92', name: 'Cambios Postulares', diagnosticoId: '21'},
    {id: '93', name: 'Registrar el nivel de hemoglobina/hematocrito antes y después de la pérdida de sangre', diagnosticoId: '22'},
    {id: '94', name: 'Organizar la disponibilidad de hemoderivados para transfusión si se necesitara', diagnosticoId: '22'},
    {id: '95', name: 'Aplicar presión directa o un vendaje compresivo', diagnosticoId: '22'},
    {id: '96', name: 'Monitorizar la función neurológica', diagnosticoId: '22'},
    {id: '97', name: 'Cambios Postulares', diagnosticoId: '22'},
    {id: '97', name: 'Comprobar respuestas precoces de compensación del shock', diagnosticoId: '23'},
    {id: '97', name: 'Controlar los signos precoces de síndrome de respuesta inflamatoria sistémica', diagnosticoId: '23'},
    {id: '97', name: 'Vigilar las posibles fuentes de perdida de líquidos', diagnosticoId: '23'},
    {id: '97', name: 'Controlar los signos precoces de compromiso cardiaco', diagnosticoId: '23'},
    {id: '97', name: 'Colocar al paciente en decúbito supino con las piernas elevadas o en decúbito supino con la cabeza y hombros elevados', diagnosticoId: '23'},
    {id: '97', name: 'Administrar oxigeno y/o ventilación mecánica', diagnosticoId: '23'},
    {id: '97', name: 'Cambios Postulares', diagnosticoId: '23'},
    {id: '97', name: 'Identificar déficit cognitivos o físicos del paciente', diagnosticoId: '24'},
    {id: '97', name: 'Identificar conductas y factores que afectan al riesgo de caída', diagnosticoId: '24'},
    {id: '97', name: 'Ayudar a la deambulación de las personas inestables', diagnosticoId: '24'},
    {id: '97', name: 'Cambios Postulares', diagnosticoId: '24'},
    {id: '97', name: 'Utilizar una valoración de riesgo (escala de Braden)', diagnosticoId: '25'},
    {id: '97', name: 'Registrar el estado de la piel durante el ingreso y luego a diario', diagnosticoId: '25'},
    {id: '97', name: 'Inspeccionar la piel de las prominencias óseas y demás puntos de presión', diagnosticoId: '25'},
    {id: '97', name: 'Aplicar protectores para los codos y los talones', diagnosticoId: '25'},
    {id: '97', name: 'Cambios Postulares', diagnosticoId: '25'},
    {id: '97', name: 'Comprobar la temperatura', diagnosticoId: '26'},
    {id: '97', name: 'Controlar la presión arterial, el pulso y la respiración', diagnosticoId: '26'},
    {id: '97', name: 'Favorecer una ingesta nutricional y de líquidos adecuada', diagnosticoId: '26'},
    {id: '97', name: 'Administras medicamentos antipiréticos, si está indicado', diagnosticoId: '26'},
    {id: '97', name: 'Cambios Postulares', diagnosticoId: '26'},
    {id: '97', name: 'Asegurar que el paciente reciba los cuidados analgésicos correspondientes', diagnosticoId: '27'},
    {id: '97', name: 'Explorar al paciente los factores que alivian/empeoran el dolor', diagnosticoId: '27'},
    {id: '97', name: 'Proporcionar a la persona un alivio del dolor óptimo mediante analgésicos prescritos', diagnosticoId: '27'},
    {id: '97', name: 'Cambios Postulares', diagnosticoId: '27'},
    {id: '97', name: 'Vigilar el estado de oxigenación antes y después de un cambio de posición', diagnosticoId: '28'},
    {id: '97', name: 'Cambios Postulares', diagnosticoId: '28'},
    {id: '97', name: 'Observar los signos y síntomas de infección sistematica y localizada ', diagnosticoId: '29'},
    {id: '97', name: 'Mantener la asepsia para el paciente de riesgo', diagnosticoId: '29'},
    {id: '97', name: 'Inspeccionar el estado de cualquier incisión/ herida quirúrgica', diagnosticoId: '29'},
    {id: '97', name: 'Fomentar un aumento de movilidad y la realización de ejercicios', diagnosticoId: '29'},
    {id: '97', name: 'Notificar la sospecha de infecciones al personal de control de infecciones', diagnosticoId: '29'},
    {id: '97', name: 'Cambios Postulares', diagnosticoId: '29'},
    {id: '97', name: 'Colocar al paciente para maximizar el potencial de ventilación', diagnosticoId: '30'},
    {id: '97', name: 'Identificar requerimiento de la intubación de vías aéreas.', diagnosticoId: '30'},
    {id: '97', name: 'Eliminar las secreciones fomentando la tos o mediante succion', diagnosticoId: '30'},
    {id: '97', name: 'Auscultar los sonidos de respiración, observando las aéreas de disminución o ausencia de ventilación y la presencia de sonidos adventicios.', diagnosticoId: '30'},
    {id: '97', name: 'Administrar aire u oxigeno humidificados, según corresponda', diagnosticoId: '30'},
    {id: '97', name: 'Cambios Postulares', diagnosticoId: '30'},
    {id: '97', name: 'Controlar la marcha, el equilibrio y el cansancio al deambular', diagnosticoId: '31'},
    {id: '97', name: 'Proporcionar dispositivos de ayuda para conseguir una marcha estable', diagnosticoId: '31'},
    {id: '97', name: 'Cambios Postulares', diagnosticoId: '31'},
    {id: '97', name: 'Administrar cuidados del sitio de incisión, según sea necesaria', diagnosticoId: '32'},
    {id: '97', name: 'Administrar cuidados de la ulcera cutánea ', diagnosticoId: '32'},
    {id: '97', name: 'Aplicar un vendaje apropiado al tipo de herida', diagnosticoId: '32'},
    {id: '97', name: 'Cambios Postulares', diagnosticoId: '32'},
    {id: '97', name: 'Observar si hay enrojecimiento, calor extremo, edema o drenaje en la piel y las mucosas', diagnosticoId: '33'},
    {id: '97', name: 'Vigilar el color y temperatura de la piel ', diagnosticoId: '33'},
    {id: '97', name: 'Observar si hay zonas de decoloración, hematomas y perdida de integridad en la piel y las mucosas', diagnosticoId: '33'},
    {id: '97', name: 'Instaurar medidas para evitar mayor deterioro', diagnosticoId: '33'},
    {id: '97', name: 'Valorar el estado de incisión, según corresponda', diagnosticoId: '33'},
    {id: '97', name: 'Cambios Postulares', diagnosticoId: '33'},
    {id: '97', name: 'Planificar la monitorizacion a largo plazo de riesgos para la salud', diagnosticoId: '34'},
    {id: '97', name: 'Comentar y planificar las actividades de reducción del riesgo', diagnosticoId: '34'},
    {id: '97', name: 'Identificar los riesgos biológicos, ambientales y conductuales', diagnosticoId: '34'},
    {id: '97', name: 'Cambios Postulares', diagnosticoId: '34'},
    {id: '97', name: 'Monitorizar la eliminación urinaria, incluyendo su caracteristica', diagnosticoId: '35'},
    {id: '97', name: 'Comentar los procedimientos y los resultados esperados con el paciente', diagnosticoId: '35'},
    {id: '97', name: 'Proporcionar prendas protectoras, si es necesario', diagnosticoId: '35'},
    {id: '97', name: 'Limpiar la zona dérmica genital a intervalos regulares', diagnosticoId: '35'},
    {id: '97', name: 'Cambios Postulares', diagnosticoId: '35'},
    {id: '97', name: 'Administrar cuidados de la incisión', diagnosticoId: '36'},
    {id: '97', name: 'Inspeccionar la herida cambiar el aposito según la cantidad de exudado y drenaje', diagnosticoId: '36'},
    {id: '97', name: 'Colocar mecanismos de alivio de presión', diagnosticoId: '36'},
    {id: '97', name: 'Cambios Postulares', diagnosticoId: '36'},
  ];

  constructor() { }

  public list(): Observable<Actividad[]> {
    return of(this.actividades);
  }

  public get(actividadId): Observable<Actividad> {
    return this.actividades
      .filter(actividad => actividad.id === actividadId)
      .map(value => of(value))
      .shift();
  }

  public getByDiagnostico(diagnosticoId): Observable<Actividad[]> {
    const filter: Actividad[] = [];

    for (const actividad of this.actividades) {
      if (actividad.diagnosticoId === diagnosticoId) {
        filter.push(actividad);
      }
    }

    return of(filter);
  }

  public addPeriod(actividadId, id, time, type): void {
    const findActividad = this.actividades.find(a => a.id === actividadId);

    findActividad.period = {id: id, time: time, type: type};
  }
}
