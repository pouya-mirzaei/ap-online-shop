import axios from 'axios';

// API base URL
const API_URL = 'http://localhost:8080/api';

// Create Axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Types
export interface User {
  id: string;
  username: string;
  email: string;
  role: string;
  customFields: Record<string, any>;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  stock: number;
  category: string;
  imageUrl: string;
  customFields: Record<string, any>;
}

export interface CartItem {
  productId: string;
  productName: string;
  quantity: number;
  price: number;
}

export interface Cart {
  userId: string;
  items: CartItem[];
  totalAmount: number;
  customFields: Record<string, any>;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  totalAmount: number;
  status: string;
  createdAt: string;
  customFields: Record<string, any>;
}

export interface ProductFilterParams {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
  sortBy?: 'price_asc' | 'price_desc' | 'name_asc' | 'name_desc';
}

// User API
export const userApi = {
  getAll: () => api.get<User[]>('/users'),
  getById: (id: string) => api.get<User>(`/users/${id}`),
  create: (userData: Omit<User, 'id' | 'customFields'> & { password: string }) => api.post<User>('/users', userData),
  update: (id: string, userData: Partial<User> & { password?: string }) => api.put<User>(`/users/${id}`, userData),
  delete: (id: string) => api.delete(`/users/${id}`),
  login: (username: string, password: string) => api.post<User>('/users/login', { username, password }),
  getByUsername: (username: string) => api.get<User>(`/users/username/${username}`),
  getByEmail: (email: string) => api.get<User>(`/users/email/${email}`),
};

// Product API
export const productApi = {
  getAll: () => api.get<Product[]>('/products'),
  getById: (id: string) => api.get<Product>(`/products/${id}`),
  create: (productData: Omit<Product, 'id' | 'customFields'>) => api.post<Product>('/products', productData),
  update: (id: string, productData: Partial<Product>) => api.put<Product>(`/products/${id}`, productData),
  delete: (id: string) => api.delete(`/products/${id}`),
  getByCategory: (category: string) => api.get<Product[]>(`/products/category/${category}`),
  search: (query: string) => api.get<Product[]>(`/products/search?query=${query}`),
  updateStock: (id: string, quantity: number) => api.patch<Product>(`/products/${id}/stock?quantity=${quantity}`),

  // New backend filtering routes
  filter: (params: ProductFilterParams) => {
    // Build query string from params
    const queryParams = new URLSearchParams();

    if (params.category) queryParams.append('category', params.category);
    if (params.minPrice !== undefined) queryParams.append('minPrice', params.minPrice.toString());
    if (params.maxPrice !== undefined) queryParams.append('maxPrice', params.maxPrice.toString());
    if (params.search) queryParams.append('search', params.search);
    if (params.sortBy) queryParams.append('sortBy', params.sortBy);

    const queryString = queryParams.toString();
    return api.get<Product[]>(`/products/filter${queryString ? `?${queryString}` : ''}`);
  },

  // Shortcuts for common filter combinations
  getFiltered: (category?: string, search?: string) => {
    const params: ProductFilterParams = {};
    if (category) params.category = category;
    if (search) params.search = search;
    return productApi.filter(params);
  },

  getPriceRange: (minPrice?: number, maxPrice?: number) => {
    const params: ProductFilterParams = {};
    if (minPrice !== undefined) params.minPrice = minPrice;
    if (maxPrice !== undefined) params.maxPrice = maxPrice;
    return productApi.filter(params);
  },

  getSorted: (sortBy: 'price_asc' | 'price_desc' | 'name_asc' | 'name_desc') => {
    return productApi.filter({ sortBy });
  },
};

// Cart API
export const cartApi = {
  getCart: (userId: string) => api.get<Cart>(`/carts/${userId}`),
  createCart: (userId: string) => api.post<Cart>(`/carts/${userId}`),
  addItem: (userId: string, productId: string, quantity: number) =>
    api.post<Cart>(`/carts/${userId}/items?productId=${productId}&quantity=${quantity}`),
  updateItem: (userId: string, productId: string, quantity: number) =>
    api.put<Cart>(`/carts/${userId}/items/${productId}?quantity=${quantity}`),
  removeItem: (userId: string, productId: string) => api.delete<Cart>(`/carts/${userId}/items/${productId}`),
  clearCart: (userId: string) => api.delete<Cart>(`/carts/${userId}`),
  getCartSize: (userId: string) => api.get<number>(`/carts/${userId}/size`),
  getCartTotal: (userId: string) => api.get<number>(`/carts/${userId}/total`),
};

// Order API
export const orderApi = {
  getAll: () => api.get<Order[]>('/orders'),
  getById: (id: string) => api.get<Order>(`/orders/${id}`),
  getByUser: (userId: string) => api.get<Order[]>(`/orders/user/${userId}`),
  createFromCart: (userId: string) => api.post<Order>(`/orders/user/${userId}`),
  updateStatus: (id: string, status: string) => api.patch<Order>(`/orders/${id}/status?status=${status}`),
  cancelOrder: (id: string) => api.delete(`/orders/${id}`),
  getByStatus: (status: string) => api.get<Order[]>(`/orders/status/${status}`),
  getOrderCount: (userId: string) => api.get<number>(`/orders/user/${userId}/count`),
  getTotalSpent: (userId: string) => api.get<number>(`/orders/user/${userId}/total-spent`),
};

export default {
  user: userApi,
  product: productApi,
  cart: cartApi,
  order: orderApi,
};
