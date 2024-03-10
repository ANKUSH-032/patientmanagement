import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavigationEnd, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import ValiadateForm from 'src/app/helper/validator';
import { AuthService } from 'src/app/services/auth.service';
import { StorageServiceService } from 'src/app/services/storage-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  loginForm!: FormGroup;
  isText: boolean = false;
  eyeIcon: string = 'fa-eye-slash';
  type: string = 'Password';
  loginData: any;
  message: string = "Login Success"
  submitted = false;
  username: any;
  password: any;
  fieldTextType :boolean = false
  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private route : Router,
    private storageService : StorageServiceService,
    private toastr: ToastrService,){}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
    this.clearToken();
    this.route.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd && event.url === '/login') {
        // Refresh the page when navigating back to the login page
        location.reload();
      } 
    });
  }
  refreshPage() {
    throw new Error('Method not implemented.');
  }

  hideshowpass() {
    this.isText = !this.isText;
    this.isText ? (this.eyeIcon = 'fa-eye') : (this.eyeIcon = 'fa-eye-slash');
    this.isText ? (this.type = 'text') : (this.type = 'password');
  }

  onLogin() {
   // debugger;
    this.submitted = true;
  
    if (this.loginForm.valid) {
      const loginData = this.loginForm.value;

      this.authService.postRequest('Auth/login', loginData).subscribe(
        (res: any) => {
          
          if (res && res.status) {
         
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('token', res.userdetails.token);
            this.storageService.set('user', res.data);
            this.storageService.set('token', res.userdetails.token);
            this.storageService.set('role', res.userdetails.role);
            this.toastr.success(res.message || 'Login successful'); 
            console.log(res.userdetails.role);
            
            if(res.userdetails.role === 'admin'){
              this.route.navigateByUrl('/list-admin');
            }else if(res.userdetails.role === 'doctor'){
              this.route.navigateByUrl('/list-doctor');
              this.storageService.set('doctoruserId', res.userdetails.userId);
            }else{
              this.route.navigateByUrl('/list-patients');
              this.storageService.set('patientuserId', res.userdetails.userId);
            }
           
          } 
          else  {
           
            this.toastr.error(res.message || 'Login unsuccessful'); 
          }
        },
        (res) => {
          this.toastr.error(res.message || 'Login unsuccessful');
         // this.toastr.error('Error in login request'); 
        }
      );
  
    } else {
      
      ValiadateForm.validateAllFormFileds(this.loginForm);
      this.toastr.error('Your form is invalid');
    }
  }
  private clearToken() {

    localStorage.removeItem('token');
   
  }

}
