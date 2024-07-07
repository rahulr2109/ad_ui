import { TestBed } from '@angular/core/testing';

import { CurrentDayAnomaliesService } from './current-day-anomalies.service';

describe('CurrentDayAnomaliesService', () => {
  let service: CurrentDayAnomaliesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CurrentDayAnomaliesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
