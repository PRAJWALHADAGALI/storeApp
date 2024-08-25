package com.store.storeEnd.service;

import com.store.storeEnd.model.Products;
import com.store.storeEnd.repo.ProductRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {

    @Autowired
    private ProductRepo repo;

    public List<Products> getAllProducts() {
        return repo.findAll();
    }

    public List<Products> getProductsByCategoryId(int categoryId) {
        return repo.findByCategoryId(categoryId);
    }

    public void increaseProductQuantity(int productId, int quantity) {
        repo.increseQuantity(productId, quantity);
    }

    public void decreaseProductQuantity(int productId, int quantity) {
        // Update the quantity if the new quantity is valid
        repo.deleteQuantity(productId, quantity);
    }
    public Integer getProductQuantity(int productId) {
        return repo.getQuantity(productId);
    }
//    public void deleteProductIfQuantityLessOrEqual(int productId, int quantity) {
//        // Check if product quantity is less than or equal to the specified quantity
//        Products product = repo.findById(productId).orElse(null);
//        if (product != null && product.getQty() <= quantity) {
//            repo.deleteQuantity(productId, quantity);
//        }
//    }
}
