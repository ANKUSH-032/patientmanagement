import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { PatientregisterComponent } from './auth/patientregister/patientregister.component';
import { PatientlistComponent } from './auth/patientlist/patientlist.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DataTablesModule } from 'angular-datatables';
import { HeaderComponent } from './auth/header/header.component';
import { FooterComponent } from './auth/footer/footer.component';
import { AuthguardService } from './services/authguard.service';
import { AuthService } from './services/auth.service';
import { NotfoundComponent } from './auth/NotFund/notfound/notfound.component';
import { PatientGetComponent } from './auth/patient-get/patient-get.component';
import { CdkTableModule } from '@angular/cdk/table';
import { AdminRegisterComponent } from './auth/admin/admin-register/admin-register.component';
import { AdminListComponent } from './auth/admin/admin-list/admin-list.component';
import { AdminEditComponent } from './auth/admin/admin-edit/admin-edit.component';
import { AdminGetComponent } from './auth/admin/admin-get/admin-get.component';
import { DoctorListComponent } from './auth/doctor/doctor-list/doctor-list.component';
import { DoctorGetComponent } from './auth/doctor/doctor-get/doctor-get.component';
import { DoctorEditComponent } from './auth/doctor/doctor-edit/doctor-edit.component';
import { PatientEditComponent } from './auth/patient-edit/patient-edit.component';
import { AdminAddComponent } from './auth/admin/admin-add/admin-add.component';
import { AddDoctorComponent } from './auth/doctor/add-doctor/add-doctor.component';
import { AppointmentListComponent } from './auth/appointment/appointment-list/appointment-list.component';
import { AppointmentAddComponent } from './auth/appointment/appointment-add/appointment-add.component';
import { AppointmentEditComponent } from './auth/appointment/appointment-edit/appointment-edit.component';
import { AppointmentGetComponent } from './auth/appointment/appointment-get/appointment-get.component';

//import { DataTablesModule } from 'angular-datatables';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PatientregisterComponent,
    PatientlistComponent,
    HeaderComponent,
    FooterComponent,
    NotfoundComponent,
    PatientGetComponent,
    AdminRegisterComponent,
    AdminListComponent,
    AdminEditComponent,
    AdminGetComponent,
    DoctorListComponent,
    DoctorGetComponent,
    DoctorEditComponent,
    PatientEditComponent,
    AdminAddComponent,
    AddDoctorComponent,
    AppointmentListComponent,
    AppointmentAddComponent,
    AppointmentEditComponent,
    AppointmentGetComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    DataTablesModule,
    CdkTableModule,
    ToastrModule.forRoot(
      {
        timeOut: 4000,
        preventDuplicates: true,
           positionClass: 'toast-top-right',
      })
  ],
  providers: [AuthguardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
