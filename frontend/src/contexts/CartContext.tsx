import React, { createContext, useContext, useState, useEffect } from 'react';
import type { Cart, CartItem } from '../services/api';
import { cartApi } from '../services/api';
import { useAuth } from './AuthContext';
import toast from 'react-hot-toast';

interface CartContextType {
  cart: Cart | null;
  isLoading: boolean;
  cartCount: number;
  totalAmount: number;
  addToCart: (productId: string, quantity: number) => Promise<void>;
  updateCartItem: (productId: string, quantity: number) => Promise<void>;
  removeFromCart: (productId: string) => Promise<void>;
  clearCart: () => Promise<void>;
  refreshCart: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, isAuthenticated } = useAuth();
  const [cart, setCart] = useState<Cart | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);

  const refreshCart = async () => {
    if (!isAuthenticated || !user) {
      setCart(null);
      setCartCount(0);
      setTotalAmount(0);
      return;
    }

    try {
      setIsLoading(true);

      // Get cart data
      const cartResponse = await cartApi.getCart(user.id);
      setCart(cartResponse.data);

      // Get cart count from backend instead of calculating on client
      const cartSizeResponse = await cartApi.getCartSize(user.id);
      setCartCount(cartSizeResponse.data);

      // Get cart total from backend
      const cartTotalResponse = await cartApi.getCartTotal(user.id);
      setTotalAmount(cartTotalResponse.data);
    } catch (error) {
      if ((error as any)?.response?.status === 404) {
        // Cart doesn't exist yet, create one
        try {
          const newCartResponse = await cartApi.createCart(user.id);
          setCart(newCartResponse.data);
          setCartCount(0);
          setTotalAmount(0);
        } catch (createError) {
          console.error('Failed to create cart', createError);
          toast.error('Failed to create shopping cart');
        }
      } else {
        console.error('Failed to fetch cart', error);
        toast.error('Failed to load shopping cart');
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    refreshCart();
  }, [user, isAuthenticated]);

  const addToCart = async (productId: string, quantity: number) => {
    if (!isAuthenticated || !user) {
      toast.error('Please log in to add items to your cart');
      return;
    }

    try {
      setIsLoading(true);
      await cartApi.addItem(user.id, productId, quantity);
      await refreshCart();
      toast.success('Item added to cart');
    } catch (error) {
      console.error('Failed to add item to cart', error);
      toast.error('Failed to add item to cart');
    } finally {
      setIsLoading(false);
    }
  };

  const updateCartItem = async (productId: string, quantity: number) => {
    if (!isAuthenticated || !user || !cart) return;

    try {
      setIsLoading(true);
      await cartApi.updateItem(user.id, productId, quantity);
      await refreshCart();
      toast.success('Cart updated');
    } catch (error) {
      console.error('Failed to update cart', error);
      toast.error('Failed to update cart');
    } finally {
      setIsLoading(false);
    }
  };

  const removeFromCart = async (productId: string) => {
    if (!isAuthenticated || !user || !cart) return;

    try {
      setIsLoading(true);
      await cartApi.removeItem(user.id, productId);
      await refreshCart();
      toast.success('Item removed from cart');
    } catch (error) {
      console.error('Failed to remove item from cart', error);
      toast.error('Failed to remove item from cart');
    } finally {
      setIsLoading(false);
    }
  };

  const clearCart = async () => {
    if (!isAuthenticated || !user || !cart) return;

    try {
      setIsLoading(true);
      await cartApi.clearCart(user.id);
      await refreshCart();
      toast.success('Cart cleared');
    } catch (error) {
      console.error('Failed to clear cart', error);
      toast.error('Failed to clear cart');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        isLoading,
        cartCount,
        totalAmount,
        addToCart,
        updateCartItem,
        removeFromCart,
        clearCart,
        refreshCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
