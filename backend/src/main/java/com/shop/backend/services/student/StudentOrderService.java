package com.shop.backend.services.student;

import com.shop.backend.models.Cart;
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
        return new ArrayList<>(orders.values());
    }

    @Override
    public Order getOrderById(String id) {
        if (id == null || id.isEmpty()) {
            throw new IllegalArgumentException("Order ID cannot be null or empty.");
        }

        Order order = orders.get(id);

        if (order == null) {
            throw new IllegalArgumentException("Order not found with ID: " + id);
        }

        return order;
    }

    @Override
    public List<Order> getOrdersByUserId(String userId) {
        if (userId == null || userId.isEmpty()) {
            throw new IllegalArgumentException("User ID cannot be null or empty.");
        }

        System.out.println("🔍 Fetching orders for user: " + userId);

        List<Order> list = new ArrayList<>();
        for (Order o : orders.values()) {
            if (o.getUserId().equals(userId)) {
                list.add(o);
            }
        }

        return list;
    }


    @Override
    public Order createOrderFromCart(String userId) {
        if (userId == null || userId.isEmpty()) {
            throw new IllegalArgumentException("User ID cannot be null or empty.");
        }
        Cart usercart = cartService.getCartByUserId(userId);
        List<Order.OrderItem> items = new ArrayList<>();
        for (Cart.CartItem cartItem : usercart.getItems()) {
            var ci = new Order.OrderItem(cartItem.getProductId(), cartItem.getProductName(), cartItem.getQuantity(), cartItem.getPrice());
            items.add(ci);
        }
        Order newOrder = new Order(userId, items, "PENDING");
        orders.put( newOrder.getId(), newOrder);
        return newOrder;
    }

    @Override
    public Order updateOrderStatus(String id, String status) {
        if (id == null || id.isEmpty()) {
            throw new IllegalArgumentException("Order ID cannot be null or empty.");
        }
        if (status == null || status.isEmpty()) {
            throw new IllegalArgumentException("Order status cannot be null or empty.");
        }

        for (Order x : orders.values()) {
            if (id.equals(x.getId())) {
                x.setStatus(status);
                return x;
            }
        }

        throw new IllegalArgumentException("Order not found with ID: " + id);
    }

    @Override
    public boolean cancelOrder(String id) {
        if (id == null || id.isEmpty()) {
            throw new IllegalArgumentException("Order ID cannot be null or empty.");
        }

        Order target = orders.get(id);
        if (target == null) {
            throw new IllegalArgumentException("Order not found with ID: " + id);
        }

        orders.remove(id);
        return true;
    }

    @Override
    public List<Order> getOrdersByStatus(String status) {
        if (status == null || status.isEmpty()) {
            throw new IllegalArgumentException("Order status cannot be null or empty.");
        }

        List<Order> statusOrdersList = new ArrayList<>();
        for (Order x : orders.values()) {
            if (x.getStatus().equals(status)) {
                statusOrdersList.add(x);
            }
        }

        if (statusOrdersList.isEmpty()) {
            throw new IllegalArgumentException("No orders found with status: " + status);
        }

        return statusOrdersList;
    }

    @Override
    public int getOrderCount(String userId) {
        if (userId == null || userId.isEmpty()) {
            throw new IllegalArgumentException("User ID cannot be null or empty.");
        }

        int count = 0;
        for (Order x : orders.values()) {
            if (x.getUserId().equals(userId)) {
                count++;
            }
        }

        return count;
    }

    @Override
    public double getTotalSpent(String userId) {
        if (userId == null || userId.isEmpty()) {
            throw new IllegalArgumentException("User ID cannot be null or empty.");
        }

        double totalAmount = 0.0;
        for (Order x : orders.values()) {
            if (x.getUserId().equals(userId)) {
                totalAmount += x.getTotalAmount();
            }
        }

        return totalAmount;
    }
}