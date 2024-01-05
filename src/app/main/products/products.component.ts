import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product/product.service';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ProvinceService } from 'src/app/services/province/province.service';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  providers: [DatePipe]  // Thêm DatePipe vào trường providers của component
})

export class ProductsComponent implements OnInit {

  productsArray: any[] = [];
  saleArray: any[] = [];
  rentArray: any[] = [];
  categories: any[] = [];
  selectedCategory: number = 0;
  loggedObj: any = {};

  title = 'pagination';
  POSTS: any;
  page: number = 1;
  count: number = 0;
  tableSize: number = 6;
  test: string = '';
  isSale = true;
  price: number = 0;
  acreage: number = 0;
  districtArray: any[] = [];
  select: number = 0;

  optionsArea: string = '';
  optionPrice: string = '';
  optionAcreage: string = '';
  optionsType: string = '';
  search: string = '';
  value: string = '';


  baseUrl = "https://localhost:7015/";



  constructor(private productSrv: ProductService, private datePipe: DatePipe,
    private router: Router, private provincesSvr: ProvinceService, private route: ActivatedRoute) {
    const localData = localStorage.getItem('Story');
    if (localData != null) {
      const parseObj = JSON.parse(localData);
      this.loggedObj = parseObj;
    }
  }


  ngOnInit(): void {

    const selectdParam = this.route.snapshot.paramMap.get('select');
    this.select = selectdParam !== null ? +selectdParam : 0;
    this.loadSaleProducts();
    this.loadRentProducts();
    this.loadDistrict();
    console.log("Haha");
  }


  loadSaleProducts() {
    this.productSrv.getAllSaleProducts().subscribe((Res: any) => {
      this.saleArray = Res;
      this.saleArray = this.saleArray.map(products => ({
        ...products,
        startDate: this.datePipe.transform(products.startDate, 'dd/MM/yyyy'),
        user: {
          ...products.user,
          image: products.user.image !== null ? this.baseUrl + products.user.image : "/assets/images/avtDefault.jpg"
        }
      }))
      this.productsArray = this.saleArray;
    });

  }

  loadRentProducts() {
    this.productSrv.getAllRentProducts().subscribe((Res: any) => {
      this.rentArray = Res;
      this.rentArray = this.rentArray.map(products => ({
        ...products,
        startDate: this.datePipe.transform(products.startDate, 'dd/MM/yyyy'),
        user: {
          ...products.user,
          image: products.user.image !== null ? this.baseUrl + products.user.image : "/assets/images/avtDefault.jpg"
        }
      }))
    });

  }

  loadDistrict() {
    this.provincesSvr.getDistricts().subscribe((Res: any) => {
      this.districtArray = Res.results;
    })
  }

  onTableDataChange(event: any): void {
    this.page = event;
    window.scrollTo({ top: 0 });
  }

  searchData() {
    if (this.search) {
      this.value ='Title=' + encodeURIComponent(this.search)+'&';

    }

    if (this.isSale == true) {
      this.productSrv.getSearchSale(this.value).subscribe((Res: any) => {
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
    else {
      this.productSrv.getSearchRent(this.value).subscribe((Res: any) => {
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
    this.value = '';
  }



  redirectToProductDetail(productId: number) {
    this.router.navigate(['/product-detail', productId]);
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

  searchAll() {



    // if (this.optionsType) {
    //   this.value += 'Title='+encodeURIComponent(this.search)+'&';
    // }
    if (this.acreage) {
      switch (this.acreage) {
        case 1: {
          this.value += 'MaxArea=' + '30' + '&';
          break;
        }
        case 30: {
          this.value += 'MinArea=' + '30' + '&' + 'MaxArea=' + '50' + '&';
          break;
        }
        case 50: {
          this.value += 'MinArea=' + '50' + '&' + 'MaxArea=' + '80' + '&';
          break;
        }
        case 80: {
          this.value += 'MinArea=' + '80' + '&' + 'MaxArea=' + '100' + '&';
          break;
        }
        case 100: {
          this.value += 'MinArea=' + '100' + '&' + 'MaxArea=' + '150' + '&';
          break;
        }
        case 150: {
          this.value += 'MinArea=' + '150' + '&' + 'MaxArea=' + '200' + '&';
          break;
        }
        case 200: {
          this.value += 'MinArea=' + '200' + '&' + 'MaxArea=' + '250' + '&';
          break;
        }
        case 250: {
          this.value += 'MinArea=' + '250' + '&' + 'MaxArea=' + '300' + '&';
          break;
        }
        case 300: {
          this.value += 'MinArea=' + '300' + '&' + 'MaxArea=' + '500' + '&';
          break;
        }
        case 500: {
          this.value += 'MinArea=' + '500' + '&';
          break;
        }
        default: {
          break;
        }
      }
    }

    if (this.price) {
      switch (this.price) {
        case 1: {
          this.value += 'MaxPrice=' + '5' + '&';
          break;
        }
        case 5: {
          this.value += 'MinPrice=' + '5' + '&' + 'MaxPrice=' + '10' + '&';
          break;
        }
        case 10: {
          this.value += 'MinPrice=' + '10' + '&' + 'MaxPrice=' + '50' + '&';
          break;
        }
        case 50: {
          this.value += 'MinPrice=' + '50' + '&' + 'MaxPrice=' + '100' + '&';
          break;
        }
        case 100: {
          this.value += 'MinPrice=' + '100' + '&' + 'MaxPrice=' + '200' + '&';
          break;
        }
        case 200: {
          this.value += 'MinPrice=' + '200' + '&' + 'MaxPrice=' + '500' + '&';
          break;
        }
        case 500: {
          this.value += 'MinPrice=' + '500' + '&' + 'MaxPrice=' + '800' + '&';
          break;
        }
        case 800: {
          this.value += 'MinPrice=' + '800' + '&' + 'MaxPrice=' + '1000' + '&';
          break;
        }
        case 1000: {
          this.value += 'MinPrice=' + '1' + '&' + 'MaxPrice=' + '2' + '&';
          break;
        }
        case 2000: {
          this.value += 'MinPrice=' + '2' + '&' + 'MaxPrice=' + '5' + '&';
          break;
        }
        case 5000: {
          this.value += 'MinPrice=' + '5' + '&' + 'MaxPrice=' + '7' + '&';
          break;
        }
        case 7000: {
          this.value += 'MinPrice=' + '7' + '&';
          break;
        }
        default: {
          break;
        }
      }
    }

    if (this.optionsArea) {
      this.value += 'District=' + encodeURIComponent(this.optionsArea.toLowerCase()) + '&';
    }

    if (this.isSale == true) {
      this.productSrv.getSearchSale(this.value).subscribe((Res: any) => {
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
    else {
      this.productSrv.getSearchRent(this.value).subscribe((Res: any) => {
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

    this.value = '';
  }

  reSearch() {
    this.search = '';
    this.optionsType = '';
    this.optionsArea = '';
    this.optionPrice = '';
    this.optionAcreage = '';

  }
  sale() {
    this.isSale = true;
    this.productsArray = this.saleArray;
  }
  noSale() {
    this.isSale = false;
    this.productsArray = this.rentArray;


  }

  toggleOptionType(option: string): void {


    this.optionsType = option;
    console.log(encodeURIComponent(this.optionsType));

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
