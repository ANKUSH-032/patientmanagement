import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { patientList } from 'src/app/helper/model/patientList';
import { AuthService } from 'src/app/services/auth.service';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-admin-list',
  templateUrl: './admin-list.component.html',
  styleUrls: ['./admin-list.component.scss']
})
export class AdminListComponent implements OnInit {

 dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  patientList: any = [];
  patinet: patientList = {
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
          search: 'Patient Name Search:',
          lengthMenu: 'Show _MENU_ entries',
          info: 'Showing _START_ to _END_ of _TOTAL_ entries',
          infoEmpty: 'Showing 0 to 0 of 0 entries',
          infoFiltered: '(filtered from _MAX_ total entries)'
        },
    
        // columnDefs: [
        //   { width: '50px', targets: 0 },
        //   // Enable sorting on the "First Name" column
        //   { orderable: true, targets: [0] },
        //   // Enable sorting on the "Last Name" column
        //   { orderable: true, targets: [1] },
        // ],
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
  

  this.authService.postReq('User/list',apiParams).subscribe(
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
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
  //   getPatientList() {
  //     let self = this;
  //     this.dtOptions = {
  //         processing: true,
  //         serverSide: true,
  //         pagingType: 'full_numbers',
  //         pageLength: 10,
  //         responsive: true, // Add responsive option

  //         language: {
  //             emptyTable: "No data available in the table",
  //             processing: '<div class="loader-wrapper"><span>Wait Data is loading... </span>&nbsp;&nbsp; <span class="loader"></span></div>',
  //             search: "INPUT",
  //             searchPlaceholder: "Search Technician Name",
  //             paginate: {
  //                 first: self.commonService.firstPage,
  //                 last: self.commonService.lastPage,
  //                 next: self.commonService.nextPage,
  //                 previous: self.commonService.previousPage
  //             }
  //         },
  //         order: [],
  //         ajax: {
  //             url: environment.api_url + 'User/list',
  //             type: 'POST',
  //             contentType: 'application/json',
  //             'beforeSend': function (request: any) {
  //                 const token = 'Bearer ' + localStorage.getItem('token');
  //                 request.setRequestHeader('Authorization', token);
  //             },
  //             data: function (data: any) {
  //                 data['data'] = 'data';
  //                 return JSON.stringify(data);
  //             },
  //             complete: () => {
  //                 this.loading = false;
  //             },
  //         },
  //         initComplete: function () {
  //             $('#technicianList_filter input').unbind();
  //             $('#technicianList_filter input').bind('keyup', function (e) {
  //                 var table = $('#technicianList').DataTable();
  //                 var val = $('#technicianList_filter input').val();
  //                 if (String(val).length > 3 || String(val).length == 0) {
  //                     table.search(String(val)).draw();
  //                 }
  //             });
  //         },
  //         columns: [
  //             { data: "firstName", className: "text-center", orderable: true, title: "First Name", render: function (data: any, type: any, row: any, meta: any) { return data ? data : '-' } },
  //             { data: "lastName", className: "text-center", title: "Last Name", orderable: true, render: function (data: any, type: any, row: any, meta: any) { return data ? data : '-' } },
  //             { data: "email", className: "text-center", title: "Email", orderable: false, render: function (data: any, type: any, row: any, meta: any) { return data ? data : '-' } },
  //             { data: "roleID", className: "text-center", title: "Role Name", orderable: false, render: function (data: any, typ: any, row: any, meta: any) { return data ? data : '-' } },
  //             { data: "address", className: "text-center", title: "Address", orderable: false, render: function (data: any, type: any, row: any, meta: any) { return data ? data : '-' } },
  //             { data: "hospitalName", className: "text-center", title: "Hospital Name", orderable: false, render: function (data: any, type: any, row: any, meta: any) { return data ? data : '-' } },
  //             { data: "zipCode", className: "text-center", title: "Zip Code", orderable: false, render: function (data: any, type: any, row: any, meta: any) { return data ? data : '-' } },
  //             { data: "gender", className: "text-center", title: "Gender", render: function (data: any, type: any, row: any, meta: any) { return data ? data : '-' } },
  //         ],
  //     };
  // }


}
