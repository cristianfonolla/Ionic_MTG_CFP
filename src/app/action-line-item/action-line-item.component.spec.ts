import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionLineItemComponent } from './action-line-item.component';

describe('ActionLineItemComponent', () => {
  let component: ActionLineItemComponent;
  let fixture: ComponentFixture<ActionLineItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActionLineItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionLineItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
