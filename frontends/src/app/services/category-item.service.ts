import { Injectable } from '@angular/core';
import { ProductCategory } from '../types/product';
import { category } from '../prod-category';

@Injectable({
  providedIn: 'root'
})
export class CategoryItemService {

  constructor() { }

  getAllCategories(): ProductCategory[] {
    return category;
  }

  getCategory(catId: number): ProductCategory[] {
    return category.filter(item => item.categoryId === catId);
  }
}
