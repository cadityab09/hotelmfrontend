import { Component } from '@angular/core';
import { AdminService } from '../../admin-services/admin.service';
import { error } from '@ant-design/icons-angular';
import { Router } from '@angular/router';
import { EventService } from '../../../../app-services/event.service';
import { NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  static currentPage = 1;
  rooms = [];
  total:any;

  constructor(private adminService: AdminService, private router: Router,private eventService:EventService,
    private modalService:NzModalService
  ) {
    this.getRooms();
  }


  getCurrentPage():number{
    return DashboardComponent.currentPage;
  }

  getRooms(){
    this.adminService.getRooms(DashboardComponent.currentPage-1).subscribe(res=>{
      console.log(res);
      this.rooms=res.roomDtoList;
      this.total=res.totalPages * 1;
    })
  }

  editRoom(room){
    this.router.navigateByUrl(`/room/${room.id}/edit`)
  }

  showConfirm(roomId: number){
    this.modalService.confirm({
      nzTitle: 'Confirm',
      nzContent: 'Do you want to delete these room?',
      nzOkText: 'Delete',
      nzCancelText: 'Cancel',
      nzOnOk: () => this.deleteRoom(roomId),
    });
  }

  deleteRoom(roomId: number) {

    this.adminService.deleteRoom(roomId).subscribe(res=> {
      this.eventService.emitSnackEvent("Room deleted successfully");
      this.getRooms();
      if(this.rooms.length==0 && DashboardComponent.currentPage>1){
        DashboardComponent.currentPage=DashboardComponent.currentPage-1;
        this.getRooms();
      }
    }, error => {
      this.eventService.emitSnackEvent("Error WHile deleting room");
    });
  }
  
  totalPagesArray() {
    return Array(this.total).fill(0).map((x, i) => i + 1);
  }

  pageIndexChange(newPage: number) {
    console.log(newPage);
    if (newPage > 0 && newPage <= this.total) {
      DashboardComponent.currentPage = newPage;
     this.getRooms();
      // Add any logic to fetch data for the new page
    }
  }
  
}
