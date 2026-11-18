import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Heart, User, Search, Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${searchQuery}`);
    }
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="text-2xl font-black text-primary tracking-wider">
            TECH<span className="text-secondary">ZONE</span>
          </Link>

          {/* Search Bar (Desktop) */}
          <form onSubmit={handleSearch} className="hidden md:flex items-center flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search smartphones, laptops, gadgets..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-4 pr-10 py-2 bg-lightBg rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-secondary text-sm"
              />
              <button type="submit" className="absolute right-3 top-2.5 text-gray-500 hover:text-secondary">
                <Search size={18} />
              </button>
            </div>
          </form>

          {/* Icons & Links */}
          <div className="hidden md:flex items-center gap-6">
            <Link to="/wishlist" className="relative text-primary hover:text-secondary transition">
              <Heart size={24} />
              <span className="absolute -top-2 -right-2 bg-accent text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">0</span>
            </Link>
            <Link to="/cart" className="relative text-primary hover:text-secondary transition">
              <ShoppingCart size={24} />
              <span className="absolute -top-2 -right-2 bg-secondary text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">0</span>
            </Link>
            <Link to="/login" className="flex items-center gap-1 text-primary hover:text-secondary font-medium">
              <User size={22} />
              <span>Login</span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-4">
            <Link to="/cart" className="relative text-primary">
              <ShoppingCart size={22} />
            </Link>
            <button onClick={() => setIsOpen(!isOpen)} className="text-primary focus:outline-none">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 px-4 pt-2 pb-4 space-y-3">
          <form onSubmit={handleSearch} className="relative mt-2">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-4 pr-10 py-2 bg-lightBg rounded-lg border text-sm"
            />
            <button type="submit" className="absolute right-3 top-2.5 text-gray-500">
              <Search size={18} />
            </button>
          </form>
          <Link to="/shop" className="block py-2 font-medium text-primary hover:text-secondary">Shop</Link>
          <Link to="/wishlist" className="block py-2 font-medium text-primary hover:text-secondary">Wishlist</Link>
          <Link to="/profile" className="block py-2 font-medium text-primary hover:text-secondary">My Profile</Link>
          <Link to="/login" className="block py-2 font-medium text-primary hover:text-secondary">Login / Register</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;