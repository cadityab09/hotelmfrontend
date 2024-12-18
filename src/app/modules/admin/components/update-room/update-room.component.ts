import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from '../../../../app-services/event.service';
import { AdminService } from '../../admin-services/admin.service';

@Component({
  selector: 'app-update-room',
  templateUrl: './update-room.component.html',
  styleUrl: './update-room.component.css'
})
export class UpdateRoomComponent {


  updateRoomForm: FormGroup;
  id:any;

  constructor(private fb: FormBuilder,
    private router: Router,
    private adminService: AdminService,
    private eventService: EventService,
    private activatedRoute: ActivatedRoute
  ){
    this.id= this.activatedRoute.snapshot.params['id'];
    this.updateRoomForm = this.fb.group({
      name: ['', Validators.required],
      type: ['', Validators.required],
      price: ['', Validators.required],
    });
    this.getRoomById();
  }

  submitForm(){
    this.adminService.updateRoom(this.id, this.updateRoomForm.value).subscribe(res => {
      this.eventService.emitSnackEvent('Room updated successfully');
      this.router.navigateByUrl(`/admin/dashboard`);
    }, error => {
      this.eventService.emitSnackEvent('Error occured while updating room');
    })
  }

  getRoomById(){
    this.adminService.getRoomById(this.id).subscribe(res=>{
        this.updateRoomForm.patchValue(res);
    }, error => {
      this.eventService.emitSnackEvent('Error occured while getting room details');
    })
  }
}
