import { TestBed } from '@angular/core/testing';

import { HardskillService } from './hardskill.service';

describe('HardskillService', () => {
  let service: HardskillService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HardskillService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
