import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-appointment-get',
  templateUrl: './appointment-get.component.html',
  styleUrls: ['./appointment-get.component.scss']
})
export class AppointmentGetComponent implements OnInit {

  appointmentDetails: any = [];
  userId: any;
  routeSubscription : any;
 displayedColumns: string[] = ['appointmentTitle', 'appointmentDescription','appointmentType','appointmentDate','appointmentTime','action'];
 constructor(
  private authService: AuthService,
  private commonService: CommonService,
  private toastr: ToastrService,
  private activeRoute: ActivatedRoute
) { }

ngOnInit(): void {
  this.routeSubscription = this.activeRoute.params.subscribe(data => {
    this.userId = data['id']; // Assuming your parameter name is 'UserId'
    
    this.authService.get('Appointment/get', `?AppointmentId=${this.userId}`).subscribe((data) => {
      this.appointmentDetails = data;
      this.toastr.success('Doctor Get Successfully');
     
    });
  });
}

ngOnDestroy(): void {
  this.routeSubscription.unsubscribe();
}

}
