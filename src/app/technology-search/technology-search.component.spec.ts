import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TechnologySearchComponent } from './technology-search.component';

describe('TechnologySearchComponent', () => {
  let component: TechnologySearchComponent;
  let fixture: ComponentFixture<TechnologySearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TechnologySearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TechnologySearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
