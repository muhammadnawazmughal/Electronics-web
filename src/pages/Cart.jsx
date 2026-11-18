import React from 'react';
import { Link } from 'react-router-dom';
import AnnouncementBar from '../components/layout/AnnouncementBar';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Button from '../components/common/Button';
import { Trash2, Plus, Minus, ArrowRight } from 'lucide-react';

const Cart = () => {
  return (
    <div className="min-h-screen flex flex-col bg-lightBg">
      <AnnouncementBar />
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-8 flex-grow w-full">
        <h1 className="text-3xl font-black text-primary mb-8">Shopping <span className="text-secondary">Cart</span></h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items List */}
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between gap-4">
              <img src="https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=500" alt="Product" className="w-20 h-20 object-cover rounded-lg" />
              <div className="flex-grow">
                <h3 className="font-bold text-primary">iPhone 15 Pro Max</h3>
                <p className="text-sm text-gray-500">Brand: Apple</p>
                <span className="font-bold text-secondary">$1,099</span>
              </div>
              <div className="flex items-center gap-2 border rounded-lg px-2 py-1">
                <button className="text-gray-500 hover:text-primary"><Minus size={16} /></button>
                <span className="font-medium px-2">1</span>
                <button className="text-gray-500 hover:text-primary"><Plus size={16} /></button>
              </div>
              <button className="text-red-500 hover:text-red-700 p-2"><Trash2 size={20} /></button>
            </div>
          </div>

          {/* Cart Summary */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-fit space-y-4">
            <h3 className="font-bold text-lg text-primary border-b pb-3">Order Summary</h3>
            <div className="flex justify-between text-sm text-gray-600">
              <span>Subtotal</span>
              <span className="font-semibold text-primary">$1,099.00</span>
            </div>
            <div className="flex justify-between text-sm text-gray-600">
              <span>Shipping Fee</span>
              <span className="font-semibold text-primary">Free</span>
            </div>
            <div className="flex justify-between text-lg font-bold text-primary border-t pt-3">
              <span>Total</span>
              <span className="text-secondary">$1,099.00</span>
            </div>
            <Link to="/checkout" className="block w-full">
              <Button variant="primary" className="w-full">
                Proceed to Checkout <ArrowRight size={18} />
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Cart;