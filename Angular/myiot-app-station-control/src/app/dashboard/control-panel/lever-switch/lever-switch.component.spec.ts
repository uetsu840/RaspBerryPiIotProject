import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeverSwitchComponent } from './lever-switch.component';

describe('LeverSwitchComponent', () => {
  let component: LeverSwitchComponent;
  let fixture: ComponentFixture<LeverSwitchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeverSwitchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeverSwitchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
