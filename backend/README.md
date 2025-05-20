# Online Shop Backend

This is the backend component of the AP Online Shop project. It's built with Spring Boot and designed for students to implement specific business logic.

## Project Structure

```
src/main/java/com/shop/backend/
├── controllers/        # REST controllers (DO NOT MODIFY)
├── models/             # Data models (DO NOT MODIFY)
├── services/
│   ├── api/            # Service interfaces (DO NOT MODIFY)
│   ├── core/           # Reference implementations (FOR REFERENCE ONLY)
│   └── student/        # YOUR IMPLEMENTATION GOES HERE
└── BackendApplication.java  # Application entry point
```

## Student Implementation Guide

### 1. Understanding the Service Interfaces

Before you start implementing, familiarize yourself with the service interfaces in the `services/api` package:

- `ProductService`: Manages products in the shop
- `UserService`: Handles user operations and authentication
- `CartService`: Manages shopping carts
- `OrderService`: Processes and manages orders

Each interface is fully documented with method descriptions.

### 2. Implementing Services

You'll need to implement the following classes in the `services/student` package:

- `StudentProductService`
- `StudentUserService`
- `StudentCartService`
- `StudentOrderService`

Each implementation should:

- Be annotated with `@Service` and have the appropriate qualifier
- Implement all methods from the corresponding interface
- Use in-memory storage (like Lists or Maps) to store data

### 3. Using the Extension Mechanism

All models have a `customFields` map that allows you to add properties without modifying the base classes:

```java
// Adding custom properties
product.addCustomField("color", "red");
product.addCustomField("weight", 2.5);

// Retrieving custom properties
String color = (String) product.getCustomField("color");
Double weight = (Double) product.getCustomField("weight");
```

### 4. Example Implementation

A reference implementation of `ProductService` is provided in `services/core/DefaultProductService.java`.

For example, to implement `getAllProducts()` in your `StudentProductService`:

```java
@Override
public List<Product> getAllProducts() {
    return new ArrayList<>(products); // Return a copy of the products list
}
```

### 5. Testing Your Implementation

The frontend application expects your implementations to work correctly. To test:

1. Start the backend: `mvn spring-boot:run`
2. Start the frontend (see main README)
3. Use the web interface to test your business logic

### Common Patterns to Implement

1. **CRUD Operations**: Create, Read, Update, Delete for all entities
2. **Validation**: Validate data before processing
3. **Relationships**: Handle relationships between entities (e.g., user owns carts and orders)
4. **Business Rules**: Implement specific business logic (e.g., stock management)

## Running Tests

To test your implementation:

```bash
mvn test
```

## Spring Boot Concepts Used

- **Dependency Injection**: Services are injected into controllers
- **REST Controllers**: Handle HTTP requests and responses
- **Service Layer**: Contains business logic separate from controllers
- **Component Scanning**: Automatically finds your @Service classes
