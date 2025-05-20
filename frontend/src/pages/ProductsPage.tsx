import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { useProducts } from '../contexts/ProductContext';
import { productApi, type Product, type ProductFilterParams } from '../services/api';
import ProductCard from '../components/ProductCard';
import { Button } from '../components/ui/button';
import { Search, Filter, Loader2 } from 'lucide-react';

const ProductsPage: React.FC = () => {
  const { category } = useParams<{ category?: string }>();
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('q') || '';

  const { categories } = useProducts();
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Filter state
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [searchText, setSearchText] = useState('');
  const [sortOption, setSortOption] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  // When component loads or URL params change, update filter states
  useEffect(() => {
    if (category) {
      setSelectedCategory(category);
    }

    if (searchQuery) {
      setSearchText(searchQuery);
    }
  }, [category, searchQuery]);

  // Fetch products with filters
  const fetchProducts = async () => {
    setIsLoading(true);

    try {
      // Check if any filters are active
      const hasActiveFilters = !!(selectedCategory || searchText || minPrice || maxPrice || sortOption);

      let response;

      if (hasActiveFilters) {
        // Build filter params
        const filterParams: ProductFilterParams = {};

        if (selectedCategory) {
          filterParams.category = selectedCategory;
        }

        if (searchText) {
          filterParams.search = searchText;
        }

        if (minPrice) {
          filterParams.minPrice = parseFloat(minPrice);
        }

        if (maxPrice) {
          filterParams.maxPrice = parseFloat(maxPrice);
        }

        // Map UI sort option to API sort option
        if (sortOption) {
          switch (sortOption) {
            case 'price-asc':
              filterParams.sortBy = 'price_asc';
              break;
            case 'price-desc':
              filterParams.sortBy = 'price_desc';
              break;
            case 'name-asc':
              filterParams.sortBy = 'name_asc';
              break;
            case 'name-desc':
              filterParams.sortBy = 'name_desc';
              break;
          }
        }

        // Call API with filters
        response = await productApi.filter(filterParams);
      } else {
        // No filters active, use the basic products endpoint
        response = await productApi.getAll();
      }

      setProducts(response.data);
    } catch (error) {
      console.error('Failed to fetch products:', error);
      setProducts([]);
    } finally {
      setIsLoading(false);
    }
  };

  // When filter values change, fetch products
  useEffect(() => {
    fetchProducts();
  }, [selectedCategory, searchText, sortOption, minPrice, maxPrice]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchText(searchQuery);
  };

  const handleReset = () => {
    setSelectedCategory('');
    setSearchText('');
    setSortOption('');
    setMinPrice('');
    setMaxPrice('');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">{selectedCategory ? `${selectedCategory} Products` : 'All Products'}</h1>

      <div className="flex flex-col lg:flex-row lg:justify-between gap-4 mb-8">
        <div className="flex flex-col md:flex-row gap-4 w-full lg:w-auto">
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              placeholder="Search products..."
              className="pl-10 pr-4 py-2 w-full md:w-[300px] border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              value={searchQuery}
              onChange={(e) => setSearchText(e.target.value)}
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          </form>

          <div className="flex gap-2">
            <select
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-white"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
            >
              <option value="">Sort by</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="name-asc">Name: A to Z</option>
              <option value="name-desc">Name: Z to A</option>
            </select>

            <Button variant="outline" className="md:hidden" onClick={() => setShowFilters(!showFilters)}>
              <Filter size={18} className="mr-2" />
              Filters
            </Button>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className={`lg:w-1/4 xl:w-1/5 ${showFilters ? 'block' : 'hidden'} lg:block bg-white p-6 rounded-lg shadow-sm h-fit`}>
          <h2 className="font-semibold text-lg mb-4">Filters</h2>

          <div className="mb-6">
            <h3 className="font-medium mb-2">Category</h3>
            <div className="space-y-2">
              <div className="flex items-center">
                <input
                  id="all-categories"
                  type="radio"
                  name="category"
                  checked={selectedCategory === ''}
                  onChange={() => setSelectedCategory('')}
                  className="mr-2"
                />
                <label htmlFor="all-categories">All Categories</label>
              </div>
              {categories.map((cat) => (
                <div key={cat} className="flex items-center">
                  <input
                    id={`category-${cat}`}
                    type="radio"
                    name="category"
                    checked={selectedCategory === cat}
                    onChange={() => setSelectedCategory(cat)}
                    className="mr-2"
                  />
                  <label htmlFor={`category-${cat}`}>{cat}</label>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <h3 className="font-medium mb-2">Price Range</h3>
            <div className="flex items-center space-x-2">
              <input
                type="number"
                placeholder="Min"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                min="0"
              />
              <span>-</span>
              <input
                type="number"
                placeholder="Max"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                min="0"
              />
            </div>
          </div>

          <Button variant="outline" className="w-full" onClick={handleReset}>
            Reset Filters
          </Button>
        </div>

        <div className="lg:w-3/4 xl:w-4/5">
          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="h-12 w-12 animate-spin text-primary" />
              <span className="ml-2 text-lg">Loading products...</span>
            </div>
          ) : products.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-2xl font-semibold mb-2">No products found</h3>
              <p className="text-muted-foreground mb-6">Try adjusting your search or filter criteria</p>
              <Button onClick={handleReset}>Reset Filters</Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
