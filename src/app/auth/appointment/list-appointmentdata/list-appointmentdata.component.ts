import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { IAppointmentData } from 'src/app/helper/model/appointment';
import { AuthService } from 'src/app/services/auth.service';
import { CommonService } from 'src/app/services/common.service';
import { StorageServiceService } from 'src/app/services/storage-service.service';

@Component({
  selector: 'app-list-appointmentdata',
  templateUrl: './list-appointmentdata.component.html',
  styleUrls: ['./list-appointmentdata.component.scss']
})
export class ListAppointmentdataComponent implements OnInit {

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  appointmet_list: any = [];
  appointmentdata: IAppointmentData = {
    AppointmentTitle: '',
    AppointmentDescription: '',
    AppointmentType: '',
    AppointmentDate: '',
    AppointmentTime: '',
    DoctorId: '',
    PatientId: '',
    Status: '',
    DoctorName: '',
    PatinetName: ''

  }
  constructor(
    private authService: AuthService,
    private commonService: CommonService,
    private toastr: ToastrService,
    private storageService : StorageServiceService,) { }

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
    const DoctorId = this.storageService.get('doctoruserId')
    const paramRequest = { ...apiParams, DoctorId: DoctorId };

    this.authService.postReq('Appointment/list/appointment', paramRequest).subscribe(
      (data: any) => {
        this.appointmet_list = data['data'];
        this.dtTrigger.next(); // Trigger DataTable update after data is loaded
      },
      (error) => {
        console.error('Error fetching patient list:', error);
        // Handle error
      }
    );
  }

  updateAppointment(appointmentId: any) {
   
      this.authService.patch('Appointment/update/status', { AppointmentId: appointmentId }).subscribe((data) => {
      this.appointmet_list = data;
      this.toastr.success('Appointment Accept Successfully');

    });
  }
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }


}
