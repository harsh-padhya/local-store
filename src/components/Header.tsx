/**
 * @file: Header.tsx
 * @description: Header component with navigation and search functionality
 * 
 * @dependencies:
 * - next/link: For navigation links
 * - next/navigation: For programmatic navigation
 * - react-icons: For icons
 * 
 * @inputs: None
 * @outputs: Header UI component
 * 
 * @side_effects: None
 */

"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FiSearch, FiMenu, FiX, FiShoppingCart, FiUser } from 'react-icons/fi';
import { FaStore, FaMapMarkerAlt } from 'react-icons/fa';
import { useCart } from '@/contexts/CartContext';
import { useUser } from '@/contexts/UserContext';
import { stores } from '@/lib/data/stores';

export default function Header() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState<{ type: 'store' | 'category'; name: string; id?: string }[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);
  
  const router = useRouter();
  const { getCartItemsCount } = useCart();
  const { isAuthenticated, user } = useUser();

  const cartItemsCount = getCartItemsCount();

  // Close suggestions when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Generate search suggestions
  useEffect(() => {
    if (searchQuery.trim().length < 2) {
      setSuggestions([]);
      return;
    }

    const query = searchQuery.toLowerCase().trim();
    const results: { type: 'store' | 'category'; name: string; id?: string }[] = [];
    
    // Get unique categories
    const categories = Array.from(new Set(stores.map(store => store.category)));
    
    // Add matching stores
    stores.forEach(store => {
      if (store.name.toLowerCase().includes(query)) {
        results.push({ type: 'store', name: store.name, id: store.id });
      }
    });
    
    // Add matching categories
    categories.forEach(category => {
      if (category.toLowerCase().includes(query)) {
        results.push({ type: 'category', name: category });
      }
    });
    
    // Limit to 5 suggestions
    setSuggestions(results.slice(0, 5));
  }, [searchQuery]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion: { type: 'store' | 'category'; name: string; id?: string }) => {
    if (suggestion.type === 'store' && suggestion.id) {
      router.push(`/stores/${suggestion.id}`);
    } else {
      router.push(`/search?q=${encodeURIComponent(suggestion.name)}`);
    }
    setShowSuggestions(false);
    setSearchQuery('');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <FaStore className="text-2xl text-indigo-600" />
            <span className="text-xl font-bold text-gray-800">LocalStores</span>
          </Link>

          {/* Search Bar - Hidden on mobile */}
          <div className="hidden md:block flex-grow max-w-md mx-4" ref={searchRef}>
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Search for stores or categories..."
                className="w-full py-2 px-4 pr-10 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setShowSuggestions(true);
                }}
                onFocus={() => setShowSuggestions(true)}
              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-indigo-600"
              >
                <FiSearch className="text-xl" />
              </button>
              
              {/* Search Suggestions */}
              {showSuggestions && suggestions.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden z-50">
                  <ul>
                    {suggestions.map((suggestion, index) => (
                      <li key={index}>
                        <button
                          type="button"
                          onClick={() => handleSuggestionClick(suggestion)}
                          className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center"
                        >
                          {suggestion.type === 'store' ? (
                            <FaStore className="text-indigo-600 mr-2" />
                          ) : (
                            <FiSearch className="text-gray-500 mr-2" />
                          )}
                          <span>{suggestion.name}</span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </form>
          </div>

          {/* Navigation - Hidden on mobile */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/stores" className="text-gray-600 hover:text-indigo-600 font-medium">
              All Stores
            </Link>
            <Link href="/" className="flex items-center text-gray-600 hover:text-indigo-600 font-medium">
              <FaMapMarkerAlt className="mr-1" />
              <span>Nearby</span>
            </Link>
            <Link href="/cart" className="relative text-gray-600 hover:text-indigo-600">
              <FiShoppingCart className="text-xl" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-indigo-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItemsCount > 9 ? '9+' : cartItemsCount}
                </span>
              )}
            </Link>
            <Link 
              href={isAuthenticated ? "/account" : "/login"} 
              className="flex items-center text-gray-600 hover:text-indigo-600 font-medium"
            >
              <FiUser className="mr-1" />
              <span>{isAuthenticated ? (user?.name?.split(' ')[0] || 'Account') : 'Login'}</span>
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex items-center space-x-4 md:hidden">
            <Link href="/cart" className="relative text-gray-600 hover:text-indigo-600">
              <FiShoppingCart className="text-xl" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-indigo-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItemsCount > 9 ? '9+' : cartItemsCount}
                </span>
              )}
            </Link>
            <button
              className="text-gray-600 hover:text-indigo-600"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <FiX className="text-2xl" /> : <FiMenu className="text-2xl" />}
            </button>
          </div>
        </div>

        {/* Mobile Search - Visible only on mobile */}
        <div className="mt-3 md:hidden" ref={searchRef}>
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              placeholder="Search for stores or categories..."
              className="w-full py-2 px-4 pr-10 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowSuggestions(true);
              }}
              onFocus={() => setShowSuggestions(true)}
            />
            <button
              type="submit"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-indigo-600"
            >
              <FiSearch className="text-xl" />
            </button>
            
            {/* Mobile Search Suggestions */}
            {showSuggestions && suggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden z-50">
                <ul>
                  {suggestions.map((suggestion, index) => (
                    <li key={index}>
                      <button
                        type="button"
                        onClick={() => handleSuggestionClick(suggestion)}
                        className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center"
                      >
                        {suggestion.type === 'store' ? (
                          <FaStore className="text-indigo-600 mr-2" />
                        ) : (
                          <FiSearch className="text-gray-500 mr-2" />
                        )}
                        <span>{suggestion.name}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </form>
        </div>

        {/* Mobile Menu - Visible only when menu is open */}
        {isMenuOpen && (
          <nav className="md:hidden mt-3 py-3 border-t border-gray-200">
            <ul className="space-y-3">
              <li>
                <Link
                  href="/stores"
                  className="block text-gray-600 hover:text-indigo-600 font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  All Stores
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  className="flex items-center text-gray-600 hover:text-indigo-600 font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <FaMapMarkerAlt className="mr-1" />
                  <span>Nearby</span>
                </Link>
              </li>
              <li>
                <Link
                  href={isAuthenticated ? "/account" : "/login"}
                  className="flex items-center text-gray-600 hover:text-indigo-600 font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <FiUser className="mr-1" />
                  <span>{isAuthenticated ? (user?.name?.split(' ')[0] || 'Account') : 'Login'}</span>
                </Link>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
} 