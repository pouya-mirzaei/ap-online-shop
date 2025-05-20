import React, { createContext, useContext, useState, useEffect } from 'react';
import type { Product } from '../services/api';
import { productApi } from '../services/api';
import toast from 'react-hot-toast';

interface ProductContextType {
  products: Product[];
  categories: string[];
  featuredProducts: Product[];
  isLoading: boolean;
  searchProducts: (query: string) => Promise<Product[]>;
  getProductsByCategory: (category: string) => Promise<Product[]>;
  getProductById: (id: string) => Promise<Product | undefined>;
  refreshProducts: () => Promise<void>;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const refreshProducts = async () => {
    try {
      setIsLoading(true);
      const response = await productApi.getAll();
      const allProducts = response.data;
      setProducts(allProducts);

      // Extract unique categories
      const uniqueCategories = Array.from(new Set(allProducts.map((product) => product.category)));
      setCategories(uniqueCategories);

      // Set some featured products (random selection for now)
      const shuffled = [...allProducts].sort(() => 0.5 - Math.random());
      setFeaturedProducts(shuffled.slice(0, 4));
    } catch (error) {
      console.error('Failed to fetch products', error);
      toast.error('Failed to load products');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    refreshProducts();
  }, []);

  const searchProducts = async (query: string) => {
    try {
      setIsLoading(true);
      const response = await productApi.search(query);
      return response.data;
    } catch (error) {
      console.error('Search failed', error);
      toast.error('Search failed');
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  const getProductsByCategory = async (category: string) => {
    try {
      setIsLoading(true);
      const response = await productApi.getByCategory(category);
      return response.data;
    } catch (error) {
      console.error('Failed to fetch products by category', error);
      toast.error('Failed to load category products');
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  const getProductById = async (id: string) => {
    try {
      const response = await productApi.getById(id);
      return response.data;
    } catch (error) {
      console.error('Failed to fetch product details', error);
      toast.error('Failed to load product details');
      return undefined;
    }
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        categories,
        featuredProducts,
        isLoading,
        searchProducts,
        getProductsByCategory,
        getProductById,
        refreshProducts,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};
