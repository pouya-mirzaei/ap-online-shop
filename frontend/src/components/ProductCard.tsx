import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardFooter } from './ui/card';
import { Button } from './ui/button';
import { useCart } from '../contexts/CartContext';
import type { Product } from '../services/api';
import { ShoppingCart } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product.id, 1);
  };

  const handleClick = () => {
    navigate(`/products/${product.id}`);
  };

  // Generate a colorful product image based on product name if no image provided
  const getProductImage = () => {
    if (product.imageUrl) return product.imageUrl;

    // Create a colorful background with the first letter of the product name
    const firstLetter = product.name.charAt(0).toUpperCase();
    const colors = ['FF6B6B', '4ECDC4', 'F9DC5C', '40C057', '7950F2', '4263EB', '1098AD', 'F06595', 'E67700', '212529'];

    // Use product id to select a consistent color for the same product
    const colorIndex = product.id.charCodeAt(0) % colors.length;
    const bgColor = colors[colorIndex];

    return `https://ui-avatars.com/api/?name=${firstLetter}&background=${bgColor}&color=fff&size=300&bold=true`;
  };

  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg cursor-pointer" onClick={handleClick}>
      <div className="h-48 overflow-hidden relative">
        <img
          src={getProductImage()}
          alt={product.name}
          className="w-full h-full object-cover object-center transition-transform duration-500 hover:scale-110"
        />
        {product.stock <= 0 && (
          <div className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center">
            <span className="text-white font-bold text-lg">Out of Stock</span>
          </div>
        )}
      </div>
      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-semibold text-lg mb-1 line-clamp-1">{product.name}</h3>
            <p className="text-muted-foreground text-sm line-clamp-2">{product.description}</p>
          </div>
        </div>
        <div className="mt-2">
          <span className="text-primary font-bold text-lg">${product.price.toFixed(2)}</span>
          <div className="flex items-center mt-1">
            <span className="text-sm text-muted-foreground mr-2">{product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}</span>
            <span className="text-xs px-2 py-1 bg-secondary text-secondary-foreground rounded-full">{product.category}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between">
        <Button onClick={handleAddToCart} disabled={product.stock <= 0} className="w-full">
          <ShoppingCart className="mr-2 h-4 w-4" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
