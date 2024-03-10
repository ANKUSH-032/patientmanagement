import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAppointmentdataComponent } from './list-appointmentdata.component';

describe('ListAppointmentdataComponent', () => {
  let component: ListAppointmentdataComponent;
  let fixture: ComponentFixture<ListAppointmentdataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListAppointmentdataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListAppointmentdataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
