import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignalesComponent } from './heroes.component';

describe('SignalesComponent', () => {
  let component: SignalesComponent;
  let fixture: ComponentFixture<SignalesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignalesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
