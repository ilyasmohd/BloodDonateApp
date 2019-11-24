import { TestBed } from '@angular/core/testing';

import { BloodService } from './blood.service';

describe('BloodService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BloodService = TestBed.get(BloodService);
    expect(service).toBeTruthy();
  });
});
