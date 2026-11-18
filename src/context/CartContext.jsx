import React, { createContext, useState, useEffect } from 'react';
import API from '../services/api';
import toast from 'react-hot-toast';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({ items: [], subtotal: 0, totalItems: 0 });
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(null); // Tracks item-specific loading (e.g. quantity updates)

  // Calculate totals helper for Guest Mode
  const calculateTotals = (items) => {
    const subtotal = items.reduce((acc, item) => {
      const price = item.product?.price || item.price || 0;
      const qty = item.quantity || 1;
      return acc + price * qty;
    }, 0);
    const totalItems = items.reduce((acc, item) => acc + (item.quantity || 1), 0);
    return { items, subtotal, totalItems };
  };

  // Fetch Cart (API or LocalStorage for Guest)
  const fetchCart = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      const guestCart = JSON.parse(localStorage.getItem('techzone_guest_cart')) || { items: [], subtotal: 0, totalItems: 0 };
      setCart(guestCart);
      return;
    }

    try {
      setLoading(true);
      const { data } = await API.get('/cart');
      if (data.success) {
        setCart(data.cart || { items: [], subtotal: 0, totalItems: 0 });
      }
    } catch (error) {
      console.error('Error fetching cart:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  // 1. ADD TO CART (Insert / Increment)
  const addToCart = async (product, quantity = 1) => {
    const productId = product._id || product.id || product;
    const token = localStorage.getItem('token');

    if (!token) {
      // Guest Mode
      let currentItems = [...cart.items];
      const existingIndex = currentItems.findIndex(
        (item) => (item.product?._id || item.product?.id || item._id || item.id) === productId
      );

      if (existingIndex > -1) {
        currentItems[existingIndex].quantity += quantity;
      } else {
        const productObj = typeof product === 'object' ? product : { _id: productId, price: 0, name: 'Product' };
        currentItems.push({ product: productObj, quantity });
      }

      const updatedCart = calculateTotals(currentItems);
      setCart(updatedCart);
      localStorage.setItem('techzone_guest_cart', JSON.stringify(updatedCart));
      toast.success('Added to cart successfully!');
      return;
    }

    // Authenticated User
    try {
      setActionLoading(productId);
      const { data } = await API.post('/cart', { productId, quantity });
      if (data.success) {
        setCart(data.cart);
        toast.success(data.message || 'Item added to cart');
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast.error(error.response?.data?.message || 'Failed to add item to cart');
    } finally {
      setActionLoading(null);
    }
  };

  // 2. UPDATE QUANTITY (Increment / Decrement)
  const updateQuantity = async (itemId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      let currentItems = [...cart.items];
      const index = currentItems.findIndex(
        (item) => (item._id || item.product?._id) === itemId
      );
      if (index > -1) {
        currentItems[index].quantity = quantity;
        const updatedCart = calculateTotals(currentItems);
        setCart(updatedCart);
        localStorage.setItem('techzone_guest_cart', JSON.stringify(updatedCart));
        toast.success('Cart updated');
      }
      return;
    }

    try {
      setActionLoading(itemId);
      const { data } = await API.put(`/cart/${itemId}`, { quantity });
      if (data.success) {
        setCart(data.cart);
      }
    } catch (error) {
      console.error('Error updating quantity:', error);
      toast.error(error.response?.data?.message || 'Failed to update quantity');
    } finally {
      setActionLoading(null);
    }
  };

  // 3. REMOVE FROM CART (Delete)
  const removeFromCart = async (itemId) => {
    const token = localStorage.getItem('token');
    if (!token) {
      let currentItems = cart.items.filter(
        (item) => (item._id || item.product?._id) !== itemId
      );
      const updatedCart = calculateTotals(currentItems);
      setCart(updatedCart);
      localStorage.setItem('techzone_guest_cart', JSON.stringify(updatedCart));
      toast.success('Item removed from cart');
      return;
    }

    try {
      setActionLoading(itemId);
      const { data } = await API.delete(`/cart/${itemId}`);
      if (data.success) {
        setCart(data.cart);
        toast.success('Item removed from cart');
      }
    } catch (error) {
      console.error('Error removing item from cart:', error);
      toast.error('Failed to remove item');
    } finally {
      setActionLoading(null);
    }
  };

  // 4. CLEAR CART (Delete all)
  const clearCart = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      const emptyCart = { items: [], subtotal: 0, totalItems: 0 };
      setCart(emptyCart);
      localStorage.removeItem('techzone_guest_cart');
      toast.success('Cart cleared');
      return;
    }

    try {
      setLoading(true);
      const { data } = await API.delete('/cart/clear');
      if (data.success) {
        setCart({ items: [], subtotal: 0, totalItems: 0 });
        toast.success('Cart cleared successfully');
      }
    } catch (error) {
      console.error('Error clearing cart:', error);
      toast.error('Failed to clear cart');
    } finally {
      setLoading(false);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        loading,
        actionLoading,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        fetchCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};