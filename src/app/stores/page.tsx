/**
 * @file: stores/page.tsx
 * @description: All Stores page to display all available stores
 * 
 * @dependencies:
 * - next/image: For optimized image loading
 * - react-icons: For icons
 * 
 * @inputs: None
 * @outputs: All Stores page UI
 * 
 * @side_effects: None
 */

"use client";

import React, { useState } from 'react';
import { FaFilter } from 'react-icons/fa';
import { stores } from '@/lib/data/stores';
import StoreCard from '@/components/StoreCard';

export default function AllStoresPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  // Get unique categories
  const categories = Array.from(new Set(stores.map(store => store.category)));
  
  // Filter stores by selected category
  const filteredStores = selectedCategory
    ? stores.filter(store => store.category === selectedCategory)
    : stores;
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 mb-1">All Stores</h1>
          <p className="text-gray-600">
            Discover all stores available on LocalStores
          </p>
        </div>
        
        <button
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          className="mt-4 md:mt-0 flex items-center bg-white border border-gray-300 rounded-lg px-4 py-2 text-gray-700 hover:bg-gray-50"
        >
          <FaFilter className="mr-2" />
          <span>Filter</span>
        </button>
      </div>
      
      {/* Category Filter */}
      {isFilterOpen && (
        <div className="bg-white rounded-xl shadow-md p-4 mb-6">
          <h2 className="font-medium text-gray-800 mb-3">Categories</h2>
          <div className="flex flex-wrap gap-2">
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
            {categories.map((category) => (
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
        </div>
      )}
      
      {/* Stores Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredStores.map(store => (
          <StoreCard 
            key={store.id} 
            store={store} 
          />
        ))}
      </div>
      
      {filteredStores.length === 0 && (
        <div className="text-center py-12">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">No stores found</h3>
          <p className="text-gray-600">
            {selectedCategory 
              ? `No ${selectedCategory} stores found. Try another category.` 
              : 'No stores found.'}
          </p>
        </div>
      )}
    </div>
  );
} 