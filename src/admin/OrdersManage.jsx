import React, { useState, useEffect } from 'react';
import AnnouncementBar from '../components/layout/AnnouncementBar';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import API from '../services/api';
import { LayoutDashboard, Package, ShoppingBag, Eye, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const OrdersManage = () => {
  const [orders, setOrders] = useState([
    {
      _id: '65f1a2b3c4d5e6f7a8b9c001',
      user: { name: 'John Doe', email: 'john@example.com' },
      totalAmount: 249.99,
      paymentMethod: 'COD',
      paymentStatus: 'Pending',
      orderStatus: 'Processing',
      createdAt: '2026-06-01T10:30:00Z',
    },
    {
      _id: '65f1a2b3c4d5e6f7a8b9c002',
      user: { name: 'Sarah Smith', email: 'sarah@example.com' },
      totalAmount: 1499.99,
      paymentMethod: 'Stripe',
      paymentStatus: 'Paid',
      orderStatus: 'Delivered',
      createdAt: '2026-06-02T14:15:00Z',
    },
  ]);
  const [loading, setLoading] = useState(false);

  const handleStatusUpdate = async (orderId, newStatus) => {
    try {
      const { data } = await API.patch(`/orders/${orderId}/status`, { status: newStatus });
      if (data.success) {
        setOrders(orders.map(order => order._id === orderId ? { ...order, orderStatus: newStatus } : order));
      }
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to update order status.');
    }
  };

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
            <Link to="/admin/products" className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-semibold text-gray-600 hover:bg-gray-100 transition">
              <Package size={18} /> Products
            </Link>
            <Link to="/admin/orders" className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-semibold bg-secondary text-white">
              <ShoppingBag size={18} /> Orders
            </Link>
          </div>

          {/* Orders Management Content */}
          <div className="flex-1 space-y-6">
            <h1 className="text-2xl font-black text-primary">Manage Customer Orders</h1>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-lightBg border-b border-gray-200 text-xs font-bold text-gray-600 uppercase">
                      <th className="p-4">Order ID</th>
                      <th className="p-4">Customer</th>
                      <th className="p-4">Amount</th>
                      <th className="p-4">Payment</th>
                      <th className="p-4">Status</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 text-sm">
                    {orders.map((item) => (
                      <tr key={item._id} className="hover:bg-gray-50 transition">
                        <td className="p-4 font-semibold text-primary">#{item.orderId || item._id.slice(-6).toUpperCase()}</td>
                        <td className="p-4">
                          <p className="font-semibold text-primary">{item.user?.name}</p>
                          <p className="text-xs text-gray-500">{item.user?.email}</p>
                        </td>
                        <td className="p-4 font-bold text-secondary">${item.totalAmount}</td>
                        <td className="p-4">
                          <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                            item.paymentStatus === 'Paid' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                          }`}>
                            {item.paymentStatus} ({item.paymentMethod})
                          </span>
                        </td>
                        <td className="p-4">
                          <select
                            value={item.orderStatus}
                            onChange={(e) => handleStatusUpdate(item._id, e.target.value)}
                            className="border border-gray-300 rounded-lg px-2 py-1 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-secondary"
                          >
                            <option value="Pending">Pending</option>
                            <option value="Confirmed">Confirmed</option>
                            <option value="Processing">Processing</option>
                            <option value="Shipped">Shipped</option>
                            <option value="Delivered">Delivered</option>
                            <option value="Cancelled">Cancelled</option>
                          </select>
                        </td>
                        <td className="p-4 text-right">
                          <button className="p-1.5 bg-blue-50 text-secondary rounded hover:bg-blue-100 transition">
                            <Eye size={16} />
                          </button>
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

export default OrdersManage;