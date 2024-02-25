import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentGetComponent } from './appointment-get.component';

describe('AppointmentGetComponent', () => {
  let component: AppointmentGetComponent;
  let fixture: ComponentFixture<AppointmentGetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppointmentGetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppointmentGetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
