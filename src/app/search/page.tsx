/**
 * @file: search/page.tsx
 * @description: Search page to display search results
 * 
 * @dependencies:
 * - next/navigation: For accessing search params
 * 
 * @inputs: Search query from URL params
 * @outputs: Search results UI
 * 
 * @side_effects: None
 */

"use client";

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { FaSearch } from 'react-icons/fa';
import { searchStores, getAllCategories } from '@/lib/data/stores';
import StoreCard from '@/components/StoreCard';
import CategoryFilter from '@/components/CategoryFilter';

interface SearchPageProps {
  searchParams?: { [key: string]: string | string[] | undefined };
}

export default function SearchPage({ searchParams }: SearchPageProps) {
  const searchParamsHook = useSearchParams();
  const query = searchParamsHook.get('q') || '';
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchResults, setSearchResults] = useState(searchStores(query));
  
  const categories = getAllCategories();

  useEffect(() => {
    // Get initial search results based on query
    let results = searchStores(query);
    
    // Filter by category if selected
    if (selectedCategory) {
      results = results.filter(
        store => store.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }
    
    setSearchResults(results);
  }, [query, selectedCategory]);

  const handleCategoryChange = (category: string | null) => {
    setSelectedCategory(category);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Search Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          {query ? `Search Results for "${query}"` : 'All Stores'}
        </h1>
        <p className="text-gray-600">
          {searchResults.length} {searchResults.length === 1 ? 'store' : 'stores'} found
        </p>
      </div>

      {/* Filters and Results */}
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Filters */}
        <div className="w-full md:w-64 shrink-0">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Filters</h2>
            
            {/* Category Filter */}
            <CategoryFilter 
              categories={categories} 
              selectedCategory={selectedCategory} 
              onChange={handleCategoryChange} 
            />
          </div>
        </div>

        {/* Search Results */}
        <div className="flex-grow">
          {searchResults.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {searchResults.map(store => (
                <StoreCard key={store.id} store={store} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <FaSearch className="mx-auto text-4xl text-gray-300 mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">No results found</h3>
              <p className="text-gray-600 mb-4">
                {selectedCategory 
                  ? `No ${selectedCategory} stores found matching "${query}". Try another category or search term.`
                  : `No stores found matching "${query}". Try a different search term.`}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 