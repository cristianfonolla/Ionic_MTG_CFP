import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogSearchResultComponent } from './dialog-search-result.component';

describe('DialogSearchResultComponent', () => {
  let component: DialogSearchResultComponent;
  let fixture: ComponentFixture<DialogSearchResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogSearchResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogSearchResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
