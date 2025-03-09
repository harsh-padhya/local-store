/**
 * @file: checkout/success/page.tsx
 * @description: Checkout success page displayed after successful order placement
 * 
 * @dependencies:
 * - next/navigation: For programmatic navigation
 * - react-icons: For icons
 * 
 * @inputs: None
 * @outputs: Success page UI
 * 
 * @side_effects: None
 */

"use client";

import React, { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FiCheckCircle, FiShoppingBag, FiHome } from 'react-icons/fi';
import { useUser } from '@/contexts/UserContext';

export default function CheckoutSuccessPage() {
  const router = useRouter();
  const { isAuthenticated } = useUser();
  
  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);
  
  if (!isAuthenticated) {
    return null; // Will redirect in useEffect
  }
  
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-2xl mx-auto text-center">
        <div className="mb-6 flex justify-center">
          <FiCheckCircle className="text-6xl text-green-500" />
        </div>
        
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Order Placed Successfully!
        </h1>
        
        <p className="text-gray-600 mb-8">
          Thank you for your order. We've received your order and will begin processing it right away.
          You can track the status of your order in your account.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            href="/account/orders"
            className="inline-flex items-center justify-center bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            <FiShoppingBag className="mr-2" />
            View My Orders
          </Link>
          
          <Link
            href="/"
            className="inline-flex items-center justify-center bg-gray-200 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors"
          >
            <FiHome className="mr-2" />
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
} 