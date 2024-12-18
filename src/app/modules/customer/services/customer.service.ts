import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserStorageService } from '../../../auth/services/storage/user-storage.service';
import { Observable } from 'rxjs';


const BASIC_URL = "http://localhost:8084/";

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) { }

  getRooms(pageNumber: number):Observable<any>{
    return this.http.get(BASIC_URL+`api/customer/room/${pageNumber}`,{
      headers: this.createAuthorizationHeader(),
    });
  }

  bookRoom(reservationDto: any):Observable<any>{
    return this.http.post(BASIC_URL+`api/customer/book`, reservationDto,{
      headers: this.createAuthorizationHeader(),
    });
  }

  getMyBookings(pageNumber: number):Observable<any>{
    const userId = UserStorageService.getUserId();
    return this.http.get(BASIC_URL+`api/customer/bookings/${userId}/${pageNumber}`,{
      headers: this.createAuthorizationHeader(),
    });
  }

  createAuthorizationHeader() {
    let authHeaders: HttpHeaders = new HttpHeaders();
    return authHeaders.set(
      'Authorization',
      'Bearer '+UserStorageService.getToken()
    );
  }
}
