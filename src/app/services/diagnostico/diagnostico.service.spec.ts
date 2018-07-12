import { TestBed, inject } from '@angular/core/testing';

import { DiagnosticoService } from './diagnostico.service';

describe('DiagnosticoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DiagnosticoService]
    });
  });

  it('should be created', inject([DiagnosticoService], (service: DiagnosticoService) => {
    expect(service).toBeTruthy();
  }));
});
