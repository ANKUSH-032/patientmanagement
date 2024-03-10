import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import ValiadateForm from 'src/app/helper/validator';
import { AuthService } from 'src/app/services/auth.service';
import { StorageServiceService } from 'src/app/services/storage-service.service';

@Component({
  selector: 'app-appointment-edit',
  templateUrl: './appointment-edit.component.html',
  styleUrls: ['./appointment-edit.component.scss']
})
export class AppointmentEditComponent implements OnInit {
  appointmentEditForm!: FormGroup;
  genderOptions  :any ;
  roleOptions  : any;
  subscriptions: Subscription[] = [];
  userId : any;
  userDetails : any;
  dataLoaded !: false
  dropdown: any = { doctor_list: [] }
  constructor(private fb: FormBuilder,
    private authService : AuthService,
    private route : Router,
    private toastr: ToastrService,
    private activeRoute: ActivatedRoute,
    private storageService: StorageServiceService,) { }

  ngOnInit(): void {
  
    this.appointmentEditForm = this.fb.group({
      appointmentTitle: [''],
      appointmentDescription: [''],
      appointmentType: [''],
      appointmentDate: [''],
      appointmentTime: [''],
      doctorID: [''],
    });
    this.subscriptions.push(
      this.activeRoute.params.subscribe((data) => {
        this.userId = data['id'];
        if (this.userId) {
          this.loadUserData(this.userId);
        }
      })
    );

    this.getDoctorList();
  }
  onDateChange(event: any) {

    const selectedDate = event.target.value;
    this.appointmentEditForm.patchValue({ appointmentDate: selectedDate });
  }
  onTimeChange(event: any) {

    const selectedTime = event.target.value;
    this.appointmentEditForm.patchValue({ appointmentTime: selectedTime });
  }
  loadUserData(userId: any): void {
    this.authService.get('Appointment/get', `?AppointmentId=${this.userId}`).subscribe(
      (res: any) => {
        this.userDetails = res;
        const user = this.userDetails.data[0]

        this.appointmentEditForm.patchValue({

          appointmentTitle: user.appointmentTitle,
          appointmentDescription: user.appointmentDescription,
          appointmentType: user.appointmentType,
          doctorID: user.doctorId,
          appointmentDate:user.appointmentDate,
          appointmentTime : user.appointmentTime
         
        });
      },

    );

  }
  updateAppointment(): void {
    //debugger;
        if (this.appointmentEditForm.valid) {
          console.log( this.appointmentEditForm.value,this.userId);
          let paientUseId = this.storageService.get('patientuserId')
          const patientId = paientUseId; // Corrected variable name
    
          this.appointmentEditForm.patchValue({ patientId });
          console.log(this.appointmentEditForm.value);
          const updatedFormValue = { ...this.appointmentEditForm.value, AppointmentId: this.userId };
          this.subscriptions.push(
            this.authService.editdata('Appointment/update',updatedFormValue).subscribe(
              (response) => {
                
                this.toastr.success('Appointment details edited successfully');
                this.route.navigate(['/list-appointment']);
              },
              
              (err) => {
                console.log(err);
             
                this.toastr.error('Appointment details edit failed');
              }
            )
            
          );
        } else {
          ValiadateForm.validateAllFormFileds(this.appointmentEditForm);
          this.toastr.error('Your form is invalid');
         
        }
      }
      getDoctorList() {
        // let doctorlist = this.auth.postRequest('masterlist',{Type: 'DOCTOR'});
        // forkJoin([doctorlist]).subscribe((res:any)=>{
    
        //   if(res[0].status){
        //     this.dropdown.doctorlist = res[0].data;
        //     console.log()
        //   }
    
        // })
        const doctorList$ = this.authService.postRequest('masterlist', { Type: 'DOCTOR' });
    
        doctorList$.subscribe((res: any) => {
          if (res.status) {
            this.dropdown.doctor_list = res.data;
          }
        });
      }
    
      ngOnDestroy(): void {
        this.subscriptions.forEach((subscription) => subscription.unsubscribe());
      }
}
