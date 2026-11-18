import React from 'react';

const Input = ({ label, type = 'text', name, value, onChange, placeholder, error, className = '' }) => {
  return (
    <div className="flex flex-col gap-1 w-full">
      {label && <label className="text-sm font-semibold text-primary">{label}</label>}
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`px-4 py-2 rounded-lg border bg-white focus:outline-none focus:ring-2 focus:ring-secondary transition duration-200 ${
          error ? 'border-red-500' : 'border-gray-300'
        } ${className}`}
      />
      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  );
};

export default Input;