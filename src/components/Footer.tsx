/**
 * @file: Footer.tsx
 * @description: Footer component for the website
 * 
 * @dependencies:
 * - next/link: For navigation links
 * - react-icons: For icons
 * 
 * @inputs: None
 * @outputs: Footer UI component
 * 
 * @side_effects: None
 */

import React from 'react';
import Link from 'next/link';
import { FaStore, FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <FaStore className="text-2xl text-indigo-400" />
              <span className="text-xl font-bold">LocalStores</span>
            </Link>
            <p className="text-gray-400 text-sm">
              Discover local stores around you. Find the best products from your neighborhood shops.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/stores" className="text-gray-400 hover:text-white transition-colors">
                  All Stores
                </Link>
              </li>
              <li>
                <Link href="/search" className="text-gray-400 hover:text-white transition-colors">
                  Search
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/search?q=grocery" className="text-gray-400 hover:text-white transition-colors">
                  Grocery
                </Link>
              </li>
              <li>
                <Link href="/search?q=electronics" className="text-gray-400 hover:text-white transition-colors">
                  Electronics
                </Link>
              </li>
              <li>
                <Link href="/search?q=clothing" className="text-gray-400 hover:text-white transition-colors">
                  Clothing
                </Link>
              </li>
              <li>
                <Link href="/search?q=cafe" className="text-gray-400 hover:text-white transition-colors">
                  Cafe
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <FaFacebook className="text-xl" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <FaTwitter className="text-xl" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <FaInstagram className="text-xl" />
              </a>
            </div>
            <p className="mt-4 text-gray-400 text-sm">
              Email: contact@localstores.com
            </p>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} LocalStores. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
} 