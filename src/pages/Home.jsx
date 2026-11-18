import React from 'react';
import { Link } from 'react-router-dom';
import AnnouncementBar from '../components/layout/AnnouncementBar';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import ProductCard from '../components/products/ProductCard';
import { ArrowRight, ShieldCheck, Truck, Headphones, RefreshCw } from 'lucide-react';

const Home = () => {
  // Dummy featured products for preview
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

      {/* Hero Banner */}
      <section className="bg-primary text-white py-16 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-xl space-y-6">
            <span className="bg-secondary/20 text-secondary text-sm font-bold px-3 py-1 rounded-full">⚡ Next-Gen Electronics</span>
            <h1 className="text-4xl md:text-6xl font-black leading-tight">
              Experience the Future of <span className="text-secondary">Technology</span>
            </h1>
            <p className="text-gray-400 text-base md:text-lg">
              Discover cutting-edge smartphones, powerful laptops, immersive audio, and smart gadgets with uncompromised quality.
            </p>
            <div className="flex gap-4">
              <Link to="/shop" className="bg-secondary hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-lg flex items-center gap-2 transition">
                Shop Now <ArrowRight size={18} />
              </Link>
            </div>
          </div>
          <div className="w-full md:w-1/2">
            <img 
              src="https://images.unsplash.com/photo-1550009158-9ebf69173e03?w=600" 
              alt="Tech Gadgets" 
              className="rounded-2xl shadow-2xl object-cover w-full h-80"
            />
          </div>
        </div>
      </section>

      {/* Features Bar */}
      <section className="bg-white py-8 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="flex items-center gap-4">
            <Truck className="text-secondary" size={32} />
            <div>
              <h4 className="font-bold text-sm text-primary">Free Shipping</h4>
              <p className="text-xs text-gray-500">On orders over $50</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <ShieldCheck className="text-secondary" size={32} />
            <div>
              <h4 className="font-bold text-sm text-primary">Secure Payment</h4>
              <p className="text-xs text-gray-500">100% secure checkout</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <RefreshCw className="text-secondary" size={32} />
            <div>
              <h4 className="font-bold text-sm text-primary">Easy Returns</h4>
              <p className="text-xs text-gray-500">30-day money-back guarantee</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Headphones className="text-secondary" size={32} />
            <div>
              <h4 className="font-bold text-sm text-primary">24/7 Support</h4>
              <p className="text-xs text-gray-500">Dedicated customer care</p>
            </div>
          </div>
        </div>
      </section>

      {/* Trending Products */}
      <section className="max-w-7xl mx-auto px-4 py-12 flex-grow w-full">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-black text-primary">Trending <span className="text-secondary">Products</span></h2>
          <Link to="/shop" className="text-secondary font-semibold text-sm hover:underline">View All</Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {dummyProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;