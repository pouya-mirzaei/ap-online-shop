import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { orderApi } from '../services/api';
import type { Order } from '../services/api';
import { Button } from '../components/ui/button';
import { ShoppingBag, Package, Clock, Filter, ChevronRight, Search } from 'lucide-react';
import toast from 'react-hot-toast';

const OrdersPage: React.FC = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login?redirect=orders');
      return;
    }

    const fetchOrders = async () => {
      if (!user) return;

      try {
        setIsLoading(true);
        const response = await orderApi.getByUser(user.id);
        setOrders(response.data);
      } catch (error) {
        console.error('Failed to fetch orders', error);
        toast.error('Failed to load your orders. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, [user, isAuthenticated, navigate]);

  const getStatusColor = (status: string) => {
    switch (status.toUpperCase()) {
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800';
      case 'SHIPPED':
        return 'bg-blue-100 text-blue-800';
      case 'DELIVERED':
        return 'bg-green-100 text-green-800';
      case 'CANCELLED':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const filteredOrders = orders
    .filter((order) => {
      // Filter by status
      if (statusFilter !== 'ALL') {
        return order.status.toUpperCase() === statusFilter;
      }
      return true;
    })
    .filter((order) => {
      // Filter by search query
      if (!searchQuery.trim()) return true;

      // Search in order ID or product names
      const query = searchQuery.toLowerCase();
      const matchesOrderId = order.id.toLowerCase().includes(query);
      const matchesProduct = order.items.some((item) => item.productName.toLowerCase().includes(query));

      return matchesOrderId || matchesProduct;
    });

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-8">Your Orders</h1>
        <div className="animate-pulse">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="mb-4 p-6 bg-gray-100 rounded-lg">
              <div className="h-6 bg-gray-300 rounded w-1/4 mb-4"></div>
              <div className="h-4 bg-gray-300 rounded w-1/2 mb-2"></div>
              <div className="h-4 bg-gray-300 rounded w-1/3"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // Redirect happens in useEffect
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Your Orders</h1>

      {/* Filter and Search */}
      <div className="flex flex-col md:flex-row justify-between mb-8 gap-4">
        <div className="flex items-center space-x-2">
          <Filter className="h-5 w-5 text-gray-500" />
          <span className="text-gray-700">Filter by status:</span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="ALL">All Orders</option>
            <option value="PENDING">Pending</option>
            <option value="SHIPPED">Shipped</option>
            <option value="DELIVERED">Delivered</option>
            <option value="CANCELLED">Cancelled</option>
          </select>
        </div>

        <div className="relative">
          <input
            type="text"
            placeholder="Search orders..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full md:w-64 px-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
        </div>
      </div>

      {filteredOrders.length === 0 ? (
        <div className="text-center py-12">
          <ShoppingBag className="mx-auto h-16 w-16 text-gray-400 mb-4" />
          <h2 className="text-xl font-medium mb-2">No orders found</h2>
          {orders.length > 0 ? (
            <p className="text-gray-600">Try changing your filters or search query.</p>
          ) : (
            <>
              <p className="text-gray-600 mb-6">You haven't placed any orders yet.</p>
              <Button onClick={() => navigate('/products')}>Start Shopping</Button>
            </>
          )}
        </div>
      ) : (
        <div className="space-y-6">
          {filteredOrders.map((order) => (
            <div key={order.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <div className="flex flex-col md:flex-row justify-between">
                  <div>
                    <div className="flex items-center space-x-2 mb-2">
                      <Package className="h-5 w-5 text-primary" />
                      <h2 className="font-semibold">Order #{order.id.slice(0, 8)}</h2>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-500 text-sm">
                      <Clock className="h-4 w-4" />
                      <span>Placed on {formatDate(order.createdAt)}</span>
                    </div>
                  </div>
                  <div className="flex items-center mt-3 md:mt-0">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>{order.status}</span>
                    <Button variant="outline" size="sm" className="ml-4" onClick={() => navigate(`/order-confirmation/${order.id}`)}>
                      View Details
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <div className="space-y-4">
                  {order.items.slice(0, 3).map((item) => (
                    <div key={item.productId} className="flex justify-between items-center">
                      <div className="flex items-center">
                        <div className="rounded-md bg-gray-100 w-12 h-12 flex items-center justify-center text-gray-500 mr-4">
                          {item.productName[0]}
                        </div>
                        <div>
                          <h3 className="font-medium">{item.productName}</h3>
                          <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                        </div>
                      </div>
                      <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}

                  {order.items.length > 3 && <div className="text-sm text-gray-500 italic">+ {order.items.length - 3} more items</div>}
                </div>

                <div className="mt-6 pt-4 border-t border-gray-200 flex justify-between">
                  <span className="font-semibold">Total</span>
                  <span className="font-bold">${order.totalAmount.toFixed(2)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrdersPage;
