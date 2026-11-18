import React, { createContext, useState, useEffect } from 'react';
import API from '../services/api';
import toast from 'react-hot-toast';

export const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState({ products: [] });
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(null); // Specific product ID tracking

  // Fetch Wishlist from API or LocalStorage (for Guests)
  const fetchWishlist = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      // Guest mode: load from localStorage
      const guestWishlist = JSON.parse(localStorage.getItem('techzone_guest_wishlist')) || [];
      setWishlist({ products: guestWishlist });
      return;
    }

    try {
      setLoading(true);
      const { data } = await API.get('/wishlist');
      if (data.success) {
        setWishlist(data.wishlist || { products: [] });
      }
    } catch (error) {
      console.error('Error fetching wishlist:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  // Check if product is already in wishlist
  const isInWishlist = (productId) => {
    return wishlist.products?.some(
      (item) => item._id === productId || item.id === productId || item === productId
    );
  };

  // Toggle Wishlist (Add / Remove) with Guest & API Support
  const toggleWishlist = async (product) => {
    const productId = product._id || product.id || product;
    const token = localStorage.getItem('token');

    if (!token) {
      // Guest mode logic using localStorage
      let updatedProducts = [...wishlist.products];
      const exists = isInWishlist(productId);

      if (exists) {
        updatedProducts = updatedProducts.filter(
          (p) => (p._id || p.id || p) !== productId
        );
        toast.success('Removed from wishlist');
      } else {
        updatedProducts.push(product);
        toast.success('Added to wishlist');
      }

      setWishlist({ products: updatedProducts });
      localStorage.setItem('techzone_guest_wishlist', JSON.stringify(updatedProducts));
      return;
    }

    // Authenticated user logic
    try {
      setActionLoading(productId);
      const { data } = await API.post('/wishlist', { productId });
      if (data.success) {
        setWishlist(data.wishlist || { products: [] });
        toast.success(data.message || 'Wishlist updated successfully');
      }
    } catch (error) {
      console.error('Error updating wishlist:', error);
      toast.error(error.response?.data?.message || 'Failed to update wishlist');
    } finally {
      setActionLoading(null);
    }
  };

  // Clear entire wishlist
  const clearWishlist = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setWishlist({ products: [] });
      localStorage.removeItem('techzone_guest_wishlist');
      toast.success('Wishlist cleared');
      return;
    }

    try {
      setLoading(true);
      const { data } = await API.delete('/wishlist/clear');
      if (data.success) {
        setWishlist({ products: [] });
        toast.success('Wishlist cleared successfully');
      }
    } catch (error) {
      console.error('Error clearing wishlist:', error);
      toast.error('Failed to clear wishlist');
    } finally {
      setLoading(false);
    }
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        loading,
        actionLoading,
        toggleWishlist,
        isInWishlist,
        clearWishlist,
        fetchWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};