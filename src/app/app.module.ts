import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header/header.component';
import { SideNavComponent } from './main/side-nav/side-nav.component';
import { RegisterComponent } from './auth/components/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './auth/components/login/login.component';
import { NZ_ICONS, NzIconModule } from 'ng-zorro-antd/icon';
import * as AllIcons from '@ant-design/icons-angular/icons';
import { SnackbarComponent } from './popup/snackbar/snackbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


export const allIcons = Object.keys(AllIcons).map(key => AllIcons[key]);

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SideNavComponent,
    RegisterComponent,
    LoginComponent,
    SnackbarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NzIconModule,
    BrowserAnimationsModule,
  ],
  providers: [
    { provide: NZ_ICONS, useValue: allIcons }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { 
  
}
