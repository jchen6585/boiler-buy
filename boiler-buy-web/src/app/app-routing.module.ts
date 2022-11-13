import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CreateComponent } from './create/create.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { RegisterComponent } from './register/register.component';
import { ProductSearchComponent } from './product-search/product-search.component';
import { ProfileComponent } from './profile/profile.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { ChangeUsernameComponent } from './change-username/change-username.component';
import { SellerReviewComponent } from './seller-review/seller-review.component';
import { LoginComponent } from './login/login.component';
import { PurchaseHistoryComponent } from './purchase-history/purchase-history.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { UserWishlistComponent } from './user-wishlist/user-wishlist.component';
import { UserShopComponent } from './user-shop/user-shop.component';
import { ChangeProfilePicComponent } from './change-profile-pic/change-profile-pic.component';
import { ShopHistoryViewComponent } from './shop-history-view/shop-history-view.component';

const routes: Routes = [
  { path: 'register', component: RegisterComponent},
  { path: 'create', component: CreateComponent},
  { path: 'products/search', component: ProductSearchComponent},
  { path: 'profile', component: ProfileComponent },
  { path: 'change-password', component: ChangePasswordComponent},
  { path: 'edit/:id', component: EditProductComponent},
  { path: 'change-username', component: ChangeUsernameComponent},
  { path: 'sellerReview/:id', component: SellerReviewComponent},
  { path: 'login', component: LoginComponent},
  { path: 'products/:id', component: ProductDetailsComponent},
  { path: 'profile/purchase-history', component: PurchaseHistoryComponent },
  { path: 'wishlist/:id', component: UserWishlistComponent},
  { path: 'shop/:id', component: UserShopComponent},
  { path: 'change-profile-pic', component: ChangeProfilePicComponent},
  { path: 'shop/:id/history', component: ShopHistoryViewComponent}
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }