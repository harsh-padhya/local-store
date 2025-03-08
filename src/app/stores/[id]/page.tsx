/**
 * @file: stores/[id]/page.tsx
 * @description: Store detail page to display information about a specific store and its products
 * 
 * @dependencies:
 * - next/image: For optimized image loading
 * 
 * @inputs: Store ID from URL params
 * @outputs: Store detail page UI
 * 
 * @side_effects: None
 */

"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { FaStar, FaMapMarkerAlt, FaPhone, FaGlobe, FaClock } from 'react-icons/fa';
import { getStoreById } from '@/lib/data/stores';
import { formatRating } from '@/lib/utils';
import ProductCard from '@/components/ProductCard';

interface StoreDetailPageProps {
  params: {
    id: string;
  };
}

export default function StoreDetailPage({ params }: StoreDetailPageProps) {
  const store = getStoreById(params.id);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  if (!store) {
    notFound();
  }

  // Get unique product categories for this store
  const productCategories = Array.from(
    new Set(store.products.map((product) => product.category))
  );

  // Filter products by selected category
  const filteredProducts = selectedCategory
    ? store.products.filter((product) => product.category === selectedCategory)
    : store.products;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Store Header */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
        <div className="relative h-64 w-full">
          <Image
            src={store.image || 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?q=80&w=800&auto=format&fit=crop'}
            alt={store.name}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
            <div className="p-6">
              <div className="inline-block px-3 py-1 bg-white rounded-full text-sm font-medium text-gray-800 mb-3">
                {store.category}
              </div>
              <h1 className="text-3xl font-bold text-white mb-2">{store.name}</h1>
              <div className="flex items-center text-white">
                <div className="flex items-center mr-4">
                  <FaStar className="text-amber-400 mr-1" />
                  <span>{store.rating.toFixed(1)}</span>
                </div>
                <div className="flex items-center">
                  <FaMapMarkerAlt className="mr-1" />
                  <span className="truncate">{store.address}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="p-6">
          <p className="text-gray-700 mb-4">{store.description}</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center text-gray-600">
              <FaMapMarkerAlt className="mr-2 text-indigo-600" />
              <span>{store.address}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <FaPhone className="mr-2 text-indigo-600" />
              <span>(555) 123-4567</span>
            </div>
            <div className="flex items-center text-gray-600">
              <FaClock className="mr-2 text-indigo-600" />
              <span>9:00 AM - 9:00 PM</span>
            </div>
          </div>
        </div>
      </div>

      {/* Store Map */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
        <div className="p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Location</h2>
          <div className="relative h-64 w-full bg-gray-200 rounded-lg">
            {/* Map would go here in a real implementation */}
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="text-gray-500">Map showing location at {store.latitude}, {store.longitude}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Products Section */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Products</h2>
          
          {/* Product Categories Filter */}
          <div className="flex flex-wrap gap-2 mb-6">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === null
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All
            </button>
            {productCategories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
          
          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
            {filteredProducts.map((product) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                storeAddress={store.address}
              />
            ))}
          </div>
          
          {filteredProducts.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-600">No products found in this category.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 