package com.shop.backend.services.student;

import com.shop.backend.models.Cart;
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
        // TODO: Implement this method
        return null;
    }

    @Override
    public Cart createCart(String userId) {
        // TODO: Implement this method
        return null;
    }

    @Override
    public Cart addToCart(String userId, String productId, int quantity) {
        // TODO: Implement this method
        return null;
    }

    @Override
    public Cart updateCartItem(String userId, String productId, int quantity) {
        // TODO: Implement this method
        return null;
    }

    @Override
    public Cart removeFromCart(String userId, String productId) {
        // TODO: Implement this method
        return null;
    }

    @Override
    public Cart clearCart(String userId) {
        // TODO: Implement this method
        return null;
    }

    @Override
    public int getCartSize(String userId) {
        // TODO: Implement this method
        return 0;
    }

    @Override
    public double getCartTotal(String userId) {
        // TODO: Implement this method
        return 0.0;
    }
}