package com.shop.backend.models;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

/**
 * Base Product model
 * This class contains all required fields that the frontend needs
 * Students can extend it with custom fields using the customFields map
 * 
 * TODO: Students need to implement any additional methods they need in this
 * class
 */
public class Product {
    private String id;
    private String name;
    private double price;
    private String description;
    private int stock;
    private String category;
    private String imageUrl;

    // Extension mechanism for students to add custom fields
    private Map<String, Object> customFields = new HashMap<>();

    public Product() {
        this.id = UUID.randomUUID().toString();
    }

    public Product(String name, double price, String description, int stock, String category) {
        this.id = UUID.randomUUID().toString();
        this.name = name;
        this.price = price;
        this.description = description;
        this.stock = stock;
        this.category = category;
    }

    // TODO: Students may implement additional business logic methods here

    // Getters and Setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public int getStock() {
        return stock;
    }

    public void setStock(int stock) {
        this.stock = stock;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    // Custom fields extension methods
    public Map<String, Object> getCustomFields() {
        return customFields;
    }

    public void setCustomFields(Map<String, Object> customFields) {
        this.customFields = customFields;
    }

    public void addCustomField(String key, Object value) {
        customFields.put(key, value);
    }

    public Object getCustomField(String key) {
        return customFields.get(key);
    }
}