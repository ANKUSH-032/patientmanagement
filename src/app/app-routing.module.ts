import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { PatientregisterComponent } from './auth/patientregister/patientregister.component';
import { PatientlistComponent } from './auth/patientlist/patientlist.component';
import { AuthguardService } from './services/authguard.service';
import { NotfoundComponent } from './auth/NotFund/notfound/notfound.component';

const routes: Routes = [

  { path: '', component: NotfoundComponent },
    { path: 'login', component: LoginComponent},
    { path: 'signup', component: PatientregisterComponent},
    { path: 'list-patient', component: PatientlistComponent,canActivate: [AuthguardService] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
