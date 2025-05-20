package com.shop.backend.models;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

/**
 * Base Order model
 * This class contains all required fields that the frontend needs
 * Students can extend it with custom fields using the customFields map
 * 
 * TODO: Students need to implement the methods in this class
 */
public class Order {
    private String id;
    private String userId;
    private List<OrderItem> items = new ArrayList<>();
    private double totalAmount;
    private String status; // e.g., "PENDING", "SHIPPED", "DELIVERED"
    private LocalDateTime createdAt;

    // Extension mechanism for students to add custom fields
    private Map<String, Object> customFields = new HashMap<>();

    public Order() {
        this.id = UUID.randomUUID().toString();
        this.createdAt = LocalDateTime.now();
    }

    public Order(String userId, List<OrderItem> items, String status) {
        this.id = UUID.randomUUID().toString();
        this.userId = userId;
        this.items = items;
        this.status = status;
        this.createdAt = LocalDateTime.now();
        this.calculateTotalAmount();
    }

    // Method to calculate total amount
    public void calculateTotalAmount() {
        this.totalAmount = items.stream()
                .mapToDouble(item -> item.getPrice() * item.getQuantity())
                .sum();
    }

    // Getters and Setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public List<OrderItem> getItems() {
        return items;
    }

    public void setItems(List<OrderItem> items) {
        this.items = items;
        calculateTotalAmount();
    }

    public void addItem(OrderItem item) {
        this.items.add(item);
        calculateTotalAmount();
    }

    public double getTotalAmount() {
        return totalAmount;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
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

    /**
     * Inner class representing an item in an order
     */
    public static class OrderItem {
        private String productId;
        private String productName;
        private int quantity;
        private double price;

        public OrderItem() {
        }

        public OrderItem(String productId, String productName, int quantity, double price) {
            this.productId = productId;
            this.productName = productName;
            this.quantity = quantity;
            this.price = price;
        }

        public String getProductId() {
            return productId;
        }

        public void setProductId(String productId) {
            this.productId = productId;
        }

        public String getProductName() {
            return productName;
        }

        public void setProductName(String productName) {
            this.productName = productName;
        }

        public int getQuantity() {
            return quantity;
        }

        public void setQuantity(int quantity) {
            this.quantity = quantity;
        }

        public double getPrice() {
            return price;
        }

        public void setPrice(double price) {
            this.price = price;
        }
    }
}