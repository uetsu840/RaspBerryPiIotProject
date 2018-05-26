import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleSignalComponent } from './single-signal.component';

describe('SingleSignalComponent', () => {
  let component: SingleSignalComponent;
  let fixture: ComponentFixture<SingleSignalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleSignalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleSignalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
