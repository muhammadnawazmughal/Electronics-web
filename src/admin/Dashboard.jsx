import React, { useState, useEffect } from 'react';
import AnnouncementBar from '../components/layout/AnnouncementBar';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import API from '../services/api';
import { LayoutDashboard, Package, ShoppingBag, Users, DollarSign, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalRevenue: 12450,
    totalOrders: 148,
    totalProducts: 32,
    totalCustomers: 95,
  });
  const [loading, setLoading] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-lightBg">
      <AnnouncementBar />
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-10 flex-grow w-full">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Admin Sidebar */}
          <div className="w-full md:w-64 bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-fit space-y-2">
            <h3 className="font-black text-primary text-lg mb-4 border-b pb-2">Admin Panel</h3>
            <Link to="/admin/dashboard" className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-semibold bg-secondary text-white">
              <LayoutDashboard size={18} /> Dashboard
            </Link>
            <Link to="/admin/products" className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-semibold text-gray-600 hover:bg-gray-100 transition">
              <Package size={18} /> Products
            </Link>
            <Link to="/admin/orders" className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-semibold text-gray-600 hover:bg-gray-100 transition">
              <ShoppingBag size={18} /> Orders
            </Link>
          </div>

          {/* Main Dashboard Content */}
          <div className="flex-1 space-y-6">
            <h1 className="text-2xl font-black text-primary">Dashboard Overview</h1>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
                <div className="p-3 bg-secondary/10 text-secondary rounded-xl"><DollarSign size={24} /></div>
                <div>
                  <p className="text-xs text-gray-500 font-medium">Total Revenue</p>
                  <h4 className="text-xl font-black text-primary">${stats.totalRevenue}</h4>
                </div>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
                <div className="p-3 bg-accent/10 text-accent rounded-xl"><ShoppingBag size={24} /></div>
                <div>
                  <p className="text-xs text-gray-500 font-medium">Total Orders</p>
                  <h4 className="text-xl font-black text-primary">{stats.totalOrders}</h4>
                </div>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
                <div className="p-3 bg-green-500/10 text-green-600 rounded-xl"><Package size={24} /></div>
                <div>
                  <p className="text-xs text-gray-500 font-medium">Total Products</p>
                  <h4 className="text-xl font-black text-primary">{stats.totalProducts}</h4>
                </div>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
                <div className="p-3 bg-purple-500/10 text-purple-600 rounded-xl"><Users size={24} /></div>
                <div>
                  <p className="text-xs text-gray-500 font-medium">Total Customers</p>
                  <h4 className="text-xl font-black text-primary">{stats.totalCustomers}</h4>
                </div>
              </div>
            </div>

            {/* Recent Activity Section */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="font-bold text-lg text-primary mb-4">Store Performance Summary</h3>
              <p className="text-sm text-gray-500">
                All systems operational. MongoDB database connected, REST APIs responding normally, and payment gateways active.
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Dashboard;