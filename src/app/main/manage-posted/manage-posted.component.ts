import { Component } from '@angular/core';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-manage-posted',
  templateUrl: './manage-posted.component.html',
  styleUrls: ['./manage-posted.component.css'],
})
export class ManagePostedComponent {
  isRePost!: boolean;

  activeTab = 'all';

  items: any[] = [
    { id: 1, name: 'Item 1' },
    { id: 2, name: 'Item 2' },
    { id: 3, name: 'Item 3' },
  ];

  product: any[] = [];
  productOver: any[] = [];

  ngOnInit() {
    this.ProductSrv.getAllStoryCurrentUser().subscribe({
      next: (Res: any) => {
        this.product = Res;
        console.log(this.product);
      },
      error: (err: any) => {
        console.log(err);
      },
    });
    this.ProductSrv.GetAllExpiredStoryCurrentUser().subscribe({
      next: (Res: any) => {
        this.productOver = Res;
      },
      error: (err: any) => {},
    });
    this.isRePost = false;
  }

  constructor(private ProductSrv: ProductService) {}

  allPosts(activeTab: any) {
    this.activeTab = activeTab;
  }

  expiredPosts(activeTab: any) {
    this.activeTab = activeTab;
  }

  handleClickEvent() {
    console.log('Button in child component clicked');
    // Xử lý logic tại đây khi sự kiện được nhận từ phần tử con
    this.isRePost = true;
  }
}
