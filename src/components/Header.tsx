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

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FiSearch, FiMenu, FiX } from 'react-icons/fi';
import { FaStore, FaMapMarkerAlt } from 'react-icons/fa';

export default function Header() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
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
          <div className="hidden md:block flex-grow max-w-md mx-4">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Search for stores or categories..."
                className="w-full py-2 px-4 pr-10 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-indigo-600"
              >
                <FiSearch className="text-xl" />
              </button>
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
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-600 hover:text-indigo-600"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <FiX className="text-2xl" /> : <FiMenu className="text-2xl" />}
          </button>
        </div>

        {/* Mobile Search - Visible only on mobile */}
        <div className="mt-3 md:hidden">
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              placeholder="Search for stores or categories..."
              className="w-full py-2 px-4 pr-10 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button
              type="submit"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-indigo-600"
            >
              <FiSearch className="text-xl" />
            </button>
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
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
} 