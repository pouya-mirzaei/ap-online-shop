import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { productApi } from '../services/api';
import type { Product } from '../services/api';
import { Button } from '../components/ui/button';
import { Search, Filter, Sliders, X, ShoppingCart } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import toast from 'react-hot-toast';

const SearchPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filterOpen, setFilterOpen] = useState(false);

  // Get search query from URL
  const searchQuery = searchParams.get('q') || '';
  const category = searchParams.get('category') || '';
  const minPrice = searchParams.get('minPrice') ? Number(searchParams.get('minPrice')) : undefined;
  const maxPrice = searchParams.get('maxPrice') ? Number(searchParams.get('maxPrice')) : undefined;
  const sortBy = searchParams.get('sortBy') || '';

  // Local filter/sort state
  const [localFilters, setLocalFilters] = useState({
    category: category,
    minPrice: minPrice?.toString() || '',
    maxPrice: maxPrice?.toString() || '',
    sortBy: sortBy,
  });

  // Fetch products whenever search params change
  useEffect(() => {
    const fetchProducts = async () => {
      if (!searchQuery && !category && !minPrice && !maxPrice && !sortBy) {
        setIsLoading(false);
        setProducts([]);
        return;
      }

      try {
        setIsLoading(true);
        let response;

        // Check if any filters are applied
        const hasFilters = category || minPrice !== undefined || maxPrice !== undefined || sortBy;

        if (searchQuery && !hasFilters) {
          // Use search method when only search query is provided (no filters)
          response = await productApi.search(searchQuery);
        } else {
          // Use filter method when filters are applied or no search query
          const filterParams: any = {};
          if (searchQuery) filterParams.search = searchQuery;
          if (category) filterParams.category = category;
          if (minPrice !== undefined) filterParams.minPrice = minPrice;
          if (maxPrice !== undefined) filterParams.maxPrice = maxPrice;

          // Handle sort parameter
          if (sortBy) {
            filterParams.sortBy = sortBy;
          }

          response = await productApi.filter(filterParams);
        }

        setProducts(response.data);
      } catch (error) {
        console.error('Failed to fetch products', error);
        toast.error('Failed to load search results. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [searchQuery, category, minPrice, maxPrice, sortBy]);

  const handleAddToCart = async (product: Product) => {
    try {
      await addToCart(product.id, 1);
    } catch (error) {
      console.error('Failed to add product to cart', error);
    }
  };

  const applyFilters = () => {
    const newParams = new URLSearchParams();

    // Always keep the original search query
    if (searchQuery) newParams.set('q', searchQuery);

    // Add other filters
    if (localFilters.category) newParams.set('category', localFilters.category);
    if (localFilters.minPrice) newParams.set('minPrice', localFilters.minPrice);
    if (localFilters.maxPrice) newParams.set('maxPrice', localFilters.maxPrice);
    if (localFilters.sortBy) newParams.set('sortBy', localFilters.sortBy);

    setSearchParams(newParams);
    setFilterOpen(false);
  };

  const resetFilters = () => {
    const newParams = new URLSearchParams();
    if (searchQuery) newParams.set('q', searchQuery);
    setSearchParams(newParams);

    setLocalFilters({
      category: '',
      minPrice: '',
      maxPrice: '',
      sortBy: '',
    });
  };

  // Generate a colorful product image based on product name
  const getProductImage = (product: Product) => {
    // If the product has an actual image URL, use it
    if (product.imageUrl && !product.imageUrl.includes('example.com')) {
      return product.imageUrl;
    }

    // Create a colorful background with the first letter of the product name
    const firstLetter = product.name.charAt(0).toUpperCase();
    const colors = ['FF6B6B', '4ECDC4', 'F9DC5C', '40C057', '7950F2', '4263EB', '1098AD', 'F06595', 'E67700', '212529'];

    // Use product id to select a consistent color for the same product
    const colorIndex = product.id.charCodeAt(0) % colors.length;
    const bgColor = colors[colorIndex];

    return `https://ui-avatars.com/api/?name=${firstLetter}&background=${bgColor}&color=fff&size=200&bold=true`;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Search header with filters */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-4">
          <h1 className="text-2xl font-bold mb-4 md:mb-0">{searchQuery ? `Search Results for "${searchQuery}"` : 'All Products'}</h1>

          <div className="w-full md:w-auto flex space-x-2">
            <Button variant="outline" onClick={() => setFilterOpen(!filterOpen)} className="flex items-center">
              <Filter className="mr-2 h-4 w-4" />
              Filters
            </Button>

            <div className="relative w-full md:w-64">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const formData = new FormData(e.currentTarget);
                  const query = formData.get('search') as string;
                  if (query.trim()) {
                    const newParams = new URLSearchParams(searchParams);
                    newParams.set('q', query);
                    setSearchParams(newParams);
                  }
                }}
              >
                <input
                  type="text"
                  name="search"
                  placeholder="Search products..."
                  defaultValue={searchQuery}
                  className="w-full px-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <button type="submit" className="absolute left-3 top-1/2 transform -translate-y-1/2">
                  <Search className="h-5 w-5 text-gray-400" />
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Active filters */}
        {(category || minPrice || maxPrice || sortBy) && (
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="text-sm text-gray-500">Active filters:</span>

            {category && (
              <div className="flex items-center px-3 py-1 bg-gray-100 rounded-full text-sm">
                <span className="mr-1">Category: {category}</span>
                <button
                  onClick={() => {
                    const newParams = new URLSearchParams(searchParams);
                    newParams.delete('category');
                    setSearchParams(newParams);
                    setLocalFilters({ ...localFilters, category: '' });
                  }}
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            )}

            {(minPrice || maxPrice) && (
              <div className="flex items-center px-3 py-1 bg-gray-100 rounded-full text-sm">
                <span className="mr-1">
                  Price: {minPrice ? `$${minPrice}` : '$0'} - {maxPrice ? `$${maxPrice}` : 'Any'}
                </span>
                <button
                  onClick={() => {
                    const newParams = new URLSearchParams(searchParams);
                    newParams.delete('minPrice');
                    newParams.delete('maxPrice');
                    setSearchParams(newParams);
                    setLocalFilters({ ...localFilters, minPrice: '', maxPrice: '' });
                  }}
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            )}

            {sortBy && (
              <div className="flex items-center px-3 py-1 bg-gray-100 rounded-full text-sm">
                <span className="mr-1">
                  Sort:{' '}
                  {sortBy === 'price_asc'
                    ? 'Price (Low to High)'
                    : sortBy === 'price_desc'
                    ? 'Price (High to Low)'
                    : sortBy === 'name_asc'
                    ? 'Name (A-Z)'
                    : 'Name (Z-A)'}
                </span>
                <button
                  onClick={() => {
                    const newParams = new URLSearchParams(searchParams);
                    newParams.delete('sortBy');
                    setSearchParams(newParams);
                    setLocalFilters({ ...localFilters, sortBy: '' });
                  }}
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            )}

            <button onClick={resetFilters} className="text-sm text-primary hover:underline">
              Clear all filters
            </button>
          </div>
        )}

        {/* Filter panel */}
        {filterOpen && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium flex items-center">
                <Sliders className="mr-2 h-5 w-5" />
                Filter Products
              </h2>
              <button onClick={() => setFilterOpen(false)}>
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select
                  value={localFilters.category}
                  onChange={(e) => setLocalFilters({ ...localFilters, category: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">All Categories</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Clothing">Clothing</option>
                  <option value="Home">Home</option>
                  <option value="Kitchen">Kitchen</option>
                  <option value="Books">Books</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Price Range</label>
                <div className="flex items-center space-x-2">
                  <input
                    type="number"
                    placeholder="Min"
                    value={localFilters.minPrice}
                    onChange={(e) => setLocalFilters({ ...localFilters, minPrice: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <span>-</span>
                  <input
                    type="number"
                    placeholder="Max"
                    value={localFilters.maxPrice}
                    onChange={(e) => setLocalFilters({ ...localFilters, maxPrice: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Sort By</label>
                <select
                  value={localFilters.sortBy}
                  onChange={(e) => setLocalFilters({ ...localFilters, sortBy: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">Featured</option>
                  <option value="price_asc">Price: Low to High</option>
                  <option value="price_desc">Price: High to Low</option>
                  <option value="name_asc">Name: A to Z</option>
                  <option value="name_desc">Name: Z to A</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end mt-6 space-x-3">
              <Button variant="outline" onClick={resetFilters}>
                Reset Filters
              </Button>
              <Button onClick={applyFilters}>Apply Filters</Button>
            </div>
          </div>
        )}
      </div>

      {/* Results */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, index) => (
            <div key={index} className="animate-pulse">
              <div className="bg-gray-300 rounded-lg aspect-square mb-2"></div>
              <div className="h-5 bg-gray-300 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-300 rounded w-1/4 mb-2"></div>
              <div className="h-10 bg-gray-300 rounded w-full"></div>
            </div>
          ))}
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-16">
          <Search className="mx-auto h-16 w-16 text-gray-400 mb-4" />
          <h2 className="text-xl font-medium mb-2">No products found</h2>
          <p className="text-gray-600 mb-6">
            {searchQuery ? `We couldn't find any products matching "${searchQuery}"` : 'Try adjusting your filters'}
          </p>
          <Button onClick={() => navigate('/products')}>View All Products</Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
              <Link to={`/products/${product.id}`} className="block">
                <img src={getProductImage(product)} alt={product.name} className="w-full aspect-square object-cover" />
                <div className="p-4">
                  <h3 className="font-medium text-gray-900 mb-1">{product.name}</h3>
                  <p className="text-lg font-bold text-primary mb-2">${product.price.toFixed(2)}</p>
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">{product.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">{product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}</span>
                    <Button
                      size="sm"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleAddToCart(product);
                      }}
                      disabled={product.stock <= 0}
                    >
                      <ShoppingCart className="h-4 w-4 mr-1" />
                      Add
                    </Button>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchPage;
