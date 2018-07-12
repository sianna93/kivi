import { TestBed, inject } from '@angular/core/testing';

import { AlarmaService } from './alarma.service';

describe('AlarmaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AlarmaService]
    });
  });

  it('should be created', inject([AlarmaService], (service: AlarmaService) => {
    expect(service).toBeTruthy();
  }));
});
