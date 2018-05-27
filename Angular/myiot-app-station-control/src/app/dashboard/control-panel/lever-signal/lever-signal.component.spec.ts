import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeverSignalComponent } from './lever-signal.component';

describe('LeverSignalComponent', () => {
  let component: LeverSignalComponent;
  let fixture: ComponentFixture<LeverSignalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeverSignalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeverSignalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
