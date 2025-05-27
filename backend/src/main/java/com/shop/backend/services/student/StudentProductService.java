package com.shop.backend.services.student;

import com.shop.backend.models.Product;
import com.shop.backend.services.api.ProductService;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

/**
 * Student Implementation of ProductService
 * This is where students will implement their business logic
 */
@Service("studentProductService")
public class StudentProductService implements ProductService {

    // In-memory storage
    private final List<Product> products = new ArrayList<>();

    @Override
    public List<Product> getAllProducts() {
        // TODO: Implement this method
        return null;
    }

    @Override
    public Product getProductById(String id) {
        // TODO: Implement this method
        return null;
    }

    @Override
    public Product createProduct(Product product) {
        // TODO: Implement this method
        return null;
    }

    @Override
    public Product updateProduct(String id, Product product) {
        // TODO: Implement this method
        return null;
    }

    @Override
    public boolean deleteProduct(String id) {
        // TODO: Implement this method
        return false;
    }

    @Override
    public List<Product> getProductsByCategory(String category) {
        // TODO: Implement this method
        return null;
    }

    @Override
    public List<Product> searchProducts(String query) {
        // TODO: Implement this method
        return null;
    }

    @Override
    public Product updateStock(String id, int quantity) {
        // TODO: Implement this method
        return null;
    }

    @Override
    public Set<String> getAllCategories() {
        // TODO: Implement this method
        return null;
    }

    @Override
    public List<Product> filterByPriceRange(double minPrice, double maxPrice) {
        // TODO: Implement this method
        return null;
    }

    @Override
    public List<Product> filterProducts(String category, Double minPrice, Double maxPrice, String sortBy) {
        // TODO: Implement this method

        // sortBy can be "price_asc" or "price_desc" or "name_asc" or "name_desc"

        return null;
    }
}