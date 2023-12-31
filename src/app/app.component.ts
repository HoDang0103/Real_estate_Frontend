import { Component } from '@angular/core';
import { ProvinceService } from './services/province/province.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'Real_estate_Frontend';

  registerObj: any = {
    "CustId": 0,
    "Name": "",
    "MobileNo": "",
    "Password": ""
  }
  loginObj: any = {
    "UserName": "",
    "UserPassword": ""
  }
  loggedObj: any = {};
  cartItems: any[] = [];
  districtArray: any[] = [];
  loginModelClass: string = '';
  modal = document.getElementById('login');
  isLogin: boolean = false;
  isSale = false;

  optionsType = [
    { value: 'Căn hộ chung cư', selected: false },
    { value: 'Nhà riêng', selected: false },
    { value: 'Nhà mặt phố', selected: false },
    { value: 'Đất', selected: false },
    { value: 'Nhà mặt phố', selected: false },
    { value: 'Khác', selected: false }
    // Thêm các tùy chọn khác nếu cần
  ];

  optionsArea: string = '';
  optionPrice: string = '';
  optionAcreage: string = '';
  price: number = 0;
  acreage: number = 0;
  // model: any = {};
  password: string = '';
  showPassword: boolean = false;
  passwordType: string = 'password';



  selectedOptionsType: string[] = [];

  constructor(private provincesSvr: ProvinceService) {
    const localData = localStorage.getItem('province');
    if (localData != null) {
      const parseObj = JSON.parse(localData);
      this.loggedObj = parseObj;
    }
  }
  ngOnInit(): void {
    this.loadDistrict();
  }

  toggleOptionType(index: number): void {
    this.optionsType[index].selected = !this.optionsType[index].selected;

    if (this.optionsType[index].selected) {
      this.selectedOptionsType.push(this.optionsType[index].value);
    } else {
      const indexOfSelected = this.selectedOptionsType.indexOf(this.optionsType[index].value);
      if (indexOfSelected !== -1) {
        this.selectedOptionsType.splice(indexOfSelected, 1);
      }
    }
  }
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
    this.passwordType = this.showPassword ? 'text' : 'password';
  }

  toggleOptionPrice(price: number): void {
    this.price = price;
    switch (price) {
      case 1: {
        this.optionPrice = 'Dưới 5 triệu';
        break;
      }
      case 5: {
        this.optionPrice = '5 - 10 triệu';
        break;
      }
      case 10: {
        this.optionPrice = '10 - 50 triệu';
        break;
      }
      case 10: {
        this.optionPrice = '10 - 50 triệu';
        break;
      }
      case 50: {
        this.optionPrice = '50 - 100 triệu';
        break;
      }
      case 100: {
        this.optionPrice = '100 - 200 triệu';
        break;
      }
      case 200: {
        this.optionPrice = '200 - 500 triệu';
        break;
      }
      case 500: {
        this.optionPrice = '500 - 800 triệu';
        break;
      }
      case 800: {
        this.optionPrice = '800 triệu - 1 tỉ';
        break;
      }
      case 1000: {
        this.optionPrice = '1 - 2 tỉ';
        break;
      }
      case 2000: {
        this.optionPrice = '2 - 5 tỉ';
        break;
      }
      case 5000: {
        this.optionPrice = '5 - 7 tỉ';
        break;
      }
      case 7000: {
        this.optionPrice = '7 - 8 tỉ';
        break;
      }
      default: {
        this.optionPrice = '';
        break;
      }
    }
  }

  toggleOptionAcreage(acreage: number): void {
    this.acreage = acreage;
    switch (acreage) {
      case 1: {
        this.optionAcreage = 'Dưới 30 m²';
        break;
      }
      case 30: {
        this.optionAcreage = '30 - 50 m²';
        break;
      }
      case 50: {
        this.optionAcreage = '50 - 80 m²';
        break;
      }
      case 80: {
        this.optionAcreage = '80 - 100 m²';
        break;
      }
      case 100: {
        this.optionAcreage = '100 - 150 m²';
        break;
      }
      case 150: {
        this.optionAcreage = '150 - 200 m²';
        break;
      }
      case 200: {
        this.optionAcreage = '200 - 250 m²';
        break;
      }
      case 250: {
        this.optionAcreage = '250 - 300 m²';
        break;
      }
      case 300: {
        this.optionAcreage = '300 - 500 m²';
        break;
      }
      case 500: {
        this.optionAcreage = 'Trên 500 m²';
        break;
      }
      default: {
        this.optionAcreage = '';
        break;
      }
    }
  }

  toggleOptionArea(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const selectedValue = target.value;

    if (this.optionsArea == selectedValue) {
      this.optionsArea = '';
    } else {
      this.optionsArea = selectedValue;
    }
  }

  loadDistrict() {
    this.provincesSvr.getDistricts().subscribe((Res: any) => {
      this.districtArray = Res.results;
    })
  }

  // constructor(private productSrv: ProductService) {
  //   const localData = localStorage.getItem('amazon_user');
  //   if(localData != null) {
  //     const parseObj =  JSON.parse(localData);
  //     this.loggedObj = parseObj;
  //     this.getCartData(this.loggedObj.custId)
  //   }
  //   this.productSrv.cartUpdated.subscribe((res: boolean)=>{
  //     if(res) {
  //       this.getCartData(this.loggedObj.custId)
  //     }
  //   })
  //   this.productSrv.showLogin.subscribe((res: boolean)=>{
  //     if(res) {
  //        this.loginModelClass = 'show';
  //     }
  //   })
  // }

  // getCartData(id: number) {
  //   this.productSrv.getAddtocartdataByCust(id).subscribe((res: any)=>{
  //     this.cartItems = res.data;
  //   })
  // }

  onRegister() {
    // this.productSrv.register(this.registerObj).subscribe((res: any)=> {
    //   if(res.result) {
    //     this.loggedObj = res.data;
    //     alert("User Creation Done")
    //   } else {
    //     alert(res.message)
    //   }
    // })
  }
  onLogin() {
    // this.productSrv.login(this.loginObj).subscribe((res: any)=> {
    //   if(res.result) {
    //     alert("User Login Success");
    //     this.loggedObj = res.data;
    //     this.loginModelClass = '';
    //     localStorage.setItem('amazon_user', JSON.stringify(res.data));
    //     this.getCartData(this.loggedObj.custId)
    //   } else {
    //     alert(res.message)
    //   }
    // })
  }
  removeItem(cartId: number) {
    // this.productSrv.removeProductFromCart(cartId).subscribe((res: any)=> {
    //   if(res.result) {
    //     alert("Item Removed"); 
    //     this.getCartData(this.loggedObj.custId)
    //   } else {
    //     alert(res.message)
    //   }
    // })
  }
  showLogin() {
    this.isLogin = true;
  }
  closeLogin() {
    this.isLogin = false;
  }


  // When the user clicks anywhere outside of the modal, close it
  // window.onclick = function(event) {
  //     if (event.target == modal) {
  //         modal.style.display = "none";
  //     }
  // }

}
function getProvinces() {
  throw new Error('Function not implemented.');
}

