import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import ValiadateForm from 'src/app/helper/validator';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-patientregister',
  templateUrl: './patientregister.component.html',
  styleUrls: ['./patientregister.component.scss']
})
export class PatientregisterComponent implements OnInit {

  type: string = 'Password';
  isText: boolean = false;
  eyeIcon: string = 'fa-eye-slash';
  signupForm!: FormGroup;
  genderOptions  :any ;
  roleOptions  : any;
  // genderOptions = [
  //   { value: 'male', label: 'Male' },
  //   { value: 'female', label: 'Female' },
  // ];
  
  // roleOptions = [
  //   { value: 'admin', label: 'Admin' },
  //   { value: 'doctor', label: 'Doctor' },
  //   { value: 'nurse', label: 'Nurse' },
  //   // Add more roles as needed
  // ];
  constructor(private fb: FormBuilder,
    private auth : AuthService,
    private route : Router,
    private toastr: ToastrService,) {}

  ngOnInit(): void {
    this.genderOptions = [
      { value: 'male', label: 'Male' },
      { value: 'female', label: 'Female' },
    ];
    
    this.roleOptions = [
      { value: 'admin', label: 'Admin' },
      { value: 'doctor', label: 'Doctor' },
      { value: 'nurse', label: 'Nurse' },
      // Add more roles as needed
    ];

    this.signupForm = this.fb.group({
      FirstName: ['', Validators.required],
      LastName: ['', Validators.required],
      ContactNo: ['', Validators.required],
      Email : ['', Validators.required],
      RoleID: ['', Validators.required],
      Address: ['', Validators.required],
      HospitalName: ['', Validators.required],
      ZipCode: ['', Validators.required],
      Gender: ['', Validators.required],
      Password: ['', Validators.required],
    });
  }
  hideshowpass() {
    this.isText = !this.isText;
    this.isText ? (this.eyeIcon = 'fa-eye') : (this.eyeIcon = 'fa-eye-slash');
    this.isText ? (this.type = 'text') : (this.type = 'password');
  }
  onSignup() {
    if (this.signupForm.valid) {
    
      this.auth.postRequest('User/insert', this.signupForm.value).subscribe({
        next: (res: any) => {
          this.toastr.success(res.message + " Kindly Login to the site");
          // Redirect to the login page after a successful signup
          this.route.navigateByUrl('/login');
        },
        error: (res: any) => {
          this.toastr.error(res.message);
        }
      });
    } else {
      ValiadateForm.validateAllFormFileds(this.signupForm);
      this.toastr.error('You form is invalid');
    }
   
  }
  

}
