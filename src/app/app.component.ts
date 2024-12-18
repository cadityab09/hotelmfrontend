import { Component, EventEmitter, Input } from '@angular/core';
import { UserStorageService } from './auth/services/storage/user-storage.service';
import { Router } from '@angular/router';
import { EventService } from './app-services/event.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'HotelManagement';

  sideNavStatus:boolean=false;
  @Input() routeData: any;

  isCustomerLoggedIn: boolean = UserStorageService.isCustomerLoggedIn();
  isAdminLoggedIn: boolean = UserStorageService.isAdminLoggedIn();

  constructor(private router: Router,) {}

  ngOnInit() {
    this.router.events.subscribe(event => {
      if(event.constructor.name === "NavigationEnd"){
       this.routeData='hi';
      //  console.log(this.routeData);
      }
    });
  }

  logout(){
    UserStorageService.signOut();
    this.router.navigateByUrl("/");
  }

}
