import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackStraightComponent } from './track-straight.component';

describe('TrackStraightComponent', () => {
  let component: TrackStraightComponent;
  let fixture: ComponentFixture<TrackStraightComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrackStraightComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackStraightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
