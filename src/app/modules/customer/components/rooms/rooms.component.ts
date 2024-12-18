import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { Router } from '@angular/router';
import { EventService } from '../../../../app-services/event.service';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserStorageService } from '../../../../auth/services/storage/user-storage.service';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrl: './rooms.component.css'
})
export class RoomsComponent implements OnInit {
  @ViewChild('confirmModalContent', { static: true }) confirmModalContent!: TemplateRef<any>

  confirmModal?: NzModalRef;  // Store reference to the modal

  static currentPage = 1;
  rooms = [];
  total:any;

  constructor(private customerService: CustomerService, private router: Router,private eventService:EventService,
    private modalService:NzModalService,
    private fb: FormBuilder
  ) {
    this.getRooms();
    this.myGroup = this.fb.group({
      startDate: [null, Validators.required],
      endDate: [null, Validators.required],
    });

    this.myGroup.valueChanges.subscribe(() => this.checkDates());
  }

  checkDates(): boolean {
    return this.myGroup.get('startDate')?.value && this.myGroup.get('endDate')?.value;
  }

  ngOnInit(): void {
    // Initialize form group
    this.myGroup = this.fb.group({
      startDate: [''],
      endDate: ['']
    });
  }


  getCurrentPage():number{
    return RoomsComponent.currentPage;
  }

  getRooms(){
    this.customerService.getRooms(RoomsComponent.currentPage-1).subscribe(res=>{
      console.log(res);
      this.rooms=res.roomDtoList;
      this.total=res.totalPages * 1;
    })
  }

  totalPagesArray() {
    return Array(this.total).fill(0).map((x, i) => i + 1);
  }
  
  pageIndexChange(newPage: number) {
    console.log(newPage);
    if (newPage > 0 && newPage <= this.total) {
      RoomsComponent.currentPage = newPage;
     this.getRooms();
      // Add any logic to fetch data for the new page
    }
  }

  toggleIcon(event: Event): void {
    const icon = event.target as HTMLElement;
  
    if (icon) {
      icon.classList.toggle('active-color');          // Toggle color class
      icon.classList.toggle('bi-check-square-fill');   // Toggle filled icon class
      icon.classList.toggle('bi-check-square'); 
    } else {
      console.error('Icon element not found');
    }
  }

  myGroup: FormGroup;


  showConfirm(roomId: number, confirmModalContent: TemplateRef<any>, event: Event){
    console.log(roomId);

    this.confirmModal = this.modalService.create({
      nzTitle: 'Book room',
      nzContent: confirmModalContent,
      nzOkText: 'Ok',
      nzCancelText: 'Cancel',
      nzOkDisabled: true,  // Initially disabled
      nzOnOk: () => this.bookRoom(roomId, event),
    });

    this.confirmModal.afterOpen.subscribe(() => this.watchDateChanges());

  }

  watchDateChanges() {
    // Watch for changes and update the nzOkDisabled
    this.myGroup.valueChanges.subscribe(() => {
      const startDate = this.myGroup.get('startDate')?.value;
      const endDate = this.myGroup.get('endDate')?.value;
      const isOkDisabled = !(startDate && endDate);
      // Update nzOkDisabled dynamically
      this.confirmModal?.updateConfig({
        nzOkDisabled: isOkDisabled
      });
    });
  }

  isOkDisabled(): boolean {
    return !this.myGroup.get('startDate')?.value || !this.myGroup.get('endDate')?.value;
  }

  bookRoom(roomId, event: Event){
    console.log(roomId);
    const obj = {
      userId: UserStorageService.getUserId(),
      roomId: roomId,
      checkInDate: this.myGroup.get('startDate')?.value,
      checkOutDate: this.myGroup.get('endDate')?.value,
    };

    this.customerService.bookRoom(obj).subscribe(res=>{
      this.eventService.emitSnackEvent("The request is submitted for approval. ");
      this.toggleIcon(event);
      this.myGroup.reset();
    }, error=>{
      this.eventService.emitSnackEvent("The error occured while booking the room ");
      this.myGroup.reset();
    });
  }
}
