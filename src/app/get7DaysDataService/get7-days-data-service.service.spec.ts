import { TestBed } from '@angular/core/testing';

import { Get7DaysDataServiceService } from './get7-days-data-service.service';

describe('Get7DaysDataServiceService', () => {
  let service: Get7DaysDataServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Get7DaysDataServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
