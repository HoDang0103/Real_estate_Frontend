import { Component } from '@angular/core';

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
  cartItems: any[]= [];
  loginModelClass: string = '';
  modal = document.getElementById('login');

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

  }
  closeLogin() {

  }


// When the user clicks anywhere outside of the modal, close it
// window.onclick = function(event) {
//     if (event.target == modal) {
//         modal.style.display = "none";
//     }
// }
  
}
