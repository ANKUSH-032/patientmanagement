import { Component, HostListener } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'patientmanagement';
  showHead : boolean = true;
  showFoot : boolean = true;
  constructor(private router: Router) {
    
    router.events.forEach((event) => {
      if (event instanceof NavigationStart) {
        if (event.url === '/login' || event.url === '/signup' || event.url == '/') {
          this.showHead = false;
          this.showFoot = false;
        } else {
          this.showHead = true;
          this.showFoot = true;
        }
      }
    });
  }
    @HostListener('window:popstate', ['$event'])
    onpopstate(event: Event): void {
      // Prevent the default behavior of the browser back and forward buttons
      history.pushState(null, document.title, location.href);
    }
}
