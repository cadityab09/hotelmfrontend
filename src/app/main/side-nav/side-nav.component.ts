import { Component, Input, OnInit } from '@angular/core';
import { UserStorageService } from '../../auth/services/storage/user-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrl: './side-nav.component.css'
})
export class SideNavComponent implements OnInit {

  @Input() sideNavStatus:boolean=false;
  @Input() routeData: any;


  list:any;

  list1 = [
    {
      number: '1',
      name: 'Resister',
      icon: 'user', 
      url:"/register"
    },
    {
      number: '2',
      name: 'Login',
      icon: 'login', 
      url:"/login"
    },
  ];

  //customer
  list2 = [
    {
      number: '1',
      name: 'Rooms',
      icon: 'apartment', 
      url:"/customer/rooms"
    },
    {
      number: '2',
      name: 'Bookings',
      icon: 'pull-request', 
      url: "/customer/bookings"
    },
    {
      number: '3',
      name: 'Logout',
      icon: 'logout', 
      url:"/login"
    },
  ];

  //Admin
  list3 = [
    {
      number: '1',
      name: 'Post Rooms',
      icon: 'apartment', 
      url: "/admin/room"
    },
    {
      number: '2',
      name: 'Rooms',
      icon: 'apartment', 
      url:"/admin/dashboard"
    },
    {
      number: '3',
      name: 'Reservations',
      icon: 'pull-request', 
      url: "/admin/reservations"
    },
    {
      number: '4',
      name: 'Logout',
      icon: 'logout', 
      url:"../login"
    },
  ];

  isCustomerLoggedIn: boolean = UserStorageService.isCustomerLoggedIn();
  isAdminLoggedIn: boolean = UserStorageService.isAdminLoggedIn();

  constructor(private router: Router) {
    if(this.isAdminLoggedIn){
      this.list=this.list3;
    } else if(this.isCustomerLoggedIn){
      this.list=this.list2;
    }
  }

  ngOnInit():void {
    this.router.events.subscribe(event => {
      if(event.constructor.name === "NavigationEnd"){
        this.isCustomerLoggedIn = UserStorageService.isCustomerLoggedIn();
        this.isAdminLoggedIn = UserStorageService.isAdminLoggedIn();
        this.list=[];
        if(this.isAdminLoggedIn){
          this.list=this.list3;
        } else if(this.isCustomerLoggedIn){
          this.list=this.list2;
        }else{
          this.list=this.list1;
          console.log(this.list);
        }
        
      }
    })
  }


  NavigateUrl(url: string, name: string){
    if(name === 'Logout'){
      UserStorageService.signOut();
      alert('out');

      this.isCustomerLoggedIn = false;
      this.isAdminLoggedIn = false;
      this.list = this.list1;

      this.router.navigateByUrl('/login').then(() => {
        // Additional action after navigation if needed
        console.log('Redirected to login after logout');
      });
    }
    else{
      this.router.navigateByUrl(url);
    }
  }
}
