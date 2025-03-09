/**
 * @file: ProductCard.tsx
 * @description: Product card component for displaying product information
 * 
 * @dependencies:
 * - next/image: For optimized image loading
 * - react-icons: For icons
 * 
 * @inputs: Product data
 * @outputs: Product card UI component
 * 
 * @side_effects: None
 */

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { FiShoppingCart, FiMinus, FiPlus } from 'react-icons/fi';
import { Product } from '../lib/data/stores';
import { formatPrice } from '../lib/utils';
import { useCart } from '@/contexts/CartContext';

interface ProductCardProps {
  product: Product;
  storeAddress?: string;
  storeId: string;
}

export default function ProductCard({ product, storeAddress, storeId }: ProductCardProps) {
  const { addToCart, items, updateQuantity, removeFromCart } = useCart();
  const [quantity, setQuantity] = useState(0);
  const [showQuantityControls, setShowQuantityControls] = useState(false);

  // Check if product is already in cart and set initial quantity
  useEffect(() => {
    const cartItem = items.find(item => item.product.id === product.id);
    if (cartItem) {
      setQuantity(cartItem.quantity);
      setShowQuantityControls(true);
    } else {
      setQuantity(0);
      setShowQuantityControls(false);
    }
  }, [items, product.id]);

  const handleAddToCart = () => {
    addToCart(product, storeId);
    setShowQuantityControls(true);
    setQuantity(1);
  };

  const handleIncreaseQuantity = () => {
    const newQuantity = quantity + 1;
    updateQuantity(product.id, newQuantity);
    setQuantity(newQuantity);
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      updateQuantity(product.id, newQuantity);
      setQuantity(newQuantity);
    } else {
      removeFromCart(product.id);
      setShowQuantityControls(false);
      setQuantity(0);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg hover:-translate-y-1">
      <div className="relative h-40 w-full">
        <Image
          src={product.image || 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?q=80&w=800&auto=format&fit=crop'}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover"
          priority={false}
        />
        <div className="absolute top-2 right-2 bg-white px-2 py-1 rounded-full text-xs font-medium text-gray-800">
          {product.category}
        </div>
      </div>
      <div className="p-3">
        <h3 className="text-md font-semibold text-gray-800 mb-1">{product.name}</h3>
        <p className="text-gray-600 text-xs mb-2 line-clamp-2">{product.description}</p>
        <div className="flex justify-between items-center">
          <div className="text-indigo-600 font-medium">{formatPrice(product.price, storeAddress)}</div>
          
          {showQuantityControls ? (
            <div className="flex items-center border rounded-lg overflow-hidden">
              <button 
                onClick={handleDecreaseQuantity}
                className="px-2 py-1 bg-gray-100 hover:bg-gray-200 transition-colors"
                aria-label="Decrease quantity"
              >
                <FiMinus className="text-gray-600" />
              </button>
              <span className="px-2 py-1 text-center w-8">{quantity}</span>
              <button 
                onClick={handleIncreaseQuantity}
                className="px-2 py-1 bg-gray-100 hover:bg-gray-200 transition-colors"
                aria-label="Increase quantity"
              >
                <FiPlus className="text-gray-600" />
              </button>
            </div>
          ) : (
            <button 
              onClick={handleAddToCart}
              className="bg-indigo-600 text-white p-2 rounded-full hover:bg-indigo-700 transition-colors"
              aria-label="Add to cart"
            >
              <FiShoppingCart className="text-sm" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
} 