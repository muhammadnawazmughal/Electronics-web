import React from 'react';
import { RotateCcw, SlidersHorizontal } from 'lucide-react';

const ProductFilters = ({ filters, onFilterChange, onResetFilters }) => {
  const categories = ["Smartphones", "Laptops", "Headphones", "Smart Watches", "Cameras"];
  const brands = ["Apple", "Samsung", "Sony", "Dell", "Asus", "HP", "Lenovo"];

  // Handle Category Checkbox Change
  const handleCategoryChange = (category) => {
    const updatedCategories = filters.categories.includes(category)
      ? filters.categories.filter((c) => c !== category)
      : [...filters.categories, category];
    
    onFilterChange({ ...filters, categories: updatedCategories });
  };

  // Handle Brand Checkbox Change
  const handleBrandChange = (brand) => {
    const updatedBrands = filters.brands.includes(brand)
      ? filters.brands.filter((b) => b !== brand)
      : [...filters.brands, brand];
    
    onFilterChange({ ...filters, brands: updatedBrands });
  };

  // Handle Price Range Change
  const handlePriceChange = (e) => {
    onFilterChange({ ...filters, maxPrice: Number(e.target.value) });
  };

  // Handle In-Stock Toggle
  const handleStockChange = (e) => {
    onFilterChange({ ...filters, inStockOnly: e.target.checked });
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-6">
      
      {/* Header & Reset Button */}
      <div className="flex items-center justify-between border-b border-gray-100 pb-4">
        <h3 className="font-bold text-lg text-primary flex items-center gap-2">
          <SlidersHorizontal size={18} className="text-secondary" /> Filters
        </h3>
        <button
          onClick={onResetFilters}
          className="text-xs font-semibold text-gray-400 hover:text-accent flex items-center gap-1 transition"
          title="Reset all filters"
        >
          <RotateCcw size={13} /> Reset
        </button>
      </div>

      {/* Categories Filter */}
      <div>
        <h4 className="font-semibold text-sm text-primary mb-3 uppercase tracking-wider text-xs">Categories</h4>
        <div className="space-y-2.5 text-sm text-gray-600">
          {categories.map((cat, idx) => (
            <label
              key={idx}
              className="flex items-center gap-3 cursor-pointer hover:text-secondary group transition"
            >
              <input
                type="checkbox"
                checked={filters.categories?.includes(cat)}
                onChange={() => handleCategoryChange(cat)}
                className="w-4 h-4 rounded text-secondary focus:ring-secondary border-gray-300 cursor-pointer"
              />
              <span className="group-hover:translate-x-0.5 transition-transform">{cat}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range Filter */}
      <div className="pt-2 border-t border-gray-100">
        <div className="flex justify-between items-center mb-3">
          <h4 className="font-semibold text-primary uppercase tracking-wider text-xs">Max Price</h4>
          <span className="text-sm font-bold text-secondary bg-blue-50 px-2 py-0.5 rounded">
            ${filters.maxPrice || 2000}
          </span>
        </div>
        <input
          type="range"
          min="0"
          max="3000"
          step="50"
          value={filters.maxPrice || 2000}
          onChange={handlePriceChange}
          className="w-full accent-secondary cursor-pointer"
        />
        <div className="flex justify-between text-xs text-gray-400 mt-1">
          <span>$0</span>
          <span>$3,000+</span>
        </div>
      </div>

      {/* Brands Filter */}
      <div className="pt-2 border-t border-gray-100">
        <h4 className="font-semibold text-primary mb-3 uppercase tracking-wider text-xs">Brands</h4>
        <div className="space-y-2.5 text-sm text-gray-600 max-h-48 overflow-y-auto pr-1">
          {brands.map((brand, idx) => (
            <label
              key={idx}
              className="flex items-center gap-3 cursor-pointer hover:text-secondary group transition"
            >
              <input
                type="checkbox"
                checked={filters.brands?.includes(brand)}
                onChange={() => handleBrandChange(brand)}
                className="w-4 h-4 rounded text-secondary focus:ring-secondary border-gray-300 cursor-pointer"
              />
              <span className="group-hover:translate-x-0.5 transition-transform">{brand}</span>
            </label>
          ))}
        </div>
      </div>

      {/* In Stock Only Checkbox */}
      <div className="pt-2 border-t border-gray-100">
        <label className="flex items-center gap-3 cursor-pointer text-sm text-gray-700 font-medium">
          <input
            type="checkbox"
            checked={filters.inStockOnly || false}
            onChange={handleStockChange}
            className="w-4 h-4 rounded text-secondary focus:ring-secondary border-gray-300 cursor-pointer"
          />
          In Stock Only
        </label>
      </div>

    </div>
  );
};

export default ProductFilters;