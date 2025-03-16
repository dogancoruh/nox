import { TestBed } from '@angular/core/testing';

import { NoxConfigurationService } from './nox-configuration.service';

describe('NoxConfigurationService', () => {
  let service: NoxConfigurationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NoxConfigurationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
