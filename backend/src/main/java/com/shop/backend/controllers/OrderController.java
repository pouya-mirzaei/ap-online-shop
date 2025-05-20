package com.shop.backend.controllers;

import com.shop.backend.models.Order;
import com.shop.backend.services.api.OrderService;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * REST Controller for Order operations
 */
@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = "*") // Allow requests from any origin for demo purposes
public class OrderController {

    private final OrderService orderService;

    public OrderController(@Qualifier("studentOrderService") OrderService orderService) {
        this.orderService = orderService;
    }

    @GetMapping
    public ResponseEntity<List<Order>> getAllOrders() {
        return ResponseEntity.ok(orderService.getAllOrders());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Order> getOrderById(@PathVariable String id) {
        Order order = orderService.getOrderById(id);
        if (order != null) {
            return ResponseEntity.ok(order);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Order>> getOrdersByUserId(@PathVariable String userId) {
        return ResponseEntity.ok(orderService.getOrdersByUserId(userId));
    }

    @PostMapping("/user/{userId}")
    public ResponseEntity<Order> createOrderFromCart(@PathVariable String userId) {
        Order order = orderService.createOrderFromCart(userId);
        if (order != null) {
            return ResponseEntity.status(HttpStatus.CREATED).body(order);
        }
        return ResponseEntity.badRequest().build();
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<Order> updateOrderStatus(
            @PathVariable String id,
            @RequestParam String status) {
        Order order = orderService.updateOrderStatus(id, status);
        if (order != null) {
            return ResponseEntity.ok(order);
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> cancelOrder(@PathVariable String id) {
        boolean canceled = orderService.cancelOrder(id);
        if (canceled) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/status/{status}")
    public ResponseEntity<List<Order>> getOrdersByStatus(@PathVariable String status) {
        return ResponseEntity.ok(orderService.getOrdersByStatus(status));
    }

    @GetMapping("/user/{userId}/count")
    public ResponseEntity<Integer> getOrderCount(@PathVariable String userId) {
        return ResponseEntity.ok(orderService.getOrderCount(userId));
    }

    @GetMapping("/user/{userId}/total-spent")
    public ResponseEntity<Double> getTotalSpent(@PathVariable String userId) {
        return ResponseEntity.ok(orderService.getTotalSpent(userId));
    }
}