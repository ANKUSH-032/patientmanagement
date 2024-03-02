import { Component, OnInit } from '@angular/core';
import { StorageServiceService } from 'src/app/services/storage-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private storageService: StorageServiceService,) { }

  ngOnInit(): void {
  }

  onViewData(): boolean {

    const viewData = this.storageService.get('role') 
    
      return viewData === 'admin'
   
  }

}
