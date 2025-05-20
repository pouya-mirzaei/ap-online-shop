# Online Shop API Documentation

## Base URL

```
http://localhost:8080/api
```

## Authentication

Currently, simple authentication is implemented through the `/api/users/login` endpoint. No token-based authentication is required for other endpoints in this version.

---

## User API

### Get All Users

Retrieves a list of all users.

**Endpoint:** `GET /users`

**Response:**

```json
[
  {
    "id": "uuid-string",
    "username": "user1",
    "email": "user1@example.com",
    "role": "CUSTOMER",
    "customFields": {}
  }
]
```

### Get User by ID

Retrieves a specific user by ID.

**Endpoint:** `GET /users/{id}`

**Response:**

```json
{
  "id": "uuid-string",
  "username": "user1",
  "email": "user1@example.com",
  "role": "CUSTOMER",
  "customFields": {}
}
```

### Create User

Creates a new user.

**Endpoint:** `POST /users`

**Request Body:**

```json
{
  "username": "newuser",
  "email": "newuser@example.com",
  "password": "password123",
  "role": "CUSTOMER"
}
```

**Response:**

```json
{
  "id": "generated-uuid",
  "username": "newuser",
  "email": "newuser@example.com",
  "role": "CUSTOMER",
  "customFields": {}
}
```

### Update User

Updates an existing user.

**Endpoint:** `PUT /users/{id}`

**Request Body:**

```json
{
  "username": "updateduser",
  "email": "updated@example.com",
  "password": "newpassword",
  "role": "CUSTOMER"
}
```

**Response:**

```json
{
  "id": "uuid-string",
  "username": "updateduser",
  "email": "updated@example.com",
  "role": "CUSTOMER",
  "customFields": {}
}
```

### Delete User

Deletes a user.

**Endpoint:** `DELETE /users/{id}`

**Response:** HTTP 204 No Content

### Login

Authenticates a user.

**Endpoint:** `POST /users/login`

**Request Body:**

```json
{
  "username": "user1",
  "password": "password123"
}
```

**Response:**

```json
{
  "id": "uuid-string",
  "username": "user1",
  "email": "user1@example.com",
  "role": "CUSTOMER",
  "customFields": {}
}
```

### Get User by Username

Retrieves a user by username.

**Endpoint:** `GET /users/username/{username}`

**Response:**

```json
{
  "id": "uuid-string",
  "username": "user1",
  "email": "user1@example.com",
  "role": "CUSTOMER",
  "customFields": {}
}
```

### Get User by Email

Retrieves a user by email.

**Endpoint:** `GET /users/email/{email}`

**Response:**

```json
{
  "id": "uuid-string",
  "username": "user1",
  "email": "user1@example.com",
  "role": "CUSTOMER",
  "customFields": {}
}
```

---

## Product API

### Get All Products

Retrieves a list of all products.

**Endpoint:** `GET /products`

**Response:**

```json
[
  {
    "id": "uuid-string",
    "name": "Laptop",
    "price": 1200.0,
    "description": "High-performance laptop",
    "stock": 10,
    "category": "Electronics",
    "imageUrl": "https://example.com/image.jpg",
    "customFields": {}
  }
]
```

### Get Product by ID

Retrieves a specific product by ID.

**Endpoint:** `GET /products/{id}`

**Response:**

```json
{
  "id": "uuid-string",
  "name": "Laptop",
  "price": 1200.0,
  "description": "High-performance laptop",
  "stock": 10,
  "category": "Electronics",
  "imageUrl": "https://example.com/image.jpg",
  "customFields": {}
}
```

### Create Product

Creates a new product.

**Endpoint:** `POST /products`

**Request Body:**

```json
{
  "name": "New Product",
  "price": 49.99,
  "description": "New product description",
  "stock": 50,
  "category": "Clothing"
}
```

**Response:**

```json
{
  "id": "generated-uuid",
  "name": "New Product",
  "price": 49.99,
  "description": "New product description",
  "stock": 50,
  "category": "Clothing",
  "customFields": {}
}
```

### Update Product

Updates an existing product.

**Endpoint:** `PUT /products/{id}`

