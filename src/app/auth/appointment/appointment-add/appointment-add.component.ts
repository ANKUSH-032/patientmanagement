import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { forkJoin } from 'rxjs';
import ValiadateForm from 'src/app/helper/validator';
import { AuthService } from 'src/app/services/auth.service';
import { StorageServiceService } from 'src/app/services/storage-service.service';

@Component({
  selector: 'app-appointment-add',
  templateUrl: './appointment-add.component.html',
  styleUrls: ['./appointment-add.component.scss']
})
export class AppointmentAddComponent implements OnInit {

  addAppointment!: FormGroup;
  dropdown: any = { doctor_list: [] }
  constructor(private fb: FormBuilder,
    private auth: AuthService,
    private route: Router,
    private toastr: ToastrService,
    private storageService: StorageServiceService,) { }

  ngOnInit(): void {

    this.addAppointment = this.fb.group({
      appointmentTitle: [''],
      appointmentDescription: [''],
      appointmentType: [''],
      appointmentDate: [''],
      appointmentTime: [''],
      doctorID: [''],
    });

    this.getDoctorList();
  }
  onDateChange(event: any) {

    const selectedDate = event.target.value;
    this.addAppointment.patchValue({ appointmentDate: selectedDate });
  }
  onTimeChange(event: any) {

    const selectedTime = event.target.value;
    this.addAppointment.patchValue({ appointmentTime: selectedTime });
  }


  addAppointmentData() {
    if (this.addAppointment.valid) {
      let paientUseId = this.storageService.get('patientuserId')
      const PatientId = paientUseId; // Corrected variable name
// console.log(PatientId)
      this.addAppointment.patchValue({ PatientId });
      const addFormValue = { ...this.addAppointment.value, PatientId: PatientId };
      console.log(addFormValue);

      this.auth.postRequest('Appointment/insert', addFormValue).subscribe({
        next: (res: any) => {
          this.toastr.success(res.message);
          this.route.navigate(['/list-appointment']);
        },
        error: (error: any) => {
          this.toastr.error(error.message);
        }
      });
    } else {
      // Validate the form fields
      ValiadateForm.validateAllFormFileds(this.addAppointment); // Corrected function name

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
    const doctorList$ = this.auth.postRequest('masterlist', { Type: 'DOCTOR' });

    doctorList$.subscribe((res: any) => {
      if (res.status) {
        this.dropdown.doctor_list = res.data;
      }
    });
  }

}
