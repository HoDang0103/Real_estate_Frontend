import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }
  private authToken: string | null = null;
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
    this.authToken = token;
  }

  getAuthToken(): string | null {
    return this.authToken;
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
    console.log(this.user);
  }
  getInfoUser() {
    return this.user;
  }
}
