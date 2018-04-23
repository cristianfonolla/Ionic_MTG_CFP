import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SectorSearchComponent } from './sector-search.component';

describe('SectorSearchComponent', () => {
  let component: SectorSearchComponent;
  let fixture: ComponentFixture<SectorSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SectorSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SectorSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
