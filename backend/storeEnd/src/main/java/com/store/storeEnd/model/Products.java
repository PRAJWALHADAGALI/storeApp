package com.store.storeEnd.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor

public class Products {
    @Id
    private int id;
    private String name;
    private String category;
    private long price;
    private String image;
    @Column(name="categoryId")
    private int categoryId;
    private int qty;


}
