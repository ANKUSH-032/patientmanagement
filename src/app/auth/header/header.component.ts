import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageServiceService } from 'src/app/services/storage-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private storageService: StorageServiceService,private router: Router,) { }

  ngOnInit(): void {
  }

  onViewData(): boolean {

    const viewData = this.storageService.get('role') 
      return viewData.toLowerCase() === 'admin'
  }

  onappointmentData(): boolean {

    const viewData = this.storageService.get('role') 
      return viewData.toLowerCase() === 'patient'
  }

  onDoctorData(): boolean {

    const viewData = this.storageService.get('role') 
      return viewData.toLowerCase() === 'doctor'
  }
  onLogOut(): void {
    // Clear the user's session or token
    this.storageService.clear(); // Assuming you have a method to clear the stored data

    // Redirect to the login page
    this.router.navigate(['/login']);
  }

}
