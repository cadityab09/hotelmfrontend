import { Component } from '@angular/core';
import { CustomerService } from '../../../services/customer.service';
import { EventService } from '../../../../../app-services/event.service';

@Component({
  selector: 'app-view-bookings',
  templateUrl: './view-bookings.component.html',
  styleUrl: './view-bookings.component.css'
})
export class ViewBookingsComponent {

  static currentPage = 1;
  total: any;
  reservations: any;

  constructor(
    private customerService: CustomerService,
    private eventService: EventService,
  ) {
    this.getMyBookings();
  }

  getMyBookings() {
    this.customerService.getMyBookings(ViewBookingsComponent.currentPage-1).subscribe(res=>{
      this.eventService.emitSnackEvent("The reservations fetch successfully!");
      console.log(res);
      this.reservations = res.reservationDtoList;
      this.total = res.totalPages;
    }, error => {
      this.eventService.emitSnackEvent("The error occure while fetching reservations!");
    });
  }

  getCurrentPage():number{
    return ViewBookingsComponent.currentPage;
  }

  pageIndexChange(newPage: number) {
    console.log(newPage);
    if (newPage > 0 && newPage <= this.total) {
      ViewBookingsComponent.currentPage = newPage;
     this.getMyBookings();
      // Add any logic to fetch data for the new page
    }
  }

  totalPagesArray() {
    return Array(this.total).fill(0).map((x, i) => i + 1);
  }

}
