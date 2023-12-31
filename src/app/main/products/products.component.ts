import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product/product.service';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  providers: [DatePipe]  // Thêm DatePipe vào trường providers của component
})

export class ProductsComponent implements OnInit {

  productsArray: any[] = [];
  categories: any[] = [];
  selectedCategory: number = 0;
  loggedObj: any = {};

  title = 'pagination';
  POSTS: any;
  page: number = 1;
  count: number = 0;
  tableSize: number = 6;
  test: string = '';

  baseUrl = "https://localhost:7015/";

  constructor(private productSrv: ProductService, private datePipe: DatePipe, private router: Router) {
    const localData = localStorage.getItem('Story');
    if (localData != null) {
      const parseObj = JSON.parse(localData);
      this.loggedObj = parseObj;
    }
  }


  ngOnInit(): void {
    this.loadProducts();
    this.loadCategory();
  }
  loadProducts() {
    this.productSrv.getAllProducts().subscribe((Res: any) => {
      this.productsArray = Res;
      this.productsArray = this.productsArray.map(products => ({
        ...products,
        startDate: this.datePipe.transform(products.startDate, 'dd/MM/yyyy'),
        user: {
          ...products.user,
          image: products.user.image !== null ? this.baseUrl + products.user.image : "/assets/images/avtDefault.jpg"

        }
      }))
    });

  }

  onTableDataChange(event: any): void {
    this.page = event;
    window.scrollTo({top :0});
    this.loadProducts();
  }

  onTableSizeChange(event: any) {
    this.tableSize = event.target.value;
    this.page = 1;
    this.loadProducts();
  }

  redirectToProductDetail(productId: number) {
    this.router.navigate(['/product-detail', productId]);
  }


  loadCategory() {
    // this.productSrv.getAllCategory().subscribe((Res: any) =>{
    //   this.categories = Res.data;
    // })
  }

  addtocart(producId: number) {
    // if(this.loggedObj.custId == undefined) {
    //   this.productSrv.showLogin.next(true);
    // } else {
    //   const obj = {
    //     "CartId": 0,
    //     "CustId": this.loggedObj.custId,
    //     "ProductId": producId,
    //     "Quantity": 1,
    //     "AddedDate": new Date()
    //   }
    //   this.productSrv.addtoCart(obj).subscribe((res: any)=> {
    //     if(res.result) {
    //       alert("Product Added to Cart"); 
    //       this.productSrv.cartUpdated.next(true);
    //     } else {
    //       alert(res.message)
    //     }
    //   }) 
    // }
    // debugger;

  }




}
