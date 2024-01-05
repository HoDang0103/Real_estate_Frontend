import { Component, ViewChild } from '@angular/core';
import { ProvinceService } from './services/province/province.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsComponent } from './main/products/products.component';
import { AccountService } from './services/account/account.service';
import { } from 'rxjs';
import { SuccessPopupComponent } from './main/success-popup/success-popup.component';
import { TokenService } from './services/token/token.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'Real_estate_Frontend';

  user: any = {
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
  loggedObj: any = {};
  cartItems: any[] = [];
  loginModelClass: string = '';
  modal = document.getElementById('login');
  isLogin: boolean = false;
  forgotPassword: boolean = false;
  checkPassword: string = '';
  register: boolean = false;
  isAuth: boolean = false;
  errorMessage: string = '';
  showSuccessMessage: boolean = false;
  popupTitle: string = '';
  popupMessage: string = '';
  baseUrl = "https://localhost:7015/";

  // model: any = {};
  showPassword: boolean = false;
  showCheckPassword: boolean = false;
  passwordType: string = 'password';
  checkPasswordType: string = 'password';
  isSuccess = true;



  constructor(private router: Router, private accountSrv: AccountService,
    private tokenSrv: TokenService) {
    const localData = localStorage.getItem('province');
    if (localData != null) {
      const parseObj = JSON.parse(localData);
      this.loggedObj = parseObj;
    }
  }
  ngOnInit(): void {

    this.onLogin();
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
    this.passwordType = this.showPassword ? 'text' : 'password';
  }

  toggleCheckPasswordVisibility() {
    this.showCheckPassword = !this.showCheckPassword;
    this.checkPasswordType = this.showCheckPassword ? 'text' : 'password';
  }

  selectProduct(option: Number) {
    // window.location.reload();
    this.router.navigate(['products', option]);
  }

  setForgotPassword() {
    this.forgotPassword = !this.forgotPassword;
    this.register = false;
  }

  showRegister() {
    this.isLogin = true;
    this.register = true;
  }

  onLogin() {
    // const account = {
    //   "username": this.user.userName,
    //   "password": this.user.password
    // }

    const account = {
      "username": 'hungtest2',
      "password": 'Abcd!1234'
    }

    this.accountSrv.postLogin(account).subscribe({
      next: (res: any) => {
        this.isLogin = false;
        this.isAuth = true;
        this.user.id = res.userId;
        this.tokenSrv.setAuthToken(res.token);
        this.loadInfoUser();
      },
      error: (error: any) => {
        this.errorMessage = 'Tên đăng nhập hoặc mật khẩu không đúng.'
        console.log(error);
      }
    })
    console.log(this.user);
  }

  setUser() {
    this.user.userName = '';
    this.user.email = '';
    this.user.password = '';
    this.user.phoneNumber = '';
    this.user.fullName = '';
  }
  loadInfoUser() {
    this.accountSrv.getCurrenUser().subscribe((Res: any) => {
      this.user.typeAccount = Res.typeAccount;
      this.user.surplus = Res.surplus;
      this.user.promotion = Res.promotion;
      this.user.img = this.baseUrl + Res.image;
      this.user.fullName = Res.fullName;
      this.user.email = Res.email;
      this.user.phoneNumber = Res.phoneNumber;
      this.tokenSrv.setInfoUser(this.user.id, this.user.userName, this.user.password, this.user.email, this.user.phoneNumber, this.user.fullName
        ,this.user.img,this.user.typeAccount,this.user.surplus,this.user.promotion);
    });
    

  }

  onRegister() {
    const account = {
      "username": this.user.userName,
      "email": this.user.email,
      "password": this.user.password,
      "phoneNumber": this.user.phoneNumber,
      "fullName": this.user.fullName
    }

    this.accountSrv.postRegister(account).subscribe({
      next: (res: any) => {
        this.popupMessage = 'Đăng ký thành công!';
        this.showLogin();
        this.showSuccessMessage = true;
        this.isSuccess = true;
        this.setUser();

        setTimeout(() => {
          this.showSuccessMessage = false;
        }, 3000); // 3 giây
      },
      error: (error: any) => {
        this.showSuccessMessage = true;
        this.isSuccess = false;
        this.popupMessage = 'Đăng ký thất bại.'
      }
    })
  }

  closeCustomPopup(): void {
    // Đặt showCustomPopup thành false khi đóng popup
    this.showSuccessMessage = false;
  }

  showLogin() {
    this.isLogin = true;
    this.register = false;
    this.errorMessage = '';

  }
  closeLogin() {
    this.isLogin = false;
  }



}
function getProvinces() {
  throw new Error('Function not implemented.');
}

