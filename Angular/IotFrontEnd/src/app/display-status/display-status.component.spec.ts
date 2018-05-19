import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayStatusComponent } from './display-status.component';

describe('DisplayStatusComponent', () => {
  let component: DisplayStatusComponent;
  let fixture: ComponentFixture<DisplayStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
