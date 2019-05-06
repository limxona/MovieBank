import { TestBed } from '@angular/core/testing';

import { GenreService } from './genre.service';

describe('GenderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GenreService = TestBed.get(GenreService);
    expect(service).toBeTruthy();
  });
});
