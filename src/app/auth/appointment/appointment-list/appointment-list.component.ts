import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { IAppointmentData } from 'src/app/helper/model/appointment';
import { AuthService } from 'src/app/services/auth.service';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-appointment-list',
  templateUrl: './appointment-list.component.html',
  styleUrls: ['./appointment-list.component.scss']
})
export class AppointmentListComponent implements OnInit {

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  appointmet_list: any = [];
  appointmentdata : IAppointmentData = {
    AppointmentTitle: '',
    AppointmentDescription: '',
    AppointmentType: '',
    AppointmentDate: '',
    AppointmentTime: '',
    DoctorId: '',
    PatientId: '',
    Status:'',
    DoctorName:'',
    PatinetName : ''
} 
  constructor(
    private authService: AuthService,
    private commonService: CommonService,
    private toastr: ToastrService,) { }
    ngOnInit(): void {
      this.dtOptions = {
        pagingType: 'simple_numbers',
        pageLength: 10,
        ordering: true, // Enable global ordering
    
        searching: true,
        lengthChange: true,
        info: true,
        autoWidth: true,
        responsive: true,
        language: {
          paginate: {
            first: 'First',
            last: 'Last',
            next: 'Next',
            previous: 'Previous'
          },
          search: 'Appointment Search:',
          lengthMenu: 'Show _MENU_ entries',
          info: 'Showing _START_ to _END_ of _TOTAL_ entries',
          infoEmpty: 'Showing 0 to 0 of 0 entries',
          infoFiltered: '(filtered from _MAX_ total entries)'
        },
      };
    }
    

  ngAfterViewInit() {
    this.loadData();
  }

  loadData() {
    const apiParams = {
      SearchKey: '',
      Start: 0, // You can set appropriate values for Start, PageSize, and SortCol
      PageSize: -1,
      SortCol: ''
    };
  

  this.authService.postReq('Appointment/list',apiParams).subscribe(
    (data : any) => {
      this.appointmet_list = data['data'];
      this.dtTrigger.next(); // Trigger DataTable update after data is loaded
    },
    (error) => {
      console.error('Error fetching patient list:', error);
      // Handle error
    }
  );
}

deletedoctor(userid : any){
 
  this.authService.delete('Appointment/delete', `?AppointmentId=${userid}`).subscribe((data) => {
    this.appointmet_list = data;
    this.toastr.success('Doctor Delete Successfully');
    
  });
}
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }


}
