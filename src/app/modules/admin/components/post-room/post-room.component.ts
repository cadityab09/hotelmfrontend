import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from '../../admin-services/admin.service';
import { error } from '@ant-design/icons-angular';
import { SnackbarComponent } from '../../../../popup/snackbar/snackbar.component';
import { EventService } from '../../../../app-services/event.service';

@Component({
  selector: 'app-post-room',
  templateUrl: './post-room.component.html',
  styleUrl: './post-room.component.css'
})
export class PostRoomComponent {
  roomDetailsForm: FormGroup;
  // @Output() showSnack = new EventEmitter<String>();

  constructor(private fb: FormBuilder,
    private router: Router,
    private adminService: AdminService,
    private eventService: EventService
  ){
    this.roomDetailsForm = this.fb.group({
      name: ['', Validators.required],
      type: ['', Validators.required],
      price: ['', Validators.required],
    })
  }

  submitForm(){
    this.adminService.postRoom(this.roomDetailsForm.value).subscribe(res => {
      this.eventService.emitSnackEvent('Room posted successfully');
    }, error => {
      this.eventService.emitSnackEvent('Error occured while posting room');
    })
  }
}
