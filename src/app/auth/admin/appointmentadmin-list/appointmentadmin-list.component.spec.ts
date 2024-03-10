import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentadminListComponent } from './appointmentadmin-list.component';

describe('AppointmentadminListComponent', () => {
  let component: AppointmentadminListComponent;
  let fixture: ComponentFixture<AppointmentadminListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppointmentadminListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppointmentadminListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
