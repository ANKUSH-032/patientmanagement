import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { PatientregisterComponent } from './auth/patientregister/patientregister.component';
import { PatientlistComponent } from './auth/patientlist/patientlist.component';
import { AuthguardService } from './services/authguard.service';
import { NotfoundComponent } from './auth/NotFund/notfound/notfound.component';
import { PatientGetComponent } from './auth/patient-get/patient-get.component';
import { DoctorListComponent } from './auth/doctor/doctor-list/doctor-list.component';
import { AdminListComponent } from './auth/admin/admin-list/admin-list.component';
import { AdminGetComponent } from './auth/admin/admin-get/admin-get.component';
import { DoctorGetComponent } from './auth/doctor/doctor-get/doctor-get.component';
import { AdminEditComponent } from './auth/admin/admin-edit/admin-edit.component';
import { DoctorEditComponent } from './auth/doctor/doctor-edit/doctor-edit.component';
import { PatientEditComponent } from './auth/patient-edit/patient-edit.component';
import { AdminAddComponent } from './auth/admin/admin-add/admin-add.component';
import { AddDoctorComponent } from './auth/doctor/add-doctor/add-doctor.component';
import { AppointmentListComponent } from './auth/appointment/appointment-list/appointment-list.component';
import { AppointmentAddComponent } from './auth/appointment/appointment-add/appointment-add.component';
import { AppointmentEditComponent } from './auth/appointment/appointment-edit/appointment-edit.component';
import { AppointmentGetComponent } from './auth/appointment/appointment-get/appointment-get.component';


const routes: Routes = [

  { path: '', component: NotfoundComponent },
    { path: 'login', component: LoginComponent},
    { path: 'signup', component: PatientregisterComponent},
    { path: 'add-patient', component: PatientregisterComponent},

    { path: 'list-admin', component: AdminListComponent,canActivate: [AuthguardService] },
    { path: 'get-user/:id', component: AdminGetComponent, canActivate: [AuthguardService] },
    { path: 'edit-admin/:id', component: AdminEditComponent, canActivate: [AuthguardService] },
    { path: 'add-admin', component: AdminAddComponent, canActivate: [AuthguardService] },
    
    
    { path: 'list-doctor', component: DoctorListComponent,canActivate: [AuthguardService] },
    { path: 'get-doctor/:id', component: DoctorGetComponent, canActivate: [AuthguardService] },
    { path: 'edit-doctor/:id', component: DoctorEditComponent, canActivate: [AuthguardService] },
    { path: 'add-doctor', component: AddDoctorComponent, canActivate: [AuthguardService] },

    { path: 'list-patients', component: PatientlistComponent,canActivate: [AuthguardService] },
    { path: 'get-patinet/:id', component: PatientGetComponent, canActivate: [AuthguardService] },
    { path: 'edit-patinet/:id', component: PatientEditComponent, canActivate: [AuthguardService] },

    { path: 'list-appointment', component: AppointmentListComponent,canActivate: [AuthguardService] },
    { path: 'get-appointment/:id', component: AppointmentGetComponent, canActivate: [AuthguardService] },
    { path: 'edit-appointment/:id', component: AppointmentEditComponent, canActivate: [AuthguardService] },
    { path: 'add-appointment', component: AppointmentAddComponent, canActivate: [AuthguardService] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
