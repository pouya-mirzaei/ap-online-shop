package com.shop.backend.models;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Base Cart model
 * This class contains all required fields that the frontend needs
 * Students can extend it with custom fields using the customFields map
 * 
 * TODO: Students need to implement the methods in this class
 */
public class Cart {
    private String userId;
    private List<CartItem> items = new ArrayList<>();
    private double totalAmount;

    // Extension mechanism for students to add custom fields
    private Map<String, Object> customFields = new HashMap<>();

    public Cart() {
    }

    public Cart(String userId) {
        this.userId = userId;
    }

    // Method to calculate total amount
    public void calculateTotalAmount() {
        this.totalAmount = items.stream()
                .mapToDouble(item -> item.getPrice() * item.getQuantity())
                .sum();
    }

    // Method to add item to cart
    public void addItem(Product product, int quantity) {
        // Check if the product is already in the cart
        for (CartItem item : items) {
            if (item.getProductId().equals(product.getId())) {
                // Update quantity
                item.setQuantity(item.getQuantity() + quantity);
                calculateTotalAmount();
                return;
            }
        }

        // Add new item
        CartItem newItem = new CartItem(
                product.getId(),
                product.getName(),
                quantity,
                product.getPrice());
        items.add(newItem);
        calculateTotalAmount();
    }

    // Method to update item quantity
    public void updateItemQuantity(String productId, int quantity) {
        for (CartItem item : items) {
            if (item.getProductId().equals(productId)) {
                item.setQuantity(quantity);
                calculateTotalAmount();
                return;
            }
        }
    }

    // Method to remove item from cart
    public void removeItem(String productId) {
        items.removeIf(item -> item.getProductId().equals(productId));
        calculateTotalAmount();
    }

    // Method to clear cart
    public void clear() {
        items.clear();
        totalAmount = 0;
    }

    // Getters and Setters
    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public List<CartItem> getItems() {
        return items;
    }

    public void setItems(List<CartItem> items) {
        this.items = items;
        calculateTotalAmount();
    }

    public double getTotalAmount() {
        return totalAmount;
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
     * Inner class representing an item in a cart
     */
    public static class CartItem {
        private String productId;
        private String productName;
        private int quantity;
        private double price;

        public CartItem() {
        }

        public CartItem(String productId, String productName, int quantity, double price) {
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

        public double getSubtotal() {
            return price * quantity;
        }
    }
}