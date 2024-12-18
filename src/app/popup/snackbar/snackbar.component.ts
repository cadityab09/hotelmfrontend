import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { EventService } from '../../app-services/event.service';

@Component({
  selector: 'app-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrl: './snackbar.component.css'
})
export class SnackbarComponent implements OnChanges {
  @Input() snackMessage: String;
  @Input() snackState: boolean;
  message:String = '';
  showMessage = false;

  constructor(private eventService: EventService) {}

  showNotification(message: String) {
    this.message = message;
    this.showMessage = true;
    console.log(message);
    setTimeout(() => {
      this.showMessage = false;
    }, 3000);
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(this.snackMessage=='');
    if(this.snackMessage){
      this.showNotification(this.snackMessage);
    }
  }

  ngOnInit(){
    this.eventService.snackEvent$.subscribe(message => {
      this.showNotification(message);
    });
  }

}
