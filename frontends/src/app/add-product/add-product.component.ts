import { Component, OnInit } from '@angular/core';
import { ProductServiceService } from "../services/product-service.service";
import { CategoryItemService } from "../services/category-item.service";
import { Router, ActivatedRoute } from '@angular/router';
import { Product } from '../types/product';
import { ProductCategory } from '../types/product';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  selectedCatList: Product[] = [];
  categories: ProductCategory[] = [];
  selectedCategory: number = 0;
  filteredProducts: Product[] = [];
  selectedProductId: number = 1;
  quantity: number = 1;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductServiceService,
    private categoryItemService: CategoryItemService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.productService.getCategoryItems(parseInt(id)).subscribe(
        (products: Product[]) => {
          this.selectedCatList = products;
        }
      );
    }
    this.categories = this.categoryItemService.getAllCategories();
    this.filteredProducts = [];
  }

  onCategoryChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const categoryId = +target.value; // Convert to number
    this.selectedCategory = categoryId;

    // Fetch the products for the selected category
    this.productService.getCategoryItems(categoryId).subscribe(
      (products: Product[]) => {
        this.filteredProducts = products;
      },
      (error) => {
        console.error('Error fetching products:', error);
        this.filteredProducts = []; // Reset if there's an error
      }
    );

    this.quantity = 1; // Reset quantity on category change
  }

  onSubmit(): void {
    if (this.selectedCategory && this.selectedProductId) {
      this.productService.increaseProductQuantity(this.selectedProductId, this.quantity).subscribe(
        () => {
          console.log('Product quantity updated successfully');
          this.router.navigate(['/']);
          // Optionally, navigate to another page or show a success message
        },
        (error) => {
          console.error('Error updating product quantity:', error);
          // Optionally, show an error message
        }
      );
    } else {
      console.warn('No product selected or quantity is invalid');
    }
  }
}
