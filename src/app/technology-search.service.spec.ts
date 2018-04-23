import { TestBed, inject } from '@angular/core/testing';

import { TechnologySearchService } from './technology-search.service';

describe('TechnologySearchService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TechnologySearchService]
    });
  });

  it('should be created', inject([TechnologySearchService], (service: TechnologySearchService) => {
    expect(service).toBeTruthy();
  }));
});
