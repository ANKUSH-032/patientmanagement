import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-admin-get',
  templateUrl: './admin-get.component.html',
  styleUrls: ['./admin-get.component.scss']
})
export class AdminGetComponent implements OnInit {

  userDetails: any = [];
  userId: any;
  routeSubscription : any;
 displayedColumns: string[] = ['firstName', 'lastName','gender','email','contactNo','roleName','zipCode','address','hospitalName','action'];
 constructor(
  private authService: AuthService,
  private commonService: CommonService,
  private toastr: ToastrService,
  private activeRoute: ActivatedRoute
) { }

ngOnInit(): void {
  this.routeSubscription = this.activeRoute.params.subscribe(data => {
    this.userId = data['id']; // Assuming your parameter name is 'UserId'
    console.log('ankush',data);
    this.authService.get('User/get', `?UserId=${this.userId}`).subscribe((data) => {
      this.userDetails = data;
      this.toastr.success('User Get Successfully');
      console.log(this.userDetails);
    });
  });
}


ngOnDestroy(): void {
  this.routeSubscription.unsubscribe();
}

}
