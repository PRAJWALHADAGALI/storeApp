import { Component, OnInit } from '@angular/core';
import { ProductServiceService } from "../services/product-service.service";
import { Product } from '../types/product';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  //selectedCategoryId: number;

  constructor(private productService: ProductServiceService) { }

  ngOnInit(): void {
    this.loadProducts();
    //this.loadProductsByCategory();
  }

  loadProducts() {
    this.productService.getProducts().subscribe(data => {
      this.products = data;
    });
  }


}
