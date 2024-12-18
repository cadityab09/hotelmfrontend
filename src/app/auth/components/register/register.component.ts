import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { EventService } from '../../../app-services/event.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  registerForm!: FormGroup;
  message = '';
  showMessage = false;


  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private eventService: EventService,
  ) { }

  ngOnInit() {
    this.registerForm = this.fb.group({
      email: [null, [Validators.email, Validators.required]],
      password: [null, [Validators.required]],
      name: [null, [Validators.required]]
    });
  }

  submitForm() {
    // alert(this.registerForm.value.email);
    try {
      this.authService.register(this.registerForm.value).pipe(
        catchError(error => {
          this.eventService.emitSnackEvent("Error occurred during registration "+(error.status));
          console.error('Registration error:', error);
          return throwError(error);
        })
      ).subscribe(res => {
        if (res.id != null) {
          this.eventService.emitSnackEvent("Register successfull");
          this.router.navigateByUrl("/");
        }
        else {
          this.eventService.emitSnackEvent("Error to sign up");
        }
      });
    } catch(error){
      this.eventService.emitSnackEvent("Error to sign up");
    }
    // this.showNotification("eroot");
  }
}
