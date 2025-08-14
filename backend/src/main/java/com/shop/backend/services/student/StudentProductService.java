package com.shop.backend.services.student;

import com.shop.backend.models.Product;
import com.shop.backend.services.api.ProductService;
import org.springframework.stereotype.Service;

import java.util.*;

/**
 * Student Implementation of ProductService
 * This is where students will implement their business logic
 */
@Service("studentProductService")
public class StudentProductService implements ProductService {

    // In-memory storage
    private final List<Product> products = new ArrayList<>();

    public StudentProductService(){
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
        return products;
    }

    public Product getProductById(String id) {
        if (id == null || id.isEmpty()) {
            throw new IllegalArgumentException("Product ID cannot be null or empty.");
        }
        for (Product product : products) {
            if (product.getId().equals(id))
                return product;
        }
        return null;
    }


    @Override
    public Product createProduct(Product product) {
        products.add(product);
        return product;
    }

    @Override
    public Product updateProduct(String id, Product product) {
        if (id == null || id.isEmpty()) {
            throw new IllegalArgumentException("Product ID cannot be null or empty.");
        }
        if (product == null) {
            throw new IllegalArgumentException("Product cannot be null.");
        }

        Product existProduct = getProductById(id);
        if (existProduct == null) {
            throw new IllegalArgumentException("Product with ID " + id + " does not exist.");
        }

        for (Product p : products) {
            if (!existProduct.getId().equals(p.getId()) && p.getId().equals(product.getId())) {
                throw new IllegalArgumentException("Duplicate product ID detected.");
            }
        }

        existProduct.setId(product.getId());
        existProduct.setCategory(product.getCategory());
        existProduct.setName(product.getName());
        existProduct.setPrice(product.getPrice());
        existProduct.setDescription(product.getDescription());
        existProduct.setStock(product.getStock());

        return existProduct;
    }


    @Override
    public boolean deleteProduct(String id) {
        if (id == null || id.isEmpty()) {
            throw new IllegalArgumentException("Product ID cannot be null or empty.");
        }
        Product p1 = getProductById(id);
        if (p1 == null) {
            throw new IllegalArgumentException("Product with ID " + id + " does not exist.");
        }
        products.remove(p1);
        return true;
    }


    @Override
    public List<Product> getProductsByCategory(String category) {
        List<Product> filteredProducts = new ArrayList<>();
        for (int i = 0; i < products.size(); i++) {
            if (category.equalsIgnoreCase(products.get(i).getCategory())){
                filteredProducts.add(products.get(i));
            }
        }
        return filteredProducts;
    }

    @Override
    public List<Product> searchProducts(String query) {
        List<Product> matchingProducts = new ArrayList<>();
        for (int i = 0; i < products.size(); i++) {
            if (query.equalsIgnoreCase(products.get(i).getName())){
                matchingProducts.add(products.get(i));
            }
        }
        return matchingProducts;
    }

    @Override
    public Product updateStock(String id, int quantity) {
        Product p1 = null;
        for (int i = 0; i < products.size(); i++) {
            if (id.equals(products.get(i).getId())){
                p1 = products.get(i);
                break;
            }
        }
        if (p1 == null){
            return null;
        }
        else {
            p1.setStock(p1.getStock() + quantity);
        }
        return p1;
    }

    @Override
    public Set<String> getAllCategories() {
        Set<String> categories = new HashSet<>();
        for (int i = 0; i < products.size(); i++) {
            categories.add(products.get(i).getCategory());
        }
        return categories;
    }

    @Override
    public List<Product> filterByPriceRange(double minPrice, double maxPrice) {
        List<Product> filteredbyprice = new ArrayList<>();
        for (Product product : products) {
            if (product != null && product.getPrice() >= minPrice && product.getPrice() <= maxPrice) {
                filteredbyprice.add(product);
            }
        }
        return filteredbyprice;
    }


    @Override
    public List<Product> filterProducts(String category, Double minPrice, Double maxPrice, String sortBy) {
        List<Product> filtered = new ArrayList<>();

        for (Product p : products) {
            if (p == null) continue;

            if (category != null && !category.equalsIgnoreCase(p.getCategory())) {
                continue;
            }

            double price = p.getPrice();
            double min = (minPrice != null) ? minPrice : Double.MIN_VALUE;
            double max = (maxPrice != null) ? maxPrice : Double.MAX_VALUE;

            if (price < min || price > max) {
                continue;
            }

            filtered.add(p);
        }

        if (sortBy != null) {
            boolean ascending = sortBy.endsWith("_asc");

            if (sortBy.startsWith("name")) {
                filtered.sort(new Comparator<Product>() {
                    public int compare(Product p1, Product p2) {
                        if (p1 == null || p2 == null){
                            return 0;
                        }
                        String name1 = p1.getName();
                        String name2 = p2.getName();

                        if (ascending) {
                            return name1.compareToIgnoreCase(name2);
                        } else {
                            return name2.compareToIgnoreCase(name1);
                        }
                    }
                });
            } else if (sortBy.startsWith("price")) {
                filtered.sort(new Comparator<Product>() {
                    public int compare(Product p1, Product p2) {
                        if (p1 == null || p2 == null) {
                            return 0;
                        }
                        double price1 = p1.getPrice();
                        double price2 = p2.getPrice();

                        if (price1 == price2) {
                            return 0;
                        }
                        if (ascending) {
                            return price1 < price2 ? -1 : 1;
                        } else {
                            return price1 > price2 ? -1 : 1;
                        }
                    }
                });
            }
        }

        return filtered;
    }



    @Override
    public List<Product> sortByName(boolean ascending) {
        return sortListByName(new ArrayList<>(products), ascending);
    }

    @Override
    public List<Product> sortByPrice(boolean ascending) {
        return sortListByPrice(new ArrayList<>(products), ascending);
    }

    // Helper method for name sorting
    private List<Product> sortListByName(List<Product> listToSort, boolean ascending) {
        List<Product> sorted = new ArrayList<>(listToSort);

        // Using bubble sort with null checks
        for (int i = 0; i < sorted.size() - 1; i++) {
            for (int j = 0; j < sorted.size() - i - 1; j++) {
                Product p1 = sorted.get(j);
                Product p2 = sorted.get(j + 1);

                if (p1 != null && p2 != null) {
                    int comparison = p1.getName().compareToIgnoreCase(p2.getName());
                    if ((ascending && comparison > 0) || (!ascending && comparison < 0)) {
                        // Swap
                        sorted.set(j, p2);
                        sorted.set(j + 1, p1);
                    }
                }
            }
        }
        return sorted;
    }

    // Helper method for price sorting
    private List<Product> sortListByPrice(List<Product> listToSort, boolean ascending) {
        List<Product> sorted = new ArrayList<>(listToSort);

        // Using selection sort with null checks
        for (int i = 0; i < sorted.size() - 1; i++) {
            int extremeIndex = i;
            for (int j = i + 1; j < sorted.size(); j++) {
                Product current = sorted.get(j);
                Product extreme = sorted.get(extremeIndex);

                if (current != null && extreme != null) {
                    boolean shouldSwap = ascending
                            ? current.getPrice() < extreme.getPrice()
                            : current.getPrice() > extreme.getPrice();

                    if (shouldSwap) {
                        extremeIndex = j;
                    }
                }
            }
            // Swap
            Product temp = sorted.get(i);
            sorted.set(i, sorted.get(extremeIndex));
            sorted.set(extremeIndex, temp);
        }
        return sorted;
    }

}