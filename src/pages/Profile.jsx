import React, { useState, useEffect } from 'react';
import AnnouncementBar from '../components/layout/AnnouncementBar';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import API from '../services/api';
import { User, Package, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [activeTab, setActiveTab] = useState('orders');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const [userRes, ordersRes] = await Promise.all([
          API.get('/auth/me'),
          API.get('/orders/my-orders'),
        ]);
        if (userRes.data.success) setUser(userRes.data.user);
        if (ordersRes.data.success) setOrders(ordersRes.data.orders);
      } catch (error) {
        console.error('Error loading profile:', error);
      }
    };
    fetchUserData();
  }, []);

  const handleLogout = async () => {
    await API.post('/auth/logout');
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex flex-col bg-lightBg">
      <AnnouncementBar />
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-10 flex-grow w-full">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-fit space-y-2">
            <div className="pb-4 border-b border-gray-100 mb-4">
              <p className="font-bold text-primary text-lg">{user?.name || 'Customer'}</p>
              <p className="text-xs text-gray-500">{user?.email}</p>
            </div>

            <button
              onClick={() => setActiveTab('orders')}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-semibold transition ${
                activeTab === 'orders' ? 'bg-secondary text-white' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Package size={18} /> My Orders
            </button>

            <button
              onClick={() => setActiveTab('info')}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-semibold transition ${
                activeTab === 'info' ? 'bg-secondary text-white' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <User size={18} /> Account Details
            </button>

            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-semibold text-red-600 hover:bg-red-50 transition mt-4"
            >
              <LogOut size={18} /> Logout
            </button>
          </div>

          {/* Content Area */}
          <div className="md:col-span-3 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            {activeTab === 'orders' ? (
              <div>
                <h2 className="text-xl font-black text-primary mb-6">Order History</h2>
                {orders.length === 0 ? (
                  <p className="text-gray-500 text-sm">You haven't placed any orders yet.</p>
                ) : (
                  <div className="space-y-4">
                    {orders.map((order) => (
                      <div key={order._id} className="border border-gray-200 rounded-xl p-4 flex flex-wrap justify-between items-center gap-4">
                        <div>
                          <p className="text-xs text-gray-500">Order ID: #{order._id.slice(-6).toUpperCase()}</p>
                          <p className="font-bold text-primary mt-1">${order.totalAmount}</p>
                          <p className="text-xs text-gray-400">{new Date(order.createdAt).toLocaleDateString()}</p>
                        </div>
                        <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-secondary">
                          {order.orderStatus}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-4">
                <h2 className="text-xl font-black text-primary mb-4">Personal Information</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                  <div className="p-4 bg-lightBg rounded-xl">
                    <span className="text-gray-500 block text-xs">Full Name</span>
                    <span className="font-bold text-primary">{user?.name}</span>
                  </div>
                  <div className="p-4 bg-lightBg rounded-xl">
                    <span className="text-gray-500 block text-xs">Email Address</span>
                    <span className="font-bold text-primary">{user?.email}</span>
                  </div>
                  <div className="p-4 bg-lightBg rounded-xl">
                    <span className="text-gray-500 block text-xs">Phone Number</span>
                    <span className="font-bold text-primary">{user?.phone}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Profile;