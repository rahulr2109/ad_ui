import { TestBed } from '@angular/core/testing';

import { GetAnomalyDataService } from './get-anomaly-data.service';

describe('GetAnomalyDataService', () => {
  let service: GetAnomalyDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetAnomalyDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
