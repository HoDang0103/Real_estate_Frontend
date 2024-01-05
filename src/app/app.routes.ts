import { Component, Input, NgModule } from '@angular/core';
import { NgModel } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './main/products/products.component';
import { CheckoutComponent } from './main/checkout/checkout.component';
import { ProductDetailComponent } from './main/product-detail/product-detail.component';
import { AccountManagerComponent } from './main/account-manager/account-manager.component';
import { SuccessComponent } from './main/success/success.component';
import { ManagePostedComponent } from './main/manage-posted/manage-posted.component';
import { PostInformationComponent } from './main/post-information/post-information.component';

const routes: Routes = [
  {
    path: '',
    component: ProductsComponent,
  },
  {
    path: 'products/:select',
    component: ProductsComponent,
  },
  {
    path: 'checkout',
    component: CheckoutComponent,
  },
  {
    path: 'product-detail/:productId',
    component: ProductDetailComponent,
  },
  {
    path: 'account-manager',
    component: AccountManagerComponent,
  },
  {
    path: 'success',
    component: SuccessComponent,
  },
  {
    path: 'manage-posted',
    component: ManagePostedComponent,
  },
  {
    path: 'post-information-detail/:postId',
    component: PostInformationComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
