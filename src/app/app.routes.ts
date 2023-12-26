import { Input, NgModule } from "@angular/core";
import { NgModel } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { ProductsComponent } from "./main/products/products.component";
import { CheckoutComponent } from "./main/checkout/checkout.component";

const routes: Routes = [
    {
        path: 'products', component: ProductsComponent
    },
    {
        path: 'checkout', component: CheckoutComponent
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }

