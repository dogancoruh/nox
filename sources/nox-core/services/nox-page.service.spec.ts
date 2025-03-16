import { TestBed } from '@angular/core/testing';

import { NoxPageService } from './nox-page.service';

describe('NoxPageService', () => {
  let service: NoxPageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NoxPageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