**Request Body:**

```json
{
  "name": "Updated Product",
  "price": 59.99,
  "description": "Updated description",
  "stock": 40,
  "category": "Clothing"
}
```

**Response:**

```json
{
  "id": "uuid-string",
  "name": "Updated Product",
  "price": 59.99,
  "description": "Updated description",
  "stock": 40,
  "category": "Clothing",
  "customFields": {}
}
```

### Delete Product

Deletes a product.

**Endpoint:** `DELETE /products/{id}`

**Response:** HTTP 204 No Content

### Get Products by Category

Retrieves products by category.

**Endpoint:** `GET /products/category/{category}`

**Response:**

```json
[
  {
    "id": "uuid-string",
    "name": "Laptop",
    "price": 1200.0,
    "description": "High-performance laptop",
    "stock": 10,
    "category": "Electronics",
    "customFields": {}
  }
]
```

### Search Products

Searches for products by a query string.

**Endpoint:** `GET /products/search?query={searchTerm}`

**Response:**

```json
[
  {
    "id": "uuid-string",
    "name": "Laptop",
    "price": 1200.0,
    "description": "High-performance laptop",
    "stock": 10,
    "category": "Electronics",
    "customFields": {}
  }
]
```

### Update Product Stock

Updates the stock quantity for a product.

**Endpoint:** `PATCH /products/{id}/stock`

**Request Parameters:**

- `quantity`: The quantity to add (positive) or remove (negative)

**Response:**

```json
{
  "id": "uuid-string",
  "name": "Laptop",
  "price": 1200.0,
  "description": "High-performance laptop",
  "stock": 75,
  "category": "Electronics",
  "customFields": {}
}
```

### Get All Categories

Retrieves all available product categories.

**Endpoint:** `GET /products/categories`

**Response:**

```json
["Electronics", "Clothing", "Footwear", "Home", "Kitchen"]
```

### Filter by Price Range

Retrieves products within a specified price range.

**Endpoint:** `GET /products/filter/price`

**Request Parameters:**

- `minPrice`: The minimum price (inclusive)
- `maxPrice`: The maximum price (inclusive)

**Example:** `/products/filter/price?minPrice=20&maxPrice=100`

**Response:**

```json
[
  {
    "id": "uuid-string",
    "name": "T-Shirt",
    "price": 25.0,
    "description": "Cotton t-shirt",
    "stock": 50,
    "category": "Clothing",
    "customFields": {}
  },
  {
    "id": "uuid-string",
    "name": "Running Shoes",
    "price": 95.0,
    "description": "Sports running shoes",
    "stock": 25,
    "category": "Footwear",
    "customFields": {}
  }
]
```

### Sort by Name

Retrieves all products sorted by name.

**Endpoint:** `GET /products/sort/name`

**Request Parameters:**

- `ascending`: Boolean indicating sort direction (default: true)

**Example:** `/products/sort/name?ascending=false` (Z to A)

**Response:**

```json
[
  {
    "id": "uuid-string",
    "name": "T-Shirt",
    "price": 25.0,
    "description": "Cotton t-shirt",
    "stock": 50,
    "category": "Clothing",
    "customFields": {}
  },
  {
    "id": "uuid-string",
    "name": "Smartphone",
    "price": 800.0,
    "description": "Latest smartphone",
    "stock": 15,
    "category": "Electronics",
    "customFields": {}
  }
]
```

### Sort by Price

Retrieves all products sorted by price.

**Endpoint:** `GET /products/sort/price`

**Request Parameters:**

- `ascending`: Boolean indicating sort direction (default: true)

**Example:** `/products/sort/price?ascending=false` (high to low)

**Response:**

```json
[
  {
    "id": "uuid-string",
    "name": "Laptop",
    "price": 1200.0,
    "description": "High-performance laptop",
    "stock": 10,
    "category": "Electronics",
    "customFields": {}
  },
  {
    "id": "uuid-string",
    "name": "Smartphone",
    "price": 800.0,
    "description": "Latest smartphone",
    "stock": 15,
    "category": "Electronics",
    "customFields": {}
  }
]
```

