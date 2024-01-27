import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { CommonService } from 'src/app/services/common.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-patientlist',
  templateUrl: './patientlist.component.html',
  styleUrls: ['./patientlist.component.scss']
})
export class PatientlistComponent implements OnInit {
  dtOptions:any = [];
  listProduct: any = [];
  loading = true; // Initially set to true
  constructor( private authService: AuthService,
    private commonService : CommonService,
    private toastr: ToastrService,) { }

  ngOnInit(): void {
    this.getPatientList();
  
  }

  getPatientList(){
    let self = this;
    this.dtOptions = {
      processing: true,
      serverSide: true,
      pagingType: 'full_numbers',
      pageLength: 10,
      language: { emptyTable: "No data available in table",

        processing: '<div class="loader-wrapper"><span>Wait Data is loading... </span>&nbsp;&nbsp; <span class="loader" ></span></div>',
        search: "INPUT",
        searchPlaceholder: "Search Technician Name",
        paginate: {
          first: self.commonService.firstPage,
          last: self.commonService.lastPage,
          next: self.commonService.nextPage,
          previous: self.commonService.previousPage
        }
      },
      order: [],
      ajax: {
        url: environment.api_url + 'User/list',
        type: 'POST',
        contentType: 'application/json', // Set Content-Type
        'beforeSend': function (request : any) {
          const token = 'Bearer ' + localStorage.getItem('token');
          request.setRequestHeader('Authorization', token);
        },
        data: function (data:any) {
          
          data['data'] = 'data';
          return JSON.stringify(data);
        },
        complete: () => {
          this.loading = false; // Set loading to false after the request completes
        },
      },
      initComplete: function() {

        $('#technicianList_filter input').unbind();
        $('#technicianList_filter input').bind('keyup', function(e) {
          var table = $('#technicianList').DataTable();
          var val = $('#technicianList_filter input').val();
          if(String(val).length > 3 || String(val).length == 0) {
            table.search(String(val)).draw();
          }
        });
      },
      columns: [
        {data: "firstName", class: "text-center" ,orderable: true, title: "First Name", render: function (data:any, type:any, row:any, meta:any) { return data ? data : '-' }},
        {data: "lastName", class: "text-center" ,title: "Last Name", orderable: true, render: function (data:any, type:any, row:any, meta:any) { return data ? data : '-' }},
        {data: "email", class: "text-center" , title: "Email", orderable: false, render: function (data:any, type:any, row:any, meta:any) { return data ? data : '-' }},
        {data: "roleID", class: "text-center" , title: "Role Name", orderable: false, render: function (data:any, typ:any, row:any, meta:any) { return data ? data : '-' }},
        {data: "address",class: "text-center" ,  title: "Address", orderable: false, render: function (data:any, type:any, row:any, meta:any) { return data ? data : '-' }},
        {data: "hospitalName", class: "text-center" , title: "Hospital Name", orderable: false, render: function (data:any, type:any, row:any, meta:any) { return data ? data : '-' }},
        {data: "zipCode", class: "text-center" , title: "Zip Code", orderable: false, render: function (data:any, type:any, row:any, meta:any) { return data ? data : '-' }},
        {data: "gender", class: "text-center" , title: "Gender", render: function (data:any, type:any, row:any, meta:any) { return data ? data : '-' }},
        
      ],
    };

  }

  
}


