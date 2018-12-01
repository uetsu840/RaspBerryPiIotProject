import { TestBed, inject } from '@angular/core/testing';

import { StationConfigService } from './station-config.service';

describe('StationConfigService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StationConfigService]
    });
  });

  it('should be created', inject([StationConfigService], (service: StationConfigService) => {
    expect(service).toBeTruthy();
  }));
});
