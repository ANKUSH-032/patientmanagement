import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { DoctorList } from 'src/app/helper/model/doctor';
import { AuthService } from 'src/app/services/auth.service';
import { CommonService } from 'src/app/services/common.service';
import { StorageServiceService } from 'src/app/services/storage-service.service';

@Component({
  selector: 'app-doctor-list',
  templateUrl: './doctor-list.component.html',
  styleUrls: ['./doctor-list.component.scss']
})
export class DoctorListComponent implements OnInit {

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  patientList: any = [];
  patinet: DoctorList = {
    firstName: '',
    lastName: '',
    contactNo: '',
    gender: '',
    email: '',
    roleId: '',
    address: '',
    hospitalName: '',
    zipCode: ''
  }
  constructor(private authService: AuthService,
    private commonService: CommonService,
    private toastr: ToastrService,
    private storageService: StorageServiceService) { }
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
          search: 'Doctor Name Search:',
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
  

  this.authService.postReq('Doctors/list',apiParams).subscribe(
    (data) => {
      this.patientList = data['data'];
      this.dtTrigger.next(); // Trigger DataTable update after data is loaded
    },
    (error) => {
      console.error('Error fetching patient list:', error);
      // Handle error
    }
  );
}

deletedoctor(userid : any){
 
  this.authService.delete('Doctors/delete', `?DoctorId=${userid}`).subscribe((data) => {
    this.patientList = data;
    this.toastr.success('Doctor Delete Successfully');
    
  });
}

onViewData(): boolean {
  const viewData = this.storageService.get('role') 
  return viewData.toLowerCase() === 'admin'
}
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }



}
