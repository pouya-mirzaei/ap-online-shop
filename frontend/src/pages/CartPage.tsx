import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/ui/button';
import { Trash, Plus, Minus, ShoppingBag, ArrowLeft } from 'lucide-react';

const CartPage: React.FC = () => {
  const { cart, isLoading, totalAmount, updateCartItem, removeFromCart, clearCart } = useCart();
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  const handleCheckout = async () => {
    if (!isAuthenticated || !user) {
      navigate('/login?redirect=cart');
      return;
    }

    // Navigate to checkout page
    navigate('/checkout');
  };

  const handleUpdateQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
    } else {
      updateCartItem(productId, newQuantity);
    }
  };

  // Generate a colorful product image based on product name
  const getProductImage = (productId: string, productName: string) => {
    // Create a colorful background with the first letter of the product name
    const firstLetter = productName.charAt(0).toUpperCase();
    const colors = ['FF6B6B', '4ECDC4', 'F9DC5C', '40C057', '7950F2', '4263EB', '1098AD', 'F06595', 'E67700', '212529'];

    // Use product id to select a consistent color for the same product
    const colorIndex = productId.charCodeAt(0) % colors.length;
    const bgColor = colors[colorIndex];

    return `https://ui-avatars.com/api/?name=${firstLetter}&background=${bgColor}&color=fff&size=200&bold=true`;
  };

  if (!isAuthenticated) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-md mx-auto">
          <ShoppingBag className="mx-auto h-16 w-16 text-gray-400 mb-4" />
          <h1 className="text-2xl font-bold mb-4">Your Shopping Cart</h1>
          <p className="text-gray-600 mb-8">Please sign in to view your cart and continue shopping.</p>
          <div className="space-y-4">
            <Button className="w-full" onClick={() => navigate('/login?redirect=cart')}>
              Sign In
            </Button>
            <Button variant="outline" className="w-full" onClick={() => navigate('/products')}>
              Continue Shopping
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-8">Your Shopping Cart</h1>
        <div className="animate-pulse">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="flex gap-4 border-b py-4">
              <div className="bg-gray-300 h-24 w-24 rounded"></div>
              <div className="flex-1">
                <div className="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-300 rounded w-1/4 mb-2"></div>
                <div className="h-4 bg-gray-300 rounded w-1/2"></div>
              </div>
              <div className="h-8 bg-gray-300 rounded w-24"></div>
            </div>
          ))}
          <div className="mt-8 w-full md:w-1/3 ml-auto">
            <div className="h-6 bg-gray-300 rounded w-full mb-2"></div>
            <div className="h-10 bg-gray-300 rounded w-full"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!cart || cart.items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-md mx-auto">
          <ShoppingBag className="mx-auto h-16 w-16 text-gray-400 mb-4" />
          <h1 className="text-2xl font-bold mb-4">Your Cart is Empty</h1>
          <p className="text-gray-600 mb-8">Looks like you haven't added anything to your cart yet.</p>
          <Button onClick={() => navigate('/products')}>Start Shopping</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link to="/products" className="inline-flex items-center text-primary hover:underline mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Continue Shopping
      </Link>

      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Your Shopping Cart</h1>
        <Button variant="outline" size="sm" onClick={clearCart}>
          <Trash className="mr-2 h-4 w-4" />
          Clear Cart
        </Button>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-2/3">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 text-gray-700">
                  <tr>
                    <th className="py-4 px-6 text-left">Product</th>
                    <th className="py-4 px-6 text-center">Price</th>
                    <th className="py-4 px-6 text-center">Quantity</th>
                    <th className="py-4 px-6 text-right">Total</th>
                    <th className="py-4 px-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.items.map((item) => (
                    <tr key={item.productId} className="border-t border-gray-200">
                      <td className="py-4 px-6">
                        <div className="flex items-center">
                          <Link to={`/products/${item.productId}`} className="flex-shrink-0">
                            <img
                              src={getProductImage(item.productId, item.productName)}
                              alt={item.productName}
                              className="w-16 h-16 object-cover rounded"
                            />
                          </Link>
                          <div className="ml-4">
                            <Link to={`/products/${item.productId}`} className="font-medium text-gray-900 hover:text-primary">
                              {item.productName}
                            </Link>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-center">${item.price.toFixed(2)}</td>
                      <td className="py-4 px-6">
                        <div className="flex items-center justify-center">
                          <button
                            className="p-1 rounded-full hover:bg-gray-200"
                            onClick={() => handleUpdateQuantity(item.productId, item.quantity - 1)}
                          >
                            <Minus size={14} />
                          </button>
                          <span className="mx-2 w-8 text-center">{item.quantity}</span>
                          <button
                            className="p-1 rounded-full hover:bg-gray-200"
                            onClick={() => handleUpdateQuantity(item.productId, item.quantity + 1)}
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-right font-medium">${(item.price * item.quantity).toFixed(2)}</td>
                      <td className="py-4 px-6 text-right">
                        <button className="text-red-500 hover:text-red-700" onClick={() => removeFromCart(item.productId)}>
                          <Trash size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="lg:w-1/3">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-bold mb-4">Order Summary</h2>
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal ({cart.items.reduce((acc, item) => acc + item.quantity, 0)} items)</span>
                <span>${cart.totalAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="border-t pt-3 mt-3"></div>
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>${totalAmount.toFixed(2)}</span>
              </div>
            </div>
            <Button className="w-full" size="lg" onClick={handleCheckout}>
              Proceed to Checkout
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
