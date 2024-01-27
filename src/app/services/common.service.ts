import { Injectable } from '@angular/core';
import { StorageServiceService } from './storage-service.service';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  nextPage = 'Next <i class="fa fa-lg fa-angle-right" aria-hidden="true"></i>';
  previousPage = '<i class="fa fa-lg fa-angle-left" aria-hidden="true"></i> Previous';
  firstPage = '<i class="fa fa-lg fa-angle-double-left" aria-hidden="true"></i>';
  lastPage = '<i class="fa fa-lg fa-angle-double-right" aria-hidden="true"></i>';
  user = this.storageService.get('user');

  constructor(private storageService : StorageServiceService,) { }
}
