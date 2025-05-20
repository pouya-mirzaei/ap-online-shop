import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
import { ProductProvider } from './contexts/ProductContext';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import OrderConfirmationPage from './pages/OrderConfirmationPage';
import OrdersPage from './pages/OrdersPage';
import SearchPage from './pages/SearchPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import AdminRoute from './components/AdminRoute';
import AddProductPage from './pages/admin/AddProductPage';
import EditProductPage from './pages/admin/EditProductPage';
import AddUserPage from './pages/admin/AddUserPage';
import EditUserPage from './pages/admin/EditUserPage';
import AdminPage from './pages/admin/AdminPage';
import AdminOrdersPage from './pages/admin/AdminOrdersPage';

const App: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        <ProductProvider>
          <CartProvider>
            <Toaster position="top-right" />
            <div className="flex flex-col min-h-screen">
              <Navbar />
              <main className="flex-grow bg-gray-50">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/products" element={<ProductsPage />} />
                  <Route path="/products/:id" element={<ProductDetailPage />} />
                  <Route path="/categories" element={<ProductsPage />} />
                  <Route path="/categories/:category" element={<ProductsPage />} />
                  <Route path="/cart" element={<CartPage />} />
                  <Route path="/checkout" element={<CheckoutPage />} />
                  <Route path="/order-confirmation/:orderId" element={<OrderConfirmationPage />} />
                  <Route path="/orders" element={<OrdersPage />} />
                  <Route path="/search" element={<SearchPage />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/register" element={<RegisterPage />} />
                  <Route path="/profile" element={<ProfilePage />} />
                  <Route
                    path="/admin"
                    element={
                      <AdminRoute>
                        <AdminPage />
                      </AdminRoute>
                    }
                  />
                  <Route
                    path="/admin/orders"
                    element={
                      <AdminRoute>
                        <AdminOrdersPage />
                      </AdminRoute>
                    }
                  />
                  <Route
                    path="/admin/products/add"
                    element={
                      <AdminRoute>
                        <AddProductPage />
                      </AdminRoute>
                    }
                  />
                  <Route
                    path="/admin/products/edit/:id"
                    element={
                      <AdminRoute>
                        <EditProductPage />
                      </AdminRoute>
                    }
                  />
                  <Route
                    path="/admin/users/add"
                    element={
                      <AdminRoute>
                        <AddUserPage />
                      </AdminRoute>
                    }
                  />
                  <Route
                    path="/admin/users/edit/:id"
                    element={
                      <AdminRoute>
                        <EditUserPage />
                      </AdminRoute>
                    }
                  />
                </Routes>
              </main>
              <footer className="bg-white border-t border-gray-200 py-6">
                <div className="container mx-auto px-4">
                  <div className="text-center text-gray-500 text-sm">© {new Date().getFullYear()} ShopOnline. All rights reserved.</div>
                </div>
              </footer>
            </div>
          </CartProvider>
        </ProductProvider>
      </AuthProvider>
    </Router>
  );
};

export default App;
