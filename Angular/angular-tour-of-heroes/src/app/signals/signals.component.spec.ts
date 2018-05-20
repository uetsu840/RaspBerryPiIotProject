import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignalsComponent } from './signals.component';

describe('SignalesComponent', () => {
  let component: SignalsComponent;
  let fixture: ComponentFixture<SignalsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignalsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
