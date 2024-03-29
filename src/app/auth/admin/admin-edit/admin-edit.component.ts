import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import ValiadateForm from 'src/app/helper/validator';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-admin-edit',
  templateUrl: './admin-edit.component.html',
  styleUrls: ['./admin-edit.component.scss']
})
export class AdminEditComponent implements OnInit {
  adminEditForm!: FormGroup;
  genderOptions  :any ;
  roleOptions  : any;
  subscriptions: Subscription[] = [];
  userId : any;
  userDetails : any;
  dataLoaded !: false
  
  constructor(private fb: FormBuilder,
    private authService : AuthService,
    private route : Router,
    private toastr: ToastrService,
    private activeRoute: ActivatedRoute) { }

  ngOnInit(): void {

    this.genderOptions = [
      { value: 'male', label: 'Male' },
      { value: 'female', label: 'Female' },
    ];
    
    this.roleOptions = [
      { value: 'admin', label: 'Admin' },
     // { value: 'doctor', label: 'Doctor' },
      //{ value: 'nurse', label: 'Nurse' },
      // Add more roles as needed
    ];
    this.adminEditForm = this.fb.group({
      FirstName: ['', Validators.required],
      LastName: ['', Validators.required],
      ContactNo: ['', Validators.required],
      Email : ['', Validators.required],
      RoleID: ['', Validators.required],
      Address: ['', Validators.required],
      HospitalName: ['', Validators.required],
      ZipCode: ['', Validators.required],
      Gender: ['', Validators.required],
     // Password: ['', Validators.required],
    });
    this.subscriptions.push(
      this.activeRoute.params.subscribe((data) => {
          this.userId = data['id'];
          if (this.userId) {
              this.loadUserData(this.userId);
          }
      })
  );
  }


  loadUserData(userId: any): void {
    this.authService.get('User/get', `?UserId=${userId}`).subscribe(
        (res : any) => {
            this.userDetails = res;
        
          
                const user = this.userDetails.data[0] 
                
                this.adminEditForm.patchValue({
                   
                    FirstName: user.firstName, 
                    LastName: user.lastName,
                    Email: user.email,
                    Address: user.address,
                    ContactNo: user.contactNo,
                    HospitalName: user.hospitalName,
                    ZipCode: user.zipCode,
                    Gender: user.gender,
                    RoleID : user.roleID
                });
            
        },
        
    );

      }
  updateProduct(): void {

    if (this.adminEditForm.valid) {
      console.log( this.adminEditForm.value,this.userId);

      const updatedFormValue = { ...this.adminEditForm.value, userId: this.userId };
      this.subscriptions.push(
        this.authService.editdata('User/update',updatedFormValue).subscribe(
          (response) => {
            
            this.toastr.success('Admin details edited successfully');
            this.route.navigate(['/list-admin']);
          },
          
          (err) => {
            console.log(err);
         
            this.toastr.error('Admin details edit failed');
          }
        )
        
      );
    } else {
      ValiadateForm.validateAllFormFileds(this.adminEditForm);
      this.toastr.error('Your form is invalid');
     
    }
  }
  
  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

}
