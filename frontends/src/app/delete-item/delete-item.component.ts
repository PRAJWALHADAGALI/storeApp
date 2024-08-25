import { Component, OnInit } from '@angular/core';
import { ProductServiceService } from "../services/product-service.service";
import { CategoryItemService } from "../services/category-item.service";
import { Router, ActivatedRoute } from '@angular/router';
import { Product } from '../types/product';
import { ProductCategory } from '../types/product';

@Component({
  selector: 'app-delete-item',
  templateUrl: './delete-item.component.html',
  styleUrls: ['./delete-item.component.css']
})
export class DeleteItemComponent implements OnInit {
  selectedCatList: Product[] = [];
  categories: ProductCategory[] = [];
  selectedCategory: number = 0;
  filteredProducts: Product[] = [];
  selectedProductId: number = 0;  // Initialize as 0, indicating no product selected
  quantity: number = 1;
  productQuantity: number = 0; // To store the current quantity of the selected product

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductServiceService,
    private categoryItemService: CategoryItemService
  ) { }

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

    this.productService.getCategoryItems(categoryId).subscribe(
      (products: Product[]) => {
        this.filteredProducts = products;
      },
      (error) => {
        console.error('Error fetching products:', error);
        this.filteredProducts = [];
      }
    );

    this.quantity = 1;
  }

  onProductChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.selectedProductId = +target.value; // Update selected product ID

    // Fetch the quantity of the selected product
    this.productService.getProductQty(this.selectedProductId).subscribe(qty => {
      this.productQuantity = qty;
      console.log('Current product quantity:', qty);
    });
  }

  onSubmit(): void {
  if (this.selectedCategory && this.selectedProductId && this.quantity > 0) {
    // Ensure the quantity is fetched before proceeding
    this.productService.getProductQty(this.selectedProductId).subscribe(qty => {
      this.productQuantity = qty;
      console.log('Current product quantity:', qty);

      if (this.quantity > this.productQuantity) {
        alert('The quantity to delete is greater than the available quantity. Please enter a valid quantity.');
        return;
      }

      // Proceed with deletion if the quantity is valid
      this.productService.deleteProductQuantity(this.selectedProductId, this.quantity).subscribe(
        () => {
          console.log('Product quantity deleted successfully');
          this.router.navigate(['/']); // Redirect to home component after successful deletion
        },
        (error) => {
          console.error('Error deleting product quantity:', error);
        }
      );
    });
  } else {
    alert('No product selected or quantity is invalid');
  }
}

}
