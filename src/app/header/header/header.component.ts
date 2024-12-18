import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  @Output() sideNavToggled = new EventEmitter<boolean>();
  menuStatus: boolean=false;

  constructor() {}

  ngOnInit() {
    
  }

  sideNavtoggle() {
    this.menuStatus=!this.menuStatus;
    this.sideNavToggled.emit(this.menuStatus);
  }

}
