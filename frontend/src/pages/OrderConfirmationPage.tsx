import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { orderApi } from '../services/api';
import type { Order } from '../services/api';
import { Button } from '../components/ui/button';
import { ShoppingBag, CheckCircle, Clock, Package } from 'lucide-react';
import toast from 'react-hot-toast';

const OrderConfirmationPage: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const navigate = useNavigate();
  const [order, setOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrder = async () => {
      if (!orderId) {
        setError('No order ID provided');
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        const response = await orderApi.getById(orderId);
        setOrder(response.data);
      } catch (err) {
        console.error('Failed to fetch order', err);
        setError('Failed to load order details. Please try again later.');
        toast.error('Could not load order details');
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrder();
  }, [orderId]);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded w-1/3 mx-auto mb-8"></div>
            <div className="h-24 bg-gray-200 rounded mb-8"></div>
            <div className="h-64 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-md mx-auto">
          <ShoppingBag className="mx-auto h-16 w-16 text-gray-400 mb-4" />
          <h1 className="text-2xl font-bold mb-4">Order Not Found</h1>
          <p className="text-gray-600 mb-8">{error || 'We could not find the order you are looking for.'}</p>
          <Button onClick={() => navigate('/profile')}>Go to Your Orders</Button>
        </div>
      </div>
    );
  }

  const orderDate = new Date(order.createdAt);
  const formattedDate = orderDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  const formattedTime = orderDate.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8 text-center">
          <CheckCircle className="mx-auto h-16 w-16 text-green-500 mb-4" />
          <h1 className="text-3xl font-bold mb-2">Thank You for Your Order!</h1>
          <p className="text-gray-600 mb-6">
            Your order has been placed successfully. We've sent a confirmation email to your registered email address.
          </p>
          <div className="inline-block bg-gray-100 rounded-lg px-6 py-3 mb-6">
            <span className="text-gray-500">Order ID: </span>
            <span className="font-medium">{order.id}</span>
          </div>
          <div className="flex items-center justify-center text-green-600 mb-6">
            <Clock className="h-5 w-5 mr-2" />
            <span>
              Order placed on {formattedDate} at {formattedTime}
            </span>
          </div>
          <div className="flex justify-center space-x-4">
            <Button onClick={() => navigate('/profile')}>Track Your Order</Button>
            <Button variant="outline" onClick={() => navigate('/products')}>
              Continue Shopping
            </Button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-xl font-bold mb-4 flex items-center">
            <Package className="h-5 w-5 mr-2 text-primary" />
            Order Summary
          </h2>
          <div className="border-b pb-4 mb-4">
            <div className="flex justify-between text-gray-600 mb-2">
              <span>Status</span>
              <span className="font-medium text-green-600">{order.status}</span>
            </div>
          </div>
          <div className="mb-6">
            {order.items.map((item) => (
              <div key={item.productId} className="flex justify-between py-3 border-b">
                <div>
                  <p className="font-medium">{item.productName}</p>
                  <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                </div>
                <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal</span>
              <span>${order.totalAmount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Tax</span>
              <span>${(order.totalAmount * 0.1).toFixed(2)}</span>
            </div>
            <div className="border-t pt-2 mt-2"></div>
            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>${(order.totalAmount + order.totalAmount * 0.1).toFixed(2)}</span>
            </div>
          </div>
        </div>

        <div className="text-center">
          <p className="text-gray-600 mb-4">Need help with your order?</p>
          <Link to="/contact" className="text-primary hover:underline">
            Contact Customer Support
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmationPage;
