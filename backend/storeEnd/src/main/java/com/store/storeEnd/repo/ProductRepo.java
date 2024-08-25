package com.store.storeEnd.repo;

import com.store.storeEnd.model.Products;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public interface ProductRepo extends JpaRepository<Products, Integer> {
    @Transactional
    @Modifying
    @Query("UPDATE Products p SET p.qty = p.qty + :qty WHERE p.id = :id")
    void increseQuantity(@Param("id") Integer id, @Param("qty") Integer qty);

    @Transactional
    @Modifying
    @Query("UPDATE Products p SET p.qty = p.qty - :qty WHERE p.id = :id")
    void deleteQuantity(@Param("id") Integer id, @Param("qty") Integer qty);

    @Query("SELECT p.qty FROM Products p WHERE p.id = :id")
    Integer getQuantity(@Param("id") Integer id);

    List<Products> findByCategoryId(int categoryId);

}
