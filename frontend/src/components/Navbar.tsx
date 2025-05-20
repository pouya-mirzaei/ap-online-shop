import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import { Button } from './ui/button';
import { Search, ShoppingCart, User, Menu, X, Settings, LogOut, List } from 'lucide-react';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from './ui/dropdown-menu';

const Navbar: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const { cartCount } = useCart();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold text-primary">ShopOnline</span>
            </Link>

            <div className="hidden md:block ml-10">
              <div className="flex items-center space-x-4">
                <Link to="/" className="text-gray-600 hover:text-primary px-3 py-2 rounded-md text-sm font-medium">
                  Home
                </Link>
                <Link to="/products" className="text-gray-600 hover:text-primary px-3 py-2 rounded-md text-sm font-medium">
                  Products
                </Link>
                <Link to="/categories" className="text-gray-600 hover:text-primary px-3 py-2 rounded-md text-sm font-medium">
                  Categories
                </Link>
              </div>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Search products..."
                className="w-64 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button type="submit" className="absolute right-2 top-1/2 transform -translate-y-1/2">
                <Search className="w-5 h-5 text-gray-500" />
              </button>
            </form>

            <Link to="/cart" className="relative">
              <ShoppingCart className="w-6 h-6 text-gray-600" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center space-x-1">
                    <User className="w-5 h-5 mr-1" />
                    <span className="text-sm">{user?.username}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48 bg-white border border-gray-200 shadow-md rounded-md p-1">
                  <DropdownMenuItem onClick={() => navigate('/profile')} className="cursor-pointer hover:bg-gray-100 rounded-sm">
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/orders')} className="cursor-pointer hover:bg-gray-100 rounded-sm">
                    <List className="mr-2 h-4 w-4" />
                    Orders
                  </DropdownMenuItem>
                  {user?.role === 'ADMIN' && (
                    <DropdownMenuItem onClick={() => navigate('/admin')} className="cursor-pointer hover:bg-gray-100 rounded-sm">
                      <Settings className="mr-2 h-4 w-4" />
                      Admin Panel
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem onClick={logout} className="cursor-pointer hover:bg-gray-100 rounded-sm">
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex space-x-2">
                <Button variant="outline" onClick={() => navigate('/login')}>
                  Login
                </Button>
                <Button onClick={() => navigate('/register')}>Register</Button>
              </div>
            )}
          </div>

          <div className="md:hidden flex items-center">
            <Link to="/cart" className="relative mr-4">
              <ShoppingCart className="w-6 h-6 text-gray-600" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
            <button className="text-gray-600 hover:text-primary focus:outline-none" onClick={toggleMenu}>
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link to="/" className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-primary" onClick={toggleMenu}>
            Home
          </Link>
          <Link to="/products" className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-primary" onClick={toggleMenu}>
            Products
          </Link>
          <Link to="/categories" className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-primary" onClick={toggleMenu}>
            Categories
          </Link>
          <form onSubmit={handleSearch} className="relative mt-3">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit" className="absolute right-2 top-1/2 transform -translate-y-1/2">
              <Search className="w-5 h-5 text-gray-500" />
            </button>
          </form>
          {isAuthenticated ? (
            <div className="space-y-1 pt-2 pb-3 border-t border-gray-200 mt-3">
              <div className="px-3 py-2 text-base font-medium text-gray-800">{user?.username}</div>
              <Link to="/profile" className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-primary" onClick={toggleMenu}>
                Profile
              </Link>
              <Link to="/orders" className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-primary" onClick={toggleMenu}>
                Orders
              </Link>
              {user?.role === 'ADMIN' && (
                <Link to="/admin" className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-primary" onClick={toggleMenu}>
                  Admin Dashboard
                </Link>
              )}
              <button
                onClick={() => {
                  logout();
                  toggleMenu();
                }}
                className="block w-full text-left px-3 py-2 text-base font-medium text-gray-600 hover:text-primary"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex flex-col space-y-2 mt-4">
              <Button variant="outline" onClick={() => navigate('/login')}>
                Login
              </Button>
              <Button onClick={() => navigate('/register')}>Register</Button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
