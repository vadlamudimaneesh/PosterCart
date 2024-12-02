import { TestBed } from '@angular/core/testing';

import { DisneyLandService } from './disney-land.service';

describe('DisneyLandService', () => {
  let service: DisneyLandService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DisneyLandService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
