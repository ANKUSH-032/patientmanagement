import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorGetComponent } from './doctor-get.component';

describe('DoctorGetComponent', () => {
  let component: DoctorGetComponent;
  let fixture: ComponentFixture<DoctorGetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoctorGetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorGetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
