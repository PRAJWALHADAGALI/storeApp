import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AddProductComponent } from './add-product/add-product.component';
import { DeleteItemComponent } from './delete-item/delete-item.component';
import { ProductListComponent } from './product-list/product-list.component';
import { HttpClientModule } from "@angular/common/http";

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'AddItem', component: AddProductComponent },
  { path: 'DeleteItem', component: DeleteItemComponent },
  { path: 'stock', component: ProductListComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AddProductComponent,
    DeleteItemComponent,
    ProductListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    FormsModule
  ],
  exports: [
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
