import { TestBed } from '@angular/core/testing';

import { SoftskillService } from './softskill.service';

describe('SoftskillService', () => {
  let service: SoftskillService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SoftskillService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
