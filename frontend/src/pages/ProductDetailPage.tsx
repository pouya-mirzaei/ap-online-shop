import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useProducts } from '../contexts/ProductContext';
import { useCart } from '../contexts/CartContext';
import { Button } from '../components/ui/button';
import { ShoppingCart, ArrowLeft, Plus, Minus } from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';
import type { Product } from '../services/api';

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getProductById, getProductsByCategory } = useProducts();
  const { addToCart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;

      setLoading(true);
      try {
        const productData = await getProductById(id);
        if (!productData) {
          navigate('/products');
          return;
        }
        setProduct(productData);

        // Fetch related products (same category)
        if (productData.category) {
          const categoryProducts = await getProductsByCategory(productData.category);
          setRelatedProducts(categoryProducts.filter((p) => p.id !== id).slice(0, 4));
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, navigate, getProductById, getProductsByCategory]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product.id, quantity);
    }
  };

  const incrementQuantity = () => {
    if (product && quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  // Generate a colorful product image based on product name if no image provided
  const getProductImage = (prod: Product) => {
    if (prod.imageUrl) return prod.imageUrl;

    // Create a colorful background with the first letter of the product name
    const firstLetter = prod.name.charAt(0).toUpperCase();
    const colors = ['FF6B6B', '4ECDC4', 'F9DC5C', '40C057', '7950F2', '4263EB', '1098AD', 'F06595', 'E67700', '212529'];

    // Use product id to select a consistent color for the same product
    const colorIndex = prod.id.charCodeAt(0) % colors.length;
    const bgColor = colors[colorIndex];

    return `https://ui-avatars.com/api/?name=${firstLetter}&background=${bgColor}&color=fff&size=600&bold=true`;
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="animate-pulse">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/2">
              <div className="bg-gray-300 rounded-lg h-[400px]"></div>
            </div>
            <div className="md:w-1/2">
              <div className="h-8 bg-gray-300 rounded w-3/4 mb-4"></div>
              <div className="h-6 bg-gray-300 rounded w-1/4 mb-6"></div>
              <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
              <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
              <div className="h-4 bg-gray-300 rounded w-3/4 mb-6"></div>
              <div className="h-10 bg-gray-300 rounded w-full mb-4"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h2 className="text-2xl font-bold mb-4">Product not found</h2>
        <Button onClick={() => navigate('/products')}>Back to Products</Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link to="/products" className="inline-flex items-center text-primary hover:underline mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Products
      </Link>

      <div className="flex flex-col md:flex-row gap-8 mb-16">
        <div className="md:w-1/2">
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <img src={getProductImage(product)} alt={product.name} className="w-full h-auto object-cover object-center" />
          </div>
        </div>

        <div className="md:w-1/2">
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          <p className="text-2xl font-semibold text-primary mb-4">${product.price.toFixed(2)}</p>

          <div className="mb-6">
            <h3 className="font-semibold mb-2">Description:</h3>
            <p className="text-gray-600">{product.description}</p>
          </div>

          <div className="flex items-center mb-4">
            <span className="mr-2">Category:</span>
            <Link
              to={`/categories/${product.category}`}
              className="inline-block bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-sm"
            >
              {product.category}
            </Link>
          </div>

          <div className="mb-6">
            <p className="text-sm">
              {product.stock > 0 ? (
                <span className="text-green-600">In Stock ({product.stock} available)</span>
              ) : (
                <span className="text-red-600">Out of Stock</span>
              )}
            </p>
          </div>

          {product.stock > 0 && (
            <div className="flex items-center mb-6">
              <span className="mr-4">Quantity:</span>
              <div className="flex items-center border border-gray-300 rounded-md">
                <button onClick={decrementQuantity} className="px-3 py-1 border-r border-gray-300" disabled={quantity <= 1}>
                  <Minus size={16} />
                </button>
                <span className="px-4 py-1">{quantity}</span>
                <button onClick={incrementQuantity} className="px-3 py-1 border-l border-gray-300" disabled={quantity >= product.stock}>
                  <Plus size={16} />
                </button>
              </div>
            </div>
          )}

          <Button onClick={handleAddToCart} disabled={product.stock <= 0} className="w-full" size="lg">
            <ShoppingCart className="mr-2 h-5 w-5" />
            {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
          </Button>
        </div>
      </div>

      {relatedProducts.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Related Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {relatedProducts.map((relatedProduct) => (
              <Card
                key={relatedProduct.id}
                className="overflow-hidden transition-all duration-200 hover:shadow-md cursor-pointer"
                onClick={() => navigate(`/products/${relatedProduct.id}`)}
              >
                <div className="h-40 overflow-hidden">
                  <img
                    src={getProductImage(relatedProduct)}
                    alt={relatedProduct.name}
                    className="w-full h-full object-cover object-center"
                  />
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-1 line-clamp-1">{relatedProduct.name}</h3>
                  <p className="text-primary font-bold">${relatedProduct.price.toFixed(2)}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetailPage;
