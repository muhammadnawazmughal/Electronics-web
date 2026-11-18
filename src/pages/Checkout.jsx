import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AnnouncementBar from '../components/layout/AnnouncementBar';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import API from '../services/api';

const Checkout = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('COD');
  const [shippingAddress, setShippingAddress] = useState({
    fullName: '',
    email: '',
    phone: '',
    street: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'Pakistan',
    notes: '',
  });

  const handleChange = (e) => {
    setShippingAddress({ ...shippingAddress, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await API.post('/orders', {
        shippingAddress,
        paymentMethod,
      });
      if (data.success) {
        navigate('/profile');
      }
    } catch (error) {
      alert(error.response?.data?.message || 'Order placement failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-lightBg">
      <AnnouncementBar />
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-10 flex-grow w-full">
        <h1 className="text-3xl font-black text-primary mb-8">Checkout</h1>

        <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Shipping Details */}
          <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-5">
            <h2 className="text-lg font-bold text-primary border-b pb-3">Shipping Information</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input label="Full Name" name="fullName" value={shippingAddress.fullName} onChange={handleChange} required />
              <Input label="Email Address" type="email" name="email" value={shippingAddress.email} onChange={handleChange} required />
              <Input label="Phone Number" name="phone" value={shippingAddress.phone} onChange={handleChange} required />
              <Input label="City" name="city" value={shippingAddress.city} onChange={handleChange} required />
              <Input label="State / Province" name="state" value={shippingAddress.state} onChange={handleChange} required />
              <Input label="Postal Code" name="postalCode" value={shippingAddress.postalCode} onChange={handleChange} required />
            </div>

            <Input label="Complete Street Address" name="street" value={shippingAddress.street} onChange={handleChange} required />
            <Input label="Order Notes (Optional)" name="notes" placeholder="Delivery instructions..." value={shippingAddress.notes} onChange={handleChange} />

            {/* Payment Selection */}
            <div className="pt-4">
              <h2 className="text-lg font-bold text-primary border-b pb-3 mb-4">Payment Method</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <label
                  className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition ${
                    paymentMethod === 'COD' ? 'border-secondary bg-secondary/5' : 'border-gray-200'
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="COD"
                    checked={paymentMethod === 'COD'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="accent-secondary"
                  />
                  <div>
                    <p className="font-bold text-sm text-primary">Cash on Delivery (COD)</p>
                    <p className="text-xs text-gray-500">Pay when you receive your order</p>
                  </div>
                </label>

                <label
                  className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition ${
                    paymentMethod === 'Stripe' ? 'border-secondary bg-secondary/5' : 'border-gray-200'
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="Stripe"
                    checked={paymentMethod === 'Stripe'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="accent-secondary"
                  />
                  <div>
                    <p className="font-bold text-sm text-primary">Credit / Debit Card (Stripe)</p>
                    <p className="text-xs text-gray-500">Instant secure online payment</p>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-fit space-y-4">
            <h3 className="font-bold text-lg text-primary border-b pb-3">Order Summary</h3>
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-primary">$249.99</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="font-semibold text-green-600">Free</span>
              </div>
              <div className="flex justify-between">
                <span>Discount</span>
                <span className="font-semibold text-accent">-$0.00</span>
              </div>
            </div>
            <div className="border-t pt-3 flex justify-between font-black text-xl text-primary">
              <span>Total</span>
              <span className="text-secondary">$249.99</span>
            </div>
            <Button type="submit" className="w-full py-3" disabled={loading}>
              {loading ? 'Processing Order...' : 'Place Order'}
            </Button>
          </div>
        </form>
      </div>

      <Footer />
    </div>
  );
};

export default Checkout;