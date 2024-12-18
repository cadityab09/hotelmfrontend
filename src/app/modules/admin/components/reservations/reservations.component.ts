import { Component } from '@angular/core';
import { AdminService } from '../../admin-services/admin.service';
import { EventService } from '../../../../app-services/event.service';
import { error } from '@ant-design/icons-angular';

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrl: './reservations.component.css'
})
export class ReservationsComponent {

  static currentPage = 1;
  total: any;
  reservations: any;

  constructor(
    private adminService: AdminService,
    private eventService: EventService,
  ) {
    this.getReservations();
  }

  getReservations() {
    this.adminService.getReservations(ReservationsComponent.currentPage-1).subscribe(res=>{
      this.eventService.emitSnackEvent("The reservations fetch successfully!");
      console.log(res);
      this.reservations = res.reservationDtoList;
      this.total = res.totalPages;
      this.reservationSort();
    }, error => {
      this.eventService.emitSnackEvent("The error occure while fetching reservations!");
    });
  }

  reservationSort() {
    let res=this.reservations;
    for(let i=0; i<this.reservations.length; i++) {
      let temp=i;
      for(let j=0; j<this.reservations.length-1; j++){
        for(let k=0; k<this.reservations.length-j-1; k++){
          if(res[k].id>res[k+1].id){
            let temp = res[k];
            res[k]=res[k+1];
            res[k+1]=temp;
          }
        }
      }
    }
    this.reservations=res; 
  }

  getCurrentPage():number{
    return ReservationsComponent.currentPage;
  }

  pageIndexChange(newPage: number) {
    console.log(newPage);
    if (newPage > 0 && newPage <= this.total) {
      ReservationsComponent.currentPage = newPage;
     this.getReservations();
      // Add any logic to fetch data for the new page
    }
  }

  totalPagesArray() {
    return Array(this.total).fill(0).map((x, i) => i + 1);
  }


  changeReservationStatus(reservationId: number, status: String) {
    this.adminService.changeReservationStatus(reservationId, status).subscribe(res => {
      this.eventService.emitSnackEvent("Reservation status is Changed successfully"+reservationId);
      this.getReservations();
    }, error => {
      this.eventService.emitSnackEvent("The error occure while changing reservation status!");
    });
  }
}
