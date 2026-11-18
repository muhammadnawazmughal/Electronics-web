import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Heart, Loader2, Eye, Star } from 'lucide-react';
import { CartContext } from '../../context/CartContext';
import { WishlistContext } from '../../context/WishlistContext';

const ProductCard = ({ product, onViewDetails }) => {
  const { addToCart, actionLoading: cartLoading } = useContext(CartContext);
  const { toggleWishlist, isInWishlist } = useContext(WishlistContext);
  const [imageLoaded, setImageLoaded] = useState(false);

  const productId = product._id || product.id;
  const isWishlisted = isInWishlist(productId);
  const isCartLoading = cartLoading === productId;

  // Calculate discount percentage if discountPrice exists
  const discountPercentage =
    product.discountPrice && product.price
      ? Math.round(((product.price - product.discountPrice) / product.price) * 100)
      : null;

  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col group relative">
      
      {/* Top Badges & Actions */}
      <div className="absolute top-3 left-3 right-3 z-10 flex justify-between items-center pointer-events-none">
        <div className="flex flex-col gap-1 pointer-events-auto">
          {discountPercentage && (
            <span className="bg-accent text-white text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md shadow-sm">
              -{discountPercentage}%
            </span>
          )}
          {product.isFeatured && (
            <span className="bg-secondary text-white text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md shadow-sm">
              Featured
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={() => toggleWishlist(product)}
          className={`p-2 rounded-full backdrop-blur-md transition shadow-md pointer-events-auto ${
            isWishlisted
              ? 'bg-red-50 text-red-500 scale-110'
              : 'bg-white/90 text-gray-700 hover:text-red-500 hover:scale-110'
          }`}
          title={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart size={18} fill={isWishlisted ? 'currentColor' : 'none'} />
        </button>
      </div>

      {/* Product Image Container */}
      <div className="relative overflow-hidden bg-gray-50 h-52 flex items-center justify-center">
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse" />
        )}
        <img
          src={product.images?.[0] || 'https://via.placeholder.com/300'}
          alt={product.name}
          onLoad={() => setImageLoaded(true)}
          className={`w-full h-full object-cover group-hover:scale-108 transition-transform duration-500 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        />

        {/* Quick View Overlay Button */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
          <Link
            to={`/product/${productId}`}
            className="p-2.5 bg-white text-primary rounded-full shadow-lg hover:bg-secondary hover:text-white transition duration-200"
            title="View Details"
          >
            <Eye size={18} />
          </Link>
        </div>
      </div>

      {/* Product Details Content */}
      <div className="p-4 flex flex-col flex-grow">
        {/* Brand & Rating */}
        <div className="flex justify-between items-center mb-1">
          <span className="text-xs text-gray-400 uppercase tracking-wider font-semibold">
            {product.brand || 'TechZone'}
          </span>
          <div className="flex items-center gap-1 text-amber-500 text-xs font-bold">
            <Star size={12} fill="currentColor" />
            <span>{product.ratings || '4.5'}</span>
          </div>
        </div>

        {/* Product Title */}
        <Link
          to={`/product/${productId}`}
          className="font-bold text-primary hover:text-secondary line-clamp-1 mb-2 text-sm md:text-base transition"
        >
          {product.name}
        </Link>

        {/* Stock Status Indicator */}
        <div className="mb-3">
          {product.stock === 0 ? (
            <span className="text-[11px] text-red-500 font-semibold bg-red-50 px-2 py-0.5 rounded">
              Out of Stock
            </span>
          ) : product.stock <= 5 ? (
            <span className="text-[11px] text-orange-500 font-semibold bg-orange-50 px-2 py-0.5 rounded">
              Only {product.stock} left in stock!
            </span>
          ) : (
            <span className="text-[11px] text-emerald-600 font-semibold bg-emerald-50 px-2 py-0.5 rounded">
              In Stock
            </span>
          )}
        </div>

        {/* Pricing Section */}
        <div className="flex items-center gap-2 mt-auto pt-2 border-t border-gray-100">
          <div>
            <span className="text-lg font-black text-primary">
              ${product.discountPrice || product.price}
            </span>
            {product.discountPrice && (
              <span className="text-xs text-gray-400 line-through ml-2">
                ${product.price}
              </span>
            )}
          </div>
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={() => addToCart(product, 1)}
          disabled={isCartLoading || product.stock === 0}
          className="mt-3 w-full bg-primary hover:bg-secondary disabled:bg-gray-300 text-white text-sm font-semibold py-2.5 rounded-xl flex items-center justify-center gap-2 transition duration-200 cursor-pointer shadow-sm active:scale-98"
        >
          {isCartLoading ? (
            <>
              <Loader2 size={16} className="animate-spin" /> Adding...
            </>
          ) : product.stock === 0 ? (
            'Out of Stock'
          ) : (
            <>
              <ShoppingCart size={16} /> Add to Cart
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;