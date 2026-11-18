import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import AnnouncementBar from '../components/layout/AnnouncementBar';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Loader from '../components/common/Loader';
import API from '../services/api';
import { ShoppingCart, Heart, Star, ShieldCheck, Truck, CheckCircle2 } from 'lucide-react';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const { data } = await API.get(`/products/${id}`);
        if (data.success) {
          setProduct(data.product);
        }
      } catch (error) {
        console.error('Error fetching product details:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-lightBg">
        <AnnouncementBar />
        <Navbar />
        <Loader />
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col bg-lightBg">
        <AnnouncementBar />
        <Navbar />
        <div className="flex-grow flex items-center justify-center text-gray-500 font-semibold">
          Product not found.
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-lightBg">
      <AnnouncementBar />
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-10 flex-grow w-full">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="bg-gray-100 rounded-xl overflow-hidden h-80 sm:h-96 flex items-center justify-center border border-gray-200">
              <img
                src={product.images?.[selectedImage] || 'https://via.placeholder.com/500'}
                alt={product.name}
                className="w-full h-full object-contain p-4"
              />
            </div>
            {product.images?.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`w-20 h-20 rounded-lg border-2 overflow-hidden flex-shrink-0 ${
                      selectedImage === idx ? 'border-secondary' : 'border-gray-200'
                    }`}
                  >
                    <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-5">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-secondary bg-secondary/10 px-2.5 py-1 rounded">
                {product.brand}
              </span>
              <h1 className="text-2xl sm:text-3xl font-black text-primary mt-2">{product.name}</h1>
              <div className="flex items-center gap-3 mt-2 text-sm text-gray-500">
                <div className="flex items-center text-amber-500">
                  <Star size={16} fill="currentColor" />
                  <span className="ml-1 font-semibold text-primary">{product.rating || '4.8'}</span>
                </div>
                <span>({product.numReviews || 0} Reviews)</span>
                <span>•</span>
                <span className="flex items-center gap-1 text-green-600 font-medium">
                  <CheckCircle2 size={16} /> {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                </span>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3 border-y border-gray-100 py-4">
              <span className="text-3xl font-black text-primary">
                ${product.discountPrice || product.price}
              </span>
              {product.discountPrice && (
                <span className="text-lg text-gray-400 line-through">${product.price}</span>
              )}
            </div>

            <p className="text-gray-600 text-sm leading-relaxed">{product.description}</p>

            {/* Specifications */}
            {product.specifications?.length > 0 && (
              <div className="bg-lightBg p-4 rounded-xl space-y-2">
                <h3 className="font-bold text-sm text-primary">Key Specifications</h3>
                <ul className="text-xs text-gray-600 space-y-1.5">
                  {product.specifications.map((spec, idx) => (
                    <li key={idx} className="flex justify-between border-b border-gray-200 pb-1 last:border-none">
                      <span className="font-medium text-gray-500">{spec.key}:</span>
                      <span className="font-semibold text-primary">{spec.value}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Actions */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <div className="flex items-center border border-gray-300 rounded-lg">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-2 text-gray-600 hover:bg-gray-100 font-bold"
                >
                  -
                </button>
                <span className="px-4 py-2 font-semibold text-primary">{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(product.stock || 10, quantity + 1))}
                  className="px-3 py-2 text-gray-600 hover:bg-gray-100 font-bold"
                >
                  +
                </button>
              </div>

              <button
                disabled={product.stock === 0}
                className="flex-1 bg-secondary hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition shadow-md"
              >
                <ShoppingCart size={20} /> Add to Cart
              </button>

              <button className="p-3 border border-gray-300 rounded-lg text-gray-600 hover:text-red-500 hover:border-red-300 transition">
                <Heart size={20} />
              </button>
            </div>

            {/* Guarantees */}
            <div className="grid grid-cols-2 gap-3 pt-4 border-t border-gray-100 text-xs text-gray-600">
              <div className="flex items-center gap-2">
                <Truck size={18} className="text-secondary" />
                <span>Free Express Shipping</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck size={18} className="text-secondary" />
                <span>1 Year Official Warranty</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ProductDetails;