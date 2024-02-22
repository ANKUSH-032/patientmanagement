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

const routes: Routes = [

  { path: '', component: NotfoundComponent },
    { path: 'login', component: LoginComponent},
    { path: 'signup', component: PatientregisterComponent},
    { path: 'list-admin', component: AdminListComponent,canActivate: [AuthguardService] },
    { path: 'get-user/:id', component: AdminGetComponent, canActivate: [AuthguardService] },
    { path: 'list-doctor', component: DoctorListComponent,canActivate: [AuthguardService] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
