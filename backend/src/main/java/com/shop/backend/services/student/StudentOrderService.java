package com.shop.backend.services.student;

import com.shop.backend.models.Order;
import com.shop.backend.services.api.CartService;
import com.shop.backend.services.api.OrderService;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import java.util.*;

/**
 * Student Implementation of OrderService
 * This is where students will implement their business logic for order
 * management
 */
@Service("studentOrderService")
public class StudentOrderService implements OrderService {

    private final CartService cartService;

    // In-memory storage for orders
    private final Map<String, Order> orders = new HashMap<>();

    public StudentOrderService(@Qualifier("studentCartService") CartService cartService) {
        this.cartService = cartService;
    }

    @Override
    public List<Order> getAllOrders() {
        // TODO: Implement this method
        return null;
    }

    @Override
    public Order getOrderById(String id) {
        // TODO: Implement this method
        return null;
    }

    @Override
    public List<Order> getOrdersByUserId(String userId) {
        // TODO: Implement this method
        return null;
    }

    @Override
    public Order createOrderFromCart(String userId) {
        // TODO: Implement this method
        return null;
    }

    @Override
    public Order updateOrderStatus(String id, String status) {
        // TODO: Implement this method
        return null;
    }

    @Override
    public boolean cancelOrder(String id) {
        // TODO: Implement this method
        return false;
    }

    @Override
    public List<Order> getOrdersByStatus(String status) {
        // TODO: Implement this method
        return null;
    }

    @Override
    public int getOrderCount(String userId) {
        // TODO: Implement this method
        return 0;
    }

    @Override
    public double getTotalSpent(String userId) {
        // TODO: Implement this method
        return 0.0;
    }
}