package com.shop.backend.services.api;

import com.shop.backend.models.Order;
import java.util.List;

/**
 * Order Service Interface
 * Defines operations for managing orders
 * Students will implement this interface in their code
 */
public interface OrderService {

    /**
     * Get all orders
     * 
     * @return list of all orders
     */
    List<Order> getAllOrders();

    /**
     * Get order by ID
     * 
     * @param id order ID
     * @return order if found
     */
    Order getOrderById(String id);

    /**
     * Get orders by user ID
     * 
     * @param userId user ID
     * @return list of orders for the user
     */
    List<Order> getOrdersByUserId(String userId);

    /**
     * Create a new order from cart
     * 
     * @param userId user ID
     * @return created order
     */
    Order createOrderFromCart(String userId);

    /**
     * Update order status
     * 
     * @param id     order ID
     * @param status new status
     * @return updated order
     */
    Order updateOrderStatus(String id, String status);

    /**
     * Cancel an order
     * 
     * @param id order ID
     * @return true if canceled, false otherwise
     */
    boolean cancelOrder(String id);

    /**
     * Get orders by status
     * 
     * @param status order status
     * @return list of orders with the specified status
     */
    List<Order> getOrdersByStatus(String status);

    /**
     * Get order count for a user
     * 
     * @param userId user ID
     * @return number of orders
     */
    int getOrderCount(String userId);

    /**
     * Get total spent by a user
     * 
     * @param userId user ID
     * @return total amount spent
     */
    double getTotalSpent(String userId);
}