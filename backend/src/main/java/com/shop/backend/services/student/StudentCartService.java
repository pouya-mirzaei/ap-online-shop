package com.shop.backend.services.student;

import com.shop.backend.models.Cart;
import com.shop.backend.models.Product;
import com.shop.backend.services.api.CartService;
import com.shop.backend.services.api.ProductService;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

/**
 * Student Implementation of CartService
 * This is where students will implement their business logic for cart
 * management
 */
@Service("studentCartService")
public class StudentCartService implements CartService {

    private final ProductService productService;

    // In-memory storage for carts
    private final Map<String, Cart> carts = new HashMap<>();

    public StudentCartService(@Qualifier("studentProductService") ProductService productService) {
        this.productService = productService;
    }

    @Override
    public Cart getCartByUserId(String userId) {
        return carts.getOrDefault(userId, null);
    }

    @Override
    public Cart createCart(String userId) {
        if (userId == null || userId.isEmpty()) {
            throw new IllegalArgumentException("User ID cannot be null or empty.");
        }
        Cart newCart = new Cart(userId);
        carts.put(userId, newCart);
        return newCart;
    }


    @Override
    public Cart addToCart(String userId, String productId, int quantity) {
        if (userId == null || userId.isEmpty()) {
            throw new IllegalArgumentException("User ID cannot be null or empty.");
        }
        if (productId == null || productId.isEmpty()) {
            throw new IllegalArgumentException("Product ID cannot be null or empty.");
        }
        if (quantity <= 0) {
            throw new IllegalArgumentException("Quantity must be greater than zero.");
        }

        Cart target = carts.getOrDefault(userId, new Cart(userId));
        Product p1 = productService.getProductById(productId);
        if (p1 == null) {
            throw new IllegalArgumentException("Product not found: " + productId);
        }

        target.addItem(p1, quantity);
        carts.put(userId, target);
        return target;
    }


    @Override
    public Cart updateCartItem(String userId, String productId, int quantity) {
        if (userId == null || userId.isEmpty()) {
            throw new IllegalArgumentException("User ID cannot be null or empty.");
        }
        if (productId == null || productId.isEmpty()) {
            throw new IllegalArgumentException("Product ID cannot be null or empty.");
        }
        if (quantity < 0) {
            throw new IllegalArgumentException("Quantity cannot be negative.");
        }

        Cart target = carts.get(userId);

        if (target == null) {
            throw new IllegalArgumentException("Cart not found for user: " + userId);
        }
        target.updateItemQuantity(productId, quantity);
        return target;
    }


    @Override
    public Cart removeFromCart(String userId, String productId) {
        if (userId == null || userId.isEmpty()) {
            throw new IllegalArgumentException("User ID cannot be null or empty.");
        }
        if (productId == null || productId.isEmpty()) {
            throw new IllegalArgumentException("Product ID cannot be null or empty.");
        }

        Cart target = getCartByUserId(userId);

        if (target == null) {
            throw new IllegalArgumentException("Cart not found for user: " + userId);
        }

        target.removeItem(productId);
        return target;
    }


    @Override
    public Cart clearCart(String userId) {
        if (userId == null || userId.isEmpty()) {
            throw new IllegalArgumentException("User ID cannot be null or empty.");
        }

        Cart target = carts.get(userId);

        if (target == null) {
            throw new IllegalArgumentException("Cart not found for user: " + userId);
        }

        target.clear();
        return target;
    }


    @Override
    public int getCartSize(String userId) {
        Cart target = getCartByUserId(userId);
        if (target == null) {
            throw new IllegalArgumentException("Cart not found for user: " + userId);
        }
        return target.getItems().size();
    }

    @Override
    public double getCartTotal(String userId) {
        Cart target = getCartByUserId(userId);
        if (target == null) {
            throw new IllegalArgumentException("Cart not found for user: " + userId);
        }
        return target.getTotalAmount();
    }
}