### Advanced Filtering

Applies multiple filtering and sorting criteria at once.

**Endpoint:** `GET /products/filter`

**Request Parameters:**

- `category` (optional): Category to filter by
- `minPrice` (optional): Minimum price
- `maxPrice` (optional): Maximum price
- `sortBy` (optional): Field to sort by ("name" or "price", default: "name")
- `ascending` (optional): Sort direction (default: true)

**Example 1:** `/products/filter?category=Electronics&minPrice=500&sortBy=price&ascending=false`

**Example 2:** `/products/filter?minPrice=20&maxPrice=100&sortBy=name`

**Response:**

```json
[
  {
    "id": "uuid-string",
    "name": "Coffee Maker",
    "price": 120.0,
    "description": "Automatic coffee maker",
    "stock": 15,
    "category": "Kitchen",
    "customFields": {}
  },
  {
    "id": "uuid-string",
    "name": "Desk Lamp",
    "price": 35.0,
    "description": "LED desk lamp",
    "stock": 40,
    "category": "Home",
    "customFields": {}
  }
]
```

---

## Cart API

### Get Cart

Retrieves a user's cart.

**Endpoint:** `GET /carts/{userId}`

**Response:**

```json
{
  "userId": "user-uuid",
  "items": [
    {
      "productId": "product-uuid",
      "productName": "Laptop",
      "quantity": 2,
      "price": 1200.0
    }
  ],
  "totalAmount": 2400.0,
  "customFields": {}
}
```

### Create Cart

Creates a new cart for a user.

**Endpoint:** `POST /carts/{userId}`

**Response:**

```json
{
  "userId": "user-uuid",
  "items": [],
  "totalAmount": 0.0,
  "customFields": {}
}
```

### Add Item to Cart

Adds a product to the cart.

**Endpoint:** `POST /carts/{userId}/items`

**Request Parameters:**

- `productId`: The ID of the product to add
- `quantity`: The quantity to add

**Response:**

```json
{
  "userId": "user-uuid",
  "items": [
    {
      "productId": "product-uuid",
      "productName": "Laptop",
      "quantity": 2,
      "price": 1200.0
    }
  ],
  "totalAmount": 2400.0,
  "customFields": {}
}
```

### Update Cart Item

Updates the quantity of a product in the cart.

**Endpoint:** `PUT /carts/{userId}/items/{productId}`

**Request Parameters:**

- `quantity`: The new quantity

**Response:**

```json
{
  "userId": "user-uuid",
  "items": [
    {
      "productId": "product-uuid",
      "productName": "Laptop",
      "quantity": 3,
      "price": 1200.0
    }
  ],
  "totalAmount": 3600.0,
  "customFields": {}
}
```

### Remove Item from Cart

Removes a product from the cart.

**Endpoint:** `DELETE /carts/{userId}/items/{productId}`

**Response:**

```json
{
  "userId": "user-uuid",
  "items": [],
  "totalAmount": 0.0,
  "customFields": {}
}
```

### Clear Cart

Removes all items from the cart.

**Endpoint:** `DELETE /carts/{userId}`

**Response:**

```json
{
  "userId": "user-uuid",
  "items": [],
  "totalAmount": 0.0,
  "customFields": {}
}
```

### Get Cart Size

Gets the number of items in the cart.

**Endpoint:** `GET /carts/{userId}/size`

**Response:**

```
2
```

### Get Cart Total

Gets the total amount of the cart.

**Endpoint:** `GET /carts/{userId}/total`

**Response:**

```
2400.0
```

---

## Order API

### Get All Orders

Retrieves all orders.

**Endpoint:** `GET /orders`

**Response:**

```json
[
  {
    "id": "order-uuid",
    "userId": "user-uuid",
    "items": [
      {
        "productId": "product-uuid",
        "productName": "Laptop",
        "quantity": 2,
        "price": 1200.0
      }
    ],
    "totalAmount": 2400.0,
    "status": "PENDING",
    "createdAt": "2023-05-18T10:30:45.123",
    "customFields": {}
  }
]
```

### Get Order by ID

Retrieves a specific order by ID.

