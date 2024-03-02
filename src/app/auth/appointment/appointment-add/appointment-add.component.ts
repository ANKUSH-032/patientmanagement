import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import ValiadateForm from 'src/app/helper/validator';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-appointment-add',
  templateUrl: './appointment-add.component.html',
  styleUrls: ['./appointment-add.component.scss']
})
export class AppointmentAddComponent implements OnInit {

  type: string = 'Password';
  isText: boolean = false;
  eyeIcon: string = 'fa-eye-slash';
  addAppointment!: FormGroup;
  genderOptions  :any ;
  roleOptions  : any;
  constructor(private fb: FormBuilder,
    private auth : AuthService,
    private route : Router,
    private toastr: ToastrService,) {}

  ngOnInit(): void {
    

    this.addAppointment = this.fb.group({
      appointmentTitle: ['', Validators.required],
      appointmentDescription: ['', Validators.required],
      appointmentType: ['', Validators.required],
      appointmentDate : ['', Validators.required],
      appointmentTime: ['', Validators.required],
      patientId: ['', Validators.required],
      doctorID: ['', Validators.required],
    });
  }
  hideshowpass() {
    this.isText = !this.isText;
    this.isText ? (this.eyeIcon = 'fa-eye') : (this.eyeIcon = 'fa-eye-slash');
    this.isText ? (this.type = 'text') : (this.type = 'password');
  }

  addAppointmentData() {
    if (this.addAppointment.valid) {
    
      this.auth.postRequest('Appointment/insert', this.addAppointment.value).subscribe({
        next: (res: any) => {
          this.toastr.success(res.message);
          // Redirect to the login page after a successful signup
        //  this.route.navigateByUrl('/login');
        this.route.navigate(['/list-appointment']);
        },
        error: (res: any) => {
          this.toastr.error(res.message);
        }
      });
    } else {
      ValiadateForm.validateAllFormFileds(this.addAppointment);
      this.toastr.error('You form is invalid');
    }
   
  }
}
