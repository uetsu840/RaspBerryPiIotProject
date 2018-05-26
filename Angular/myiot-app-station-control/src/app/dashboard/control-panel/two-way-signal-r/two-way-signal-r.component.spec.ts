import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TwoWaySignalRComponent } from './two-way-signal-r.component';

describe('TwoWaySignalRComponent', () => {
  let component: TwoWaySignalRComponent;
  let fixture: ComponentFixture<TwoWaySignalRComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TwoWaySignalRComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TwoWaySignalRComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