**Endpoint:** `GET /orders/{id}`

**Response:**

```json
{
  "id": "order-uuid",
  "userId": "user-uuid",
  "items": [
    {
      "productId": "product-uuid",
      "productName": "Laptop",
      "quantity": 2,
      "price": 1200.0
    }
  ],
  "totalAmount": 2400.0,
  "status": "PENDING",
  "createdAt": "2023-05-18T10:30:45.123",
  "customFields": {}
}
```

### Get Orders by User

Retrieves all orders for a specific user.

**Endpoint:** `GET /orders/user/{userId}`

**Response:**

```json
[
  {
    "id": "order-uuid",
    "userId": "user-uuid",
    "items": [
      {
        "productId": "product-uuid",
        "productName": "Laptop",
        "quantity": 2,
        "price": 1200.0
      }
    ],
    "totalAmount": 2400.0,
    "status": "PENDING",
    "createdAt": "2023-05-18T10:30:45.123",
    "customFields": {}
  }
]
```

### Create Order from Cart

Creates a new order based on the user's current cart.

**Endpoint:** `POST /orders/user/{userId}`

**Response:**

```json
{
  "id": "new-order-uuid",
  "userId": "user-uuid",
  "items": [
    {
      "productId": "product-uuid",
      "productName": "Laptop",
      "quantity": 2,
      "price": 1200.0
    }
  ],
  "totalAmount": 2400.0,
  "status": "PENDING",
  "createdAt": "2023-05-18T10:30:45.123",
  "customFields": {}
}
```

### Update Order Status

Updates the status of an order.

**Endpoint:** `PATCH /orders/{id}/status`

**Request Parameters:**

- `status`: The new status (e.g., "SHIPPED", "DELIVERED", "CANCELLED")

**Response:**

```json
{
  "id": "order-uuid",
  "userId": "user-uuid",
  "items": [
    {
      "productId": "product-uuid",
      "productName": "Laptop",
      "quantity": 2,
      "price": 1200.0
    }
  ],
  "totalAmount": 2400.0,
  "status": "SHIPPED",
  "createdAt": "2023-05-18T10:30:45.123",
  "customFields": {}
}
```

### Cancel Order

Cancels an order.

**Endpoint:** `DELETE /orders/{id}`

**Response:** HTTP 204 No Content

### Get Orders by Status

Retrieves orders by status.

**Endpoint:** `GET /orders/status/{status}`

**Response:**

```json
[
  {
    "id": "order-uuid",
    "userId": "user-uuid",
    "items": [
      {
        "productId": "product-uuid",
        "productName": "Laptop",
        "quantity": 2,
        "price": 1200.0
      }
    ],
    "totalAmount": 2400.0,
    "status": "PENDING",
    "createdAt": "2023-05-18T10:30:45.123",
    "customFields": {}
  }
]
```

### Get Order Count

Gets the number of orders for a user.

**Endpoint:** `GET /orders/user/{userId}/count`

**Response:**

```
3
```

### Get Total Spent

Gets the total amount spent by a user across all orders.

**Endpoint:** `GET /orders/user/{userId}/total-spent`

**Response:**

```
5200.0
```

---

## Response Codes

| Status Code | Description                                                                          |
| ----------- | ------------------------------------------------------------------------------------ |
| 200         | OK - The request was successful                                                      |
| 201         | Created - A new resource was successfully created                                    |
| 204         | No Content - The request was successful but there is no content to return            |
| 400         | Bad Request - The request could not be understood or was missing required parameters |
| 401         | Unauthorized - Authentication failed or user doesn't have permissions                |
| 404         | Not Found - Resource not found                                                       |
| 500         | Internal Server Error - An error occurred on the server                              |

## Notes for Developers

1. This API uses in-memory storage in the development version, so data will be lost when the server restarts.
2. All endpoints support cross-origin requests via CORS.
3. The models support custom fields via the `customFields` property which can be used to extend the data model.
4. For filtering and sorting, use the combined `/products/filter` endpoint to apply multiple criteria at once.
5. This API is designed for educational purposes and should be modified for production use (adding proper security, database persistence, etc.).
