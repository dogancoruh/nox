import { TestBed } from '@angular/core/testing';

import { NoxPagePreferencesService } from './nox-page-preferences.service';

describe('NoxPagePreferencesService', () => {
  let service: NoxPagePreferencesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NoxPagePreferencesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
