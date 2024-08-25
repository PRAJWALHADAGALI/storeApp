package com.store.storeEnd.controller;


import com.store.storeEnd.model.Products;
import com.store.storeEnd.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/")
public class productController {
    @Autowired
    private ProductService productService;
    @RequestMapping("/")
    public String greet(){
        return "hello";
    }
    
    @GetMapping("/stock")
    public List<Products> getAllProducts(){
        return productService.getAllProducts();
    }
    @GetMapping("/category/{categoryId}")
    public List<Products> getProductsByCategoryId(@PathVariable int categoryId) {
        return productService.getProductsByCategoryId(categoryId);
    }

    @PutMapping("/add-item/{productId}")
    public void increaseQuantity(@PathVariable int productId, @RequestParam int qty) {
        productService.increaseProductQuantity(productId, qty);
    }

    @PutMapping("/delete-item/{productId}")
    public void decreaseQuantity(@PathVariable int productId, @RequestParam int qty) {
        productService.decreaseProductQuantity(productId, qty);
    }


    @GetMapping("/get-qty/{productId}")
    public int getQty(@PathVariable int productId) {
        return productService.getProductQuantity(productId);
    }

}
