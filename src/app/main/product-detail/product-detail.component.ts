import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product/product.service';
import { ActivatedRoute, Route } from '@angular/router';


@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
  providers: [DatePipe]  // Thêm DatePipe vào trường providers của component
})
export class ProductDetailComponent implements OnInit {
  product: any = {};
  loggedObj: any = {};
  images: string[] = [];
  productId: number = 0;
  selectedIndex: number = 0;
  indicators = true;
  userName! : string;
  imgLink!:string;
  phoneNumber!: string;

  baseUrl = "https://localhost:7015/";
  constructor(private productSrv: ProductService, private datePipe: DatePipe, private route: ActivatedRoute) {
    const localData = localStorage.getItem('Story');
    if (localData != null) {
      const parseObj = JSON.parse(localData);
      this.loggedObj = parseObj;
    }
  }
  ngOnInit(): void {
    const productIdParam = this.route.snapshot.paramMap.get('productId');
    this.productId = productIdParam !== null ? +productIdParam : 0;

    this.loadProducts();
    

  }
  loadProducts() {
    this.productSrv.getProduct(this.productId).subscribe((Res: any) => {
      this.product = Res;
      this.product.startDate = this.datePipe.transform(this.product.startDate, 'dd/MM/yyyy');
      this.product.endDate = this.datePipe.transform(this.product.endDate, 'dd/MM/yyyy');
      console.log(this.product);

      if(this.product.user.fullName !== null){
        this.userName = this.product.user.fullName;
      }else{
        this.userName = "ADMIN";
      }
      if(this.product.user.image !== null){
        this.imgLink = this.baseUrl + this.product.user.image;
        console.log(this.imgLink);
      }else{
        this.imgLink = "../../../assets/images/postimgdefault.jpg";
      }
      if(this.product.user.phoneNumber !== null){
        this.phoneNumber = this.product.user.phoneNumber;
      }else{
        this.phoneNumber = "Không có số";
      }
    })
  }
  selectImage(index: number) {
    this.selectedIndex = index;
  }
}
