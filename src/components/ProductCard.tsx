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

import React from 'react';
import Image from 'next/image';
import { Product } from '../lib/data/stores';
import { formatPrice } from '../lib/utils';

interface ProductCardProps {
  product: Product;
  storeAddress?: string;
}

export default function ProductCard({ product, storeAddress }: ProductCardProps) {
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
        <div className="text-indigo-600 font-medium">{formatPrice(product.price, storeAddress)}</div>
      </div>
    </div>
  );
} 