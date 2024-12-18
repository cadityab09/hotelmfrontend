import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { UserStorageService } from '../../services/storage/user-storage.service';
import { EventService } from '../../../app-services/event.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {


  loginForm!: FormGroup;
  message = '';
  showMessage = false;


  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private router:Router, 
    private eventService:EventService,
  ){}

  ngOnInit(){
    this.loginForm = this.fb.group({
      email: [null, [Validators.required,Validators.email]],
      password: [null, [Validators.required]]
    })
  }

  submitForm(){
    this.authService.login(this.loginForm.value).pipe(
      catchError(error => {
        this.eventService.emitSnackEvent("Error occurred during registration "+(error.status));
        console.error('Registration error:', error);
        return throwError(error);
      })
    ).subscribe(res => {
      this.eventService.emitSnackEvent("Login Successfull");
      console.log(res);

      if(res.userId != null){
        console.log(res);
        const user = {
          id: res.userId,
          role: res.userRole
        }

        console.log(user.role);
        UserStorageService.saveUser(user);
        UserStorageService.saveToken(res.jwt);
        
        if(UserStorageService.isAdminLoggedIn()){
          this.router.navigateByUrl('/admin/dashboard');
        }
        else if(UserStorageService.isCustomerLoggedIn()){
          this.router.navigateByUrl('/customer/rooms');
        }
      }

    });
  }
}
