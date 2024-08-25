import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
//import { products } from '../product-item';
import { Product } from '../types/product';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {
  private apiUrl = 'http://localhost:8080';
  //products:Product[] = this.http.get<Product[]>(this.apiUrl);
  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]> {
      return this.http.get<Product[]>(`${this.apiUrl}/stock`);
    }
  // getAll(): Product[] {
  //   return this.products;
  // }
  getCategoryItems(id: number): Observable<Product[]> {
  return this.http.get<Product[]>(`${this.apiUrl}/category/${id}`);
}
increaseProductQuantity(productId: number, quantity: number): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/add-item/${productId}?qty=${quantity}`, {});
}

deleteProductQuantity(productId: number, quantity: number): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/delete-item/${productId}?qty=${quantity}`, {});
}
getProductQty(productId:number): Observable<number> {
  return this.http.get<number>(`${this.apiUrl}/get-qty/${productId}`)
}


  // getCategoryItems(id: number): Product[] {
  //   return products.filter(item => item.categoryId == id);
  // }
}
