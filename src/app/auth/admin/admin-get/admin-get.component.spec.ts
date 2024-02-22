import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminGetComponent } from './admin-get.component';

describe('AdminGetComponent', () => {
  let component: AdminGetComponent;
  let fixture: ComponentFixture<AdminGetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminGetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminGetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
