import React from 'react';
import AnnouncementBar from '../components/layout/AnnouncementBar';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import ProductCard from '../components/products/ProductCard';
import ProductFilters from '../components/products/ProductFilters';

const Shop = () => {
  const dummyProducts = [
    { _id: '1', name: 'iPhone 15 Pro Max', brand: 'Apple', price: 1199, discountPrice: 1099, images: ['https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=500'] },
    { _id: '2', name: 'MacBook Pro M3', brand: 'Apple', price: 1999, discountPrice: 1849, images: ['https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500'] },
    { _id: '3', name: 'Sony WH-1000XM5', brand: 'Sony', price: 399, discountPrice: 349, images: ['https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=500'] },
    { _id: '4', name: 'Galaxy Watch 6 Classic', brand: 'Samsung', price: 399, images: ['https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=500'] },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-lightBg">
      <AnnouncementBar />
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-8 flex-grow w-full">
        <h1 className="text-3xl font-black text-primary mb-6">Explore <span className="text-secondary">Shop</span></h1>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="md:col-span-1">
            <ProductFilters />
          </div>

          {/* Products Grid */}
          <div className="md:col-span-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {dummyProducts.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Shop;