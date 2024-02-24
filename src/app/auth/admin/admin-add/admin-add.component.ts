import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import ValiadateForm from 'src/app/helper/validator';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-admin-add',
  templateUrl: './admin-add.component.html',
  styleUrls: ['./admin-add.component.scss']
})
export class AdminAddComponent implements OnInit {

  

  type: string = 'Password';
  isText: boolean = false;
  eyeIcon: string = 'fa-eye-slash';
  addAdmin!: FormGroup;
  genderOptions  :any ;
  roleOptions  : any;
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
      //{ value: 'doctor', label: 'Doctor' },
     // { value: 'nurse', label: 'Nurse' },
      // Add more roles as needed
    ];

    this.addAdmin = this.fb.group({
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

  addAdminData() {
    if (this.addAdmin.valid) {
    
      this.auth.postRequest('User/insert', this.addAdmin.value).subscribe({
        next: (res: any) => {
          this.toastr.success(res.message + " Kindly Login to the site");
          // Redirect to the login page after a successful signup
        //  this.route.navigateByUrl('/login');
        this.route.navigate(['/list-admin']);
        },
        error: (res: any) => {
          this.toastr.error(res.message);
        }
      });
    } else {
      ValiadateForm.validateAllFormFileds(this.addAdmin);
      this.toastr.error('You form is invalid');
    }
   
  }

}
