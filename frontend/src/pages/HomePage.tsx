import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useProducts } from '../contexts/ProductContext';
import ProductCard from '../components/ProductCard';
import { Button } from '../components/ui/button';

const HomePage: React.FC = () => {
  const { featuredProducts, categories, isLoading, refreshProducts } = useProducts();

  useEffect(() => {
    refreshProducts();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-indigo-800 to-purple-700 text-white rounded-xl overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-pattern"></div>
        <div className="relative z-10 py-12 px-8 lg:px-16 flex flex-col lg:flex-row items-center justify-between">
          <div className="lg:w-1/2 mb-8 lg:mb-0">
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">Shop the Latest Products</h1>
            <p className="text-lg mb-6">Discover amazing deals on our wide range of high-quality products.</p>
            <Button
              size="lg"
              className="bg-white text-indigo-800 hover:bg-gray-100 font-medium"
              onClick={() => (window.location.href = '/products')}
            >
              Shop Now
            </Button>
          </div>
          <div className="lg:w-1/3">
            <img src="https://placehold.co/600x400?text=Shop+Now" alt="Featured Products" className="rounded-lg shadow-xl" />
          </div>
        </div>
      </div>

      {/* Featured Products Section */}
      <section className="mt-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Featured Products</h2>
          <Link to="/products" className="text-primary hover:underline">
            View all products →
          </Link>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="bg-gray-300 h-48 rounded-md"></div>
                <div className="mt-4 h-4 bg-gray-300 rounded w-3/4"></div>
                <div className="mt-2 h-4 bg-gray-300 rounded w-1/2"></div>
                <div className="mt-2 h-8 bg-gray-300 rounded"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* Categories Section */}
      <section className="mt-16">
        <h2 className="text-3xl font-bold mb-8">Browse by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {categories.map((category) => (
            <Link
              key={category}
              to={`/categories/${category}`}
              className="group block bg-secondary bg-opacity-50 hover:bg-primary hover:text-white rounded-lg p-4 text-center transition-colors duration-300"
            >
              <div className="text-lg font-medium group-hover:text-white">{category}</div>
            </Link>
          ))}
        </div>
      </section>

      {/* Special Offer Banner */}
      <section className="mt-16 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-xl p-8">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="mb-6 md:mb-0">
            <h2 className="text-2xl font-bold mb-2 text-indigo-800">Special Offer</h2>
            <p className="text-lg mb-4 text-gray-700">Get 20% off on your first purchase!</p>
            <Button className="bg-indigo-700 hover:bg-indigo-800 text-white">Shop the Sale</Button>
          </div>
          <img src="https://placehold.co/400x200?text=Special+Offer" alt="Special Offer" className="rounded-lg" />
        </div>
      </section>
    </div>
  );
};

export default HomePage;
