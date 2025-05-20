package com.shop.backend.services.core;

import com.shop.backend.models.Product;
import com.shop.backend.services.api.ProductService;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

/**
 * Default implementation of ProductService
 * This serves as a reference implementation for students
 */
@Service("defaultProductService")
public class DefaultProductService implements ProductService {

    // In-memory storage
    private final List<Product> products = new ArrayList<>();

    public DefaultProductService() {
        // Add some sample products
        products.add(new Product("Laptop", 1200.0, "High-performance laptop", 10, "Electronics"));
        products.add(new Product("Smartphone", 800.0, "Latest smartphone", 15, "Electronics"));
        products.add(new Product("Headphones", 150.0, "Noise-cancelling headphones", 20, "Electronics"));
        products.add(new Product("T-Shirt", 25.0, "Cotton t-shirt", 50, "Clothing"));
        products.add(new Product("Jeans", 45.0, "Blue jeans", 30, "Clothing"));
        products.add(new Product("Running Shoes", 95.0, "Sports running shoes", 25, "Footwear"));
        products.add(new Product("Desk Lamp", 35.0, "LED desk lamp", 40, "Home"));
        products.add(new Product("Coffee Maker", 120.0, "Automatic coffee maker", 15, "Kitchen"));
    }

    @Override
    public List<Product> getAllProducts() {
        // Return a copy of the products list to prevent direct modification
        return new ArrayList<>(products);
    }

    @Override
    public Product getProductById(String id) {
        // Loop through products to find matching ID
        for (Product product : products) {
            if (product.getId().equals(id)) {
                return product;
            }
        }
        return null;
    }

    @Override
    public Product createProduct(Product product) {
        // TODO: Implement this method
        // Students should add the product to the list and return it
        return null;
    }

    @Override
    public Product updateProduct(String id, Product updatedProduct) {
        // Find the product with matching ID and update it
        for (int i = 0; i < products.size(); i++) {
            Product product = products.get(i);
            if (product.getId().equals(id)) {
                // Update existing product with new data
                updatedProduct.setId(id);
                products.set(i, updatedProduct);
                return updatedProduct;
            }
        }
        return null;
    }

    @Override
    public boolean deleteProduct(String id) {
        // Find the product to remove
        for (int i = 0; i < products.size(); i++) {
            if (products.get(i).getId().equals(id)) {
                products.remove(i);
                return true;
            }
        }
        return false;
    }

    @Override
    public List<Product> getProductsByCategory(String category) {
        // Create a list for products in the requested category
        List<Product> categoryProducts = new ArrayList<>();

        // Add all products from the specified category
        for (Product product : products) {
            if (product.getCategory().equalsIgnoreCase(category)) {
                categoryProducts.add(product);
            }
        }

        return categoryProducts;
    }

    @Override
    public List<Product> searchProducts(String query) {
        // Create a list for products matching the search query
        List<Product> searchResults = new ArrayList<>();
        String lowercaseQuery = query.toLowerCase();

        // Search in both name and description fields
        for (Product product : products) {
            if (product.getName().toLowerCase().contains(lowercaseQuery) ||
                    product.getDescription().toLowerCase().contains(lowercaseQuery)) {
                searchResults.add(product);
            }
        }

        return searchResults;
    }

    @Override
    public Product updateStock(String id, int quantity) {
        // TODO: Implement this method
        return null;
    }

    @Override
    public Set<String> getAllCategories() {
        // Create a set to store unique categories
        Set<String> categories = new HashSet<>();

        // Add each product's category to the set
        for (Product product : products) {
            categories.add(product.getCategory());
        }

        return categories;
    }

    @Override
    public List<Product> filterByPriceRange(double minPrice, double maxPrice) {
        // Create a list for products within the price range
        List<Product> filteredProducts = new ArrayList<>();

        // Filter products by price
        for (Product product : products) {
            if (product.getPrice() >= minPrice && product.getPrice() <= maxPrice) {
                filteredProducts.add(product);
            }
        }

        return filteredProducts;
    }

    @Override
    public List<Product> sortByName(boolean ascending) {
        // TODO: Implement this method
        // Students should create a sorted copy of the products list based on product
        // names
        return null;
    }

    @Override
    public List<Product> sortByPrice(boolean ascending) {
        // TODO: Implement this method
        // Students should create a sorted copy of the products list based on product
        // prices
        return null;
    }

    @Override
    public List<Product> filterProducts(String category, Double minPrice, Double maxPrice, String sortBy) {
        // TODO: Implement this method
        // Students should filter products by category and price range, then sort them
        return null;
    }
}