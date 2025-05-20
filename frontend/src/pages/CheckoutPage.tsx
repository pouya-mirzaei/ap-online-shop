import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/ui/button';
import { ShoppingBag, Truck, Check, ArrowLeft } from 'lucide-react';
import { orderApi } from '../services/api';
import toast from 'react-hot-toast';

interface ShippingInfo {
  fullName: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  phone: string;
}

const CheckoutPage: React.FC = () => {
  const { cart, totalAmount, clearCart, isLoading } = useCart();
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState<'shipping' | 'confirmation'>('shipping');

  const [shippingInfo, setShippingInfo] = useState<ShippingInfo>({
    fullName: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    phone: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  if (!isAuthenticated) {
    navigate('/login?redirect=checkout');
    return null;
  }

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-8">Checkout</h1>
        <div className="animate-pulse">
          <div className="h-8 bg-gray-300 rounded w-1/4 mb-4"></div>
          <div className="h-64 bg-gray-200 rounded mb-8"></div>
          <div className="h-8 bg-gray-300 rounded w-1/2 mb-4"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
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
          <p className="text-gray-600 mb-8">You need to add items to your cart before checking out.</p>
          <Button onClick={() => navigate('/products')}>Start Shopping</Button>
        </div>
      </div>
    );
  }

  const validateShippingForm = () => {
    const newErrors: Record<string, string> = {};

    if (!shippingInfo.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!shippingInfo.address.trim()) newErrors.address = 'Address is required';
    if (!shippingInfo.city.trim()) newErrors.city = 'City is required';
    if (!shippingInfo.state.trim()) newErrors.state = 'State is required';
    if (!shippingInfo.zipCode.trim()) newErrors.zipCode = 'ZIP code is required';
    if (!shippingInfo.country.trim()) newErrors.country = 'Country is required';
    if (!shippingInfo.phone.trim()) newErrors.phone = 'Phone number is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateShippingForm()) {
      setCurrentStep('confirmation');
    }
  };

  const handlePlaceOrder = async () => {
    if (!user) return;

    try {
      setIsSubmitting(true);

      // Create order from cart using API
      const response = await orderApi.createFromCart(user.id);

      // Clear the cart after successful order
      await clearCart();

      toast.success('Order placed successfully!');

      // Redirect to a success page or order details page
      navigate(`/order-confirmation/${response.data.id}`);
    } catch (error) {
      console.error('Failed to place order', error);
      toast.error('Failed to place order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <button onClick={() => navigate('/cart')} className="flex items-center text-primary hover:underline mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Return to Cart
      </button>

      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold">Checkout</h1>
        <div className="flex justify-center mt-4">
          <div className={`flex items-center ${currentStep === 'shipping' ? 'text-primary' : 'text-gray-500'}`}>
            <div className="rounded-full w-8 h-8 flex items-center justify-center border-2 border-current">
              <span>1</span>
            </div>
            <span className="ml-2">Shipping</span>
          </div>
          <div className="w-16 h-1 mx-2 bg-gray-200">
            <div className={`h-full bg-primary transition-all ${currentStep !== 'shipping' ? 'w-full' : 'w-0'}`}></div>
          </div>
          <div className={`flex items-center ${currentStep === 'confirmation' ? 'text-primary' : 'text-gray-500'}`}>
            <div className="rounded-full w-8 h-8 flex items-center justify-center border-2 border-current">
              <span>2</span>
            </div>
            <span className="ml-2">Confirmation</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-2/3">
          {currentStep === 'shipping' && (
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center mb-4">
                <Truck className="text-primary mr-2" />
                <h2 className="text-xl font-bold">Shipping Information</h2>
              </div>

              <form onSubmit={handleShippingSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <input
                      type="text"
                      className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${
                        errors.fullName ? 'border-red-500' : 'border-gray-300'
                      }`}
                      value={shippingInfo.fullName}
                      onChange={(e) => setShippingInfo({ ...shippingInfo, fullName: e.target.value })}
                    />
                    {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
                  </div>

                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                    <input
                      type="text"
                      className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${
                        errors.address ? 'border-red-500' : 'border-gray-300'
                      }`}
                      value={shippingInfo.address}
                      onChange={(e) => setShippingInfo({ ...shippingInfo, address: e.target.value })}
                    />
                    {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                    <input
                      type="text"
                      className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${
                        errors.city ? 'border-red-500' : 'border-gray-300'
                      }`}
                      value={shippingInfo.city}
                      onChange={(e) => setShippingInfo({ ...shippingInfo, city: e.target.value })}
                    />
                    {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                    <input
                      type="text"
                      className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${
                        errors.state ? 'border-red-500' : 'border-gray-300'
                      }`}
                      value={shippingInfo.state}
                      onChange={(e) => setShippingInfo({ ...shippingInfo, state: e.target.value })}
                    />
                    {errors.state && <p className="text-red-500 text-sm mt-1">{errors.state}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">ZIP Code</label>
                    <input
                      type="text"
                      className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${
                        errors.zipCode ? 'border-red-500' : 'border-gray-300'
                      }`}
                      value={shippingInfo.zipCode}
                      onChange={(e) => setShippingInfo({ ...shippingInfo, zipCode: e.target.value })}
                    />
                    {errors.zipCode && <p className="text-red-500 text-sm mt-1">{errors.zipCode}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                    <input
                      type="text"
                      className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${
                        errors.country ? 'border-red-500' : 'border-gray-300'
                      }`}
                      value={shippingInfo.country}
                      onChange={(e) => setShippingInfo({ ...shippingInfo, country: e.target.value })}
                    />
                    {errors.country && <p className="text-red-500 text-sm mt-1">{errors.country}</p>}
                  </div>

                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                    <input
                      type="tel"
                      className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${
                        errors.phone ? 'border-red-500' : 'border-gray-300'
                      }`}
                      value={shippingInfo.phone}
                      onChange={(e) => setShippingInfo({ ...shippingInfo, phone: e.target.value })}
                    />
                    {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                  </div>
                </div>

                <div className="mt-6">
                  <Button type="submit" className="w-full">
                    Continue to Confirmation
                  </Button>
                </div>
              </form>
            </div>
          )}

          {currentStep === 'confirmation' && (
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center mb-6">
                <Check className="text-primary mr-2" />
                <h2 className="text-xl font-bold">Order Confirmation</h2>
              </div>

              <div className="border-b pb-4 mb-4">
                <h3 className="font-medium text-gray-700 mb-2">Shipping Information</h3>
                <p className="text-gray-600">{shippingInfo.fullName}</p>
                <p className="text-gray-600">{shippingInfo.address}</p>
                <p className="text-gray-600">
                  {shippingInfo.city}, {shippingInfo.state} {shippingInfo.zipCode}
                </p>
                <p className="text-gray-600">{shippingInfo.country}</p>
                <p className="text-gray-600">{shippingInfo.phone}</p>
              </div>

              <div className="mt-6 flex space-x-4">
                <Button variant="outline" type="button" onClick={() => setCurrentStep('shipping')} className="w-1/2">
                  Back to Shipping
                </Button>
                <Button onClick={handlePlaceOrder} disabled={isSubmitting} className="w-1/2">
                  {isSubmitting ? 'Processing...' : 'Place Order'}
                </Button>
              </div>
            </div>
          )}
        </div>

        <div className="lg:w-1/3">
          <div className="bg-white rounded-lg shadow-sm p-6 sticky top-8">
            <h2 className="text-lg font-bold mb-4">Order Summary</h2>

            <div className="space-y-3 mb-4">
              {cart.items.map((item) => (
                <div key={item.productId} className="flex justify-between items-center py-2 border-b">
                  <div className="flex items-center">
                    <div className="ml-2">
                      <p className="font-medium">{item.productName}</p>
                      <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                    </div>
                  </div>
                  <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal ({cart.items.reduce((acc, item) => acc + item.quantity, 0)} items)</span>
                <span>${cart.totalAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Tax</span>
                <span>${(totalAmount * 0.1).toFixed(2)}</span>
              </div>
              <div className="border-t pt-3 mt-3"></div>
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>${(totalAmount + totalAmount * 0.1).toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
