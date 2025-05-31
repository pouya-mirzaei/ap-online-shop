package com.shop.backend.services.api;

import com.shop.backend.models.Product;
import java.util.List;
import java.util.Set;

/**
 * Product Service Interface
 * Defines operations for managing products
 * Students will implement this interface in their code
 */
public interface ProductService {

    /**
     * Get all products
     *
     * @return list of all products
     */
    List<Product> getAllProducts();

    /**
     * Get product by ID
     *
     * @param id product ID
     * @return product if found
     */
    Product getProductById(String id);

    /**
     * Create a new product
     *
     * @param product product to create
     * @return created product
     */
    Product createProduct(Product product);

    /**
     * Update an existing product
     *
     * @param id      product ID
     * @param product updated product data
     * @return updated product
     */
    Product updateProduct(String id, Product product);

    /**
     * Delete a product
     *
     * @param id product ID
     * @return true if deleted, false otherwise
     */
    boolean deleteProduct(String id);

    /**
     * Get products by category
     *
     * @param category category name
     * @return list of products in the category
     */
    List<Product> getProductsByCategory(String category);

    /**
     * Search products by name
     *
     * @param query search query
     * @return list of products matching the query
     */
    List<Product> searchProducts(String query);

    /**
     * Update product stock
     *
     * @param id       product ID
     * @param quantity quantity to add (positive) or remove (negative)
     * @return updated product
     */
    Product updateStock(String id, int quantity);

    /**
     * Get all available categories
     *
     * @return set of all product categories
     */
    Set<String> getAllCategories();

    /**
     * Filter products by price range
     *
     * @param minPrice minimum price (inclusive)
     * @param maxPrice maximum price (inclusive)
     * @return list of products within the price range
     */
    List<Product> filterByPriceRange(double minPrice, double maxPrice);

    /**
     * Sort products by name
     *
     * @param ascending true for ascending order, false for descending
     * @return sorted list of products
     */
    List<Product> sortByName(boolean ascending);

    /**
     * Sort products by price
     *
     * @param ascending true for ascending order, false for descending
     * @return sorted list of products
     */
    List<Product> sortByPrice(boolean ascending);

    /**
     * Filter products with multiple criteria
     *
     * @param category  category to filter by (null for all)
     * @param minPrice  minimum price (null for no minimum)
     * @param maxPrice  maximum price (null for no maximum)
     * @param sortBy    field to sort by ("name" or "price")
     * @return list of filtered and sorted products
     */
    List<Product> filterProducts(String category, Double minPrice, Double maxPrice, String sortBy);
}