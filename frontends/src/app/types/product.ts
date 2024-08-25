// types/product.ts
export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
  categoryId: number;
  qty: number;
}

export interface ProductCategory {
  categoryId: number;
  category: string;
}
