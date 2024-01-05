import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private tokenSubject = new BehaviorSubject<string>("");
  
  private authToken: string | null;

  constructor() {
    this.authToken = localStorage.getItem('token'); 
    if (this.authToken) {
      this.tokenSubject.next(this.authToken);
    }
   }
  private user: any = {
    id: '',
    userName: '',
    password: '',
    email: '',
    phoneNumber: '',
    fullName: '',
    img: '',
    typeAccount: '',
    surplus: 0,
    promotion: 0,
  }
  setAuthToken(token: string): void {
    localStorage.removeItem('token');
    localStorage.setItem('token', token);
    this.authToken = token;
  }

  getAuthToken(): string |null {
    const temp = this.authToken;
     return temp;
    // return "hihi";
  }

  setInfoUser(id: string, userName: string, password: string, email: string, phoneNumber: string, fullName: string, img: string, typeAccount: string
    , surplus: number, promotion: number) {
    this.user.id = id;
    this.user.userName = userName;
    this.user.password = password;
    this.user.email = email;
    this.user.phoneNumber = phoneNumber;
    this.user.fullName = fullName;
    this.user.img = img;
    this.user.typeAccount = typeAccount;
    this.user.surplus = surplus;
    this.user.promotion = promotion;
  }
  getInfoUser() {
    return this.user;
  }
}
