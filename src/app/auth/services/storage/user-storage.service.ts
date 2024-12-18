import { Injectable } from '@angular/core';

const TOKEN = 'token';
const USER = 'user';


@Injectable({
  providedIn: 'root'
})
export class UserStorageService {

  constructor() { }

  static saveToken(token: string) {
    window.localStorage.removeItem(TOKEN);
    window.localStorage.setItem(TOKEN, token);
  }

  static saveUser(user: any) {
    window.localStorage.removeItem(USER);
    window.localStorage.setItem(USER, JSON.stringify(user));
  }

  static getToken(): string | null{
    return localStorage.getItem(TOKEN);
  }

  static getUser(): any{
    return JSON.parse(localStorage.getItem(USER)!);
  }

  static getUserId(): String{
    const user = this.getUser();
    if(user==null) return '';
    return user.id;
  }

  static getUserRole(): String{
    const user = this.getUser();
    if(user==null) return '';
    return user.role;
  }

  static isAdminLoggedIn(): boolean {
    if(this.getToken == null){
      return false;
    }
    const role = this.getUserRole();
    console.log(role);
    return role === 'ADMIN';
  }

  static isCustomerLoggedIn(): boolean {
    if(this.getToken == null){
      return false;
    }
    const role = this.getUserRole();
    return role === 'CUSTOMER';
  }

  static signOut(): void{
    window.localStorage.removeItem(TOKEN);
    window.localStorage.removeItem(USER);
  }
}
