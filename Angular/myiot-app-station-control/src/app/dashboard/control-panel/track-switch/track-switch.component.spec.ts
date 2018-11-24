import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackSwitchComponent } from './track-switch.component';

describe('TrackSwitchComponent', () => {
  let component: TrackSwitchComponent;
  let fixture: ComponentFixture<TrackSwitchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrackSwitchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackSwitchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
