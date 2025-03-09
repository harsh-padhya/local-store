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
import { FaStore, FaFacebook, FaTwitter, FaInstagram, FaMapMarkerAlt, FaEnvelope, FaPhone } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-indigo-900 to-indigo-700 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-wrap justify-between items-start gap-8">
          {/* Logo and Description */}
          <div className="w-full md:w-auto max-w-xs">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <FaStore className="text-2xl text-white" />
              <span className="text-xl font-bold">LocalStores</span>
            </Link>
            <p className="text-indigo-100 text-sm">
              Discover local stores around you. Find the best products from your neighborhood shops.
            </p>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="text-indigo-200 hover:text-white transition-colors">
                <FaFacebook className="text-xl" />
              </a>
              <a href="#" className="text-indigo-200 hover:text-white transition-colors">
                <FaTwitter className="text-xl" />
              </a>
              <a href="#" className="text-indigo-200 hover:text-white transition-colors">
                <FaInstagram className="text-xl" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="w-full md:w-auto">
            <h3 className="text-lg font-semibold mb-4 border-b border-indigo-500 pb-2">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-indigo-200 hover:text-white transition-colors flex items-center">
                  <span className="w-1 h-1 bg-indigo-300 rounded-full mr-2"></span>
                  Home
                </Link>
              </li>
              <li>
                <Link href="/stores" className="text-indigo-200 hover:text-white transition-colors flex items-center">
                  <span className="w-1 h-1 bg-indigo-300 rounded-full mr-2"></span>
                  All Stores
                </Link>
              </li>
              <li>
                <Link href="/search" className="text-indigo-200 hover:text-white transition-colors flex items-center">
                  <span className="w-1 h-1 bg-indigo-300 rounded-full mr-2"></span>
                  Search
                </Link>
              </li>
              <li>
                <Link href="/cart" className="text-indigo-200 hover:text-white transition-colors flex items-center">
                  <span className="w-1 h-1 bg-indigo-300 rounded-full mr-2"></span>
                  Cart
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div className="w-full md:w-auto">
            <h3 className="text-lg font-semibold mb-4 border-b border-indigo-500 pb-2">Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/search?q=grocery" className="text-indigo-200 hover:text-white transition-colors flex items-center">
                  <span className="w-1 h-1 bg-indigo-300 rounded-full mr-2"></span>
                  Grocery
                </Link>
              </li>
              <li>
                <Link href="/search?q=electronics" className="text-indigo-200 hover:text-white transition-colors flex items-center">
                  <span className="w-1 h-1 bg-indigo-300 rounded-full mr-2"></span>
                  Electronics
                </Link>
              </li>
              <li>
                <Link href="/search?q=clothing" className="text-indigo-200 hover:text-white transition-colors flex items-center">
                  <span className="w-1 h-1 bg-indigo-300 rounded-full mr-2"></span>
                  Clothing
                </Link>
              </li>
              <li>
                <Link href="/search?q=cafe" className="text-indigo-200 hover:text-white transition-colors flex items-center">
                  <span className="w-1 h-1 bg-indigo-300 rounded-full mr-2"></span>
                  Cafe
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="w-full md:w-auto">
            <h3 className="text-lg font-semibold mb-4 border-b border-indigo-500 pb-2">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <FaMapMarkerAlt className="text-indigo-300 mt-1 mr-2" />
                <span className="text-indigo-200">
                  123 Main Street, Mumbai, Maharashtra, India
                </span>
              </li>
              <li className="flex items-center">
                <FaPhone className="text-indigo-300 mr-2" />
                <span className="text-indigo-200">+91 9876543210</span>
              </li>
              <li className="flex items-center">
                <FaEnvelope className="text-indigo-300 mr-2" />
                <span className="text-indigo-200">contact@localstores.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-indigo-600 mt-8 pt-6 text-center text-indigo-200 text-sm">
          <p>&copy; {new Date().getFullYear()} LocalStores. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
} 