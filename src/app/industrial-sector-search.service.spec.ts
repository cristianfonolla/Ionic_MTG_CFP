import { TestBed, inject } from '@angular/core/testing';

import { IndustrialSectorSearchService } from './industrial-sector-search.service';

describe('IndustrialSectorSearchService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IndustrialSectorSearchService]
    });
  });

  it('should be created', inject([IndustrialSectorSearchService], (service: IndustrialSectorSearchService) => {
    expect(service).toBeTruthy();
  }));
});
