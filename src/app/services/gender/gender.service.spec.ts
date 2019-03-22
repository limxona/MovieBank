import { TestBed } from '@angular/core/testing';

import { GenderService } from './gender.service';

describe('GenderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GenderService = TestBed.get(GenderService);
    expect(service).toBeTruthy();
  });
});
