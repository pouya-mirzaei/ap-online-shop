package com.shop.backend.services.api;

import com.shop.backend.models.Cart;

/**
 * Cart Service Interface
 * Defines operations for managing shopping carts
 * Students will implement this interface in their code
 */
public interface CartService {

    /**
     * Get cart by user ID
     * 
     * @param userId user ID
     * @return cart if found
     */
    Cart getCartByUserId(String userId);

    /**
     * Create a new cart for a user
     * 
     * @param userId user ID
     * @return created cart
     */
    Cart createCart(String userId);

    /**
     * Add a product to the cart
     * 
     * @param userId    user ID
     * @param productId product ID
     * @param quantity  quantity to add
     * @return updated cart
     */
    Cart addToCart(String userId, String productId, int quantity);

    /**
     * Update product quantity in the cart
     * 
     * @param userId    user ID
     * @param productId product ID
     * @param quantity  new quantity
     * @return updated cart
     */
    Cart updateCartItem(String userId, String productId, int quantity);

    /**
     * Remove a product from the cart
     * 
     * @param userId    user ID
     * @param productId product ID
     * @return updated cart
     */
    Cart removeFromCart(String userId, String productId);

    /**
     * Clear the cart
     * 
     * @param userId user ID
     * @return empty cart
     */
    Cart clearCart(String userId);

    /**
     * Get the number of items in the cart
     * 
     * @param userId user ID
     * @return number of items
     */
    int getCartSize(String userId);

    /**
     * Get the total amount of the cart
     * 
     * @param userId user ID
     * @return total amount
     */
    double getCartTotal(String userId);
}