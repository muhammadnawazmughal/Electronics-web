import React, { useState, useEffect } from 'react';
import AnnouncementBar from '../components/layout/AnnouncementBar';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import API from '../services/api';
import { LayoutDashboard, Package, ShoppingBag, Plus, Trash2, Edit } from 'lucide-react';
import { Link } from 'react-router-dom';

const ProductsManage = () => {
  const [products, setProducts] = useState([
    { _id: '1', name: 'Pro Wireless Headphones', brand: 'Sony', price: 249.99, stock: 15 },
    { _id: '2', name: 'Ultra 4K Gaming Laptop', brand: 'Asus', price: 1499.99, stock: 8 },
  ]);

  return (
    <div className="min-h-screen flex flex-col bg-lightBg">
      <AnnouncementBar />
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-10 flex-grow w-full">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Admin Sidebar */}
          <div className="w-full md:w-64 bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-fit space-y-2">
            <h3 className="font-black text-primary text-lg mb-4 border-b pb-2">Admin Panel</h3>
            <Link to="/admin/dashboard" className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-semibold text-gray-600 hover:bg-gray-100 transition">
              <LayoutDashboard size={18} /> Dashboard
            </Link>
            <Link to="/admin/products" className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-semibold bg-secondary text-white">
              <Package size={18} /> Products
            </Link>
            <Link to="/admin/orders" className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-semibold text-gray-600 hover:bg-gray-100 transition">
              <ShoppingBag size={18} /> Orders
            </Link>
          </div>

          {/* Product Management Content */}
          <div className="flex-1 space-y-6">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-black text-primary">Manage Products</h1>
              <button className="bg-secondary hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 transition">
                <Plus size={18} /> Add Product
              </button>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-lightBg border-b border-gray-200 text-xs font-bold text-gray-600 uppercase">
                      <th className="p-4">Product Name</th>
                      <th className="p-4">Brand</th>
                      <th className="p-4">Price</th>
                      <th className="p-4">Stock</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 text-sm">
                    {products.map((item) => (
                      <tr key={item._id} className="hover:bg-gray-50 transition">
                        <td className="p-4 font-semibold text-primary">{item.name}</td>
                        <td className="p-4 text-gray-600">{item.brand}</td>
                        <td className="p-4 font-bold text-secondary">${item.price}</td>
                        <td className="p-4 text-gray-600">{item.stock} units</td>
                        <td className="p-4 text-right space-x-2">
                          <button className="p-1.5 bg-blue-50 text-secondary rounded hover:bg-blue-100 transition"><Edit size={16} /></button>
                          <button className="p-1.5 bg-red-50 text-red-600 rounded hover:bg-red-100 transition"><Trash2 size={16} /></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ProductsManage;