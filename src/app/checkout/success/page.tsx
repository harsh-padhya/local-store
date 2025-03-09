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

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { FiCheckCircle, FiShoppingBag, FiHome, FiClock, FiMapPin, FiTruck } from 'react-icons/fi';
import { useUser } from '@/contexts/UserContext';
import { getUserOrders, Order } from '@/lib/models/order';
import { formatPrice } from '@/lib/utils';

export default function CheckoutSuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, isAuthenticated } = useUser();
  const [latestOrder, setLatestOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);
  
  // Get the latest order
  useEffect(() => {
    if (user) {
      const orders = getUserOrders(user.id);
      if (orders.length > 0) {
        // Sort by date, newest first
        const sortedOrders = [...orders].sort(
          (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
        );
        setLatestOrder(sortedOrders[0]);
      }
      setIsLoading(false);
    }
  }, [user]);
  
  const formatDate = (date: Date): string => {
    return new Intl.DateTimeFormat('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    }).format(date);
  };
  
  if (!isAuthenticated) {
    return null; // Will redirect in useEffect
  }
  
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
          <div className="p-6 bg-green-50 border-b border-green-100 flex items-center">
            <div className="bg-green-100 rounded-full p-3 mr-4">
              <FiCheckCircle className="text-3xl text-green-500" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                Order Placed Successfully!
              </h1>
              <p className="text-gray-600">
                Thank you for your order. We've received your order and will begin processing it right away.
              </p>
            </div>
          </div>
          
          {latestOrder && (
            <div className="p-6">
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <h2 className="text-lg font-semibold text-gray-800">Order Summary</h2>
                  <span className="text-sm text-gray-500">Order #{latestOrder.id}</span>
                </div>
                <div className="text-sm text-gray-600 mb-4">
                  Placed on {formatDate(latestOrder.createdAt)}
                </div>
                
                {/* Order Items */}
                <div className="border rounded-lg overflow-hidden mb-6">
                  <div className="p-4 bg-gray-50 border-b">
                    <div className="flex items-start">
                      <div className="relative h-16 w-16 rounded-lg overflow-hidden mr-4">
                        <Image
                          src={latestOrder.store.image}
                          alt={latestOrder.store.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-800">{latestOrder.store.name}</h3>
                        <p className="text-sm text-gray-600">{latestOrder.items.length} items</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="divide-y">
                    {latestOrder.items.slice(0, 3).map((item) => (
                      <div key={item.product.id} className="p-4 flex items-start">
                        <div className="relative h-12 w-12 flex-shrink-0 rounded overflow-hidden">
                          <Image
                            src={item.product.image}
                            alt={item.product.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        
                        <div className="ml-4 flex-grow">
                          <h4 className="font-medium text-gray-800">{item.product.name}</h4>
                          <p className="text-sm text-gray-600">
                            {item.quantity} × {formatPrice(item.product.price)}
                          </p>
                        </div>
                      </div>
                    ))}
                    
                    {latestOrder.items.length > 3 && (
                      <div className="p-4 text-center text-sm text-indigo-600">
                        +{latestOrder.items.length - 3} more items
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Delivery Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-start">
                      <FiMapPin className="text-indigo-600 mt-1 mr-3" />
                      <div>
                        <h3 className="font-medium text-gray-800 mb-1">Delivery Address</h3>
                        <p className="text-gray-600 text-sm">
                          {latestOrder.address.fullName}
                        </p>
                        <p className="text-gray-600 text-sm">
                          {latestOrder.address.street}, {latestOrder.address.city}, {latestOrder.address.state} {latestOrder.address.postalCode}
                        </p>
                        <p className="text-gray-600 text-sm">
                          Phone: {latestOrder.address.phone}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-start">
                      <FiTruck className="text-indigo-600 mt-1 mr-3" />
                      <div>
                        <h3 className="font-medium text-gray-800 mb-1">Delivery Information</h3>
                        <p className="text-gray-600 text-sm">
                          <span className="font-medium">Estimated Delivery:</span> {formatDate(latestOrder.estimatedDelivery || new Date())}
                        </p>
                        <p className="text-gray-600 text-sm">
                          <span className="font-medium">Payment Method:</span> {latestOrder.paymentMethod === 'COD' ? 'Cash on Delivery' : 'Online Payment'}
                        </p>
                        <p className="text-gray-600 text-sm">
                          <span className="font-medium">Order Status:</span> {latestOrder.status.replace('_', ' ').toUpperCase()}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Order Total */}
                <div className="border-t pt-4">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">{formatPrice(latestOrder.total - 40)}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Delivery Fee</span>
                    <span className="font-medium">{formatPrice(40)}</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span className="text-indigo-600">{formatPrice(latestOrder.total)}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link
                  href={`/account/orders/${latestOrder.id}`}
                  className="inline-flex items-center justify-center bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  <FiClock className="mr-2" />
                  Track Order
                </Link>
                
                <Link
                  href="/account/orders"
                  className="inline-flex items-center justify-center bg-white border border-indigo-600 text-indigo-600 px-6 py-3 rounded-lg hover:bg-indigo-50 transition-colors"
                >
                  <FiShoppingBag className="mr-2" />
                  View All Orders
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
          )}
          
          {!latestOrder && (
            <div className="p-6 text-center">
              <p className="text-gray-600 mb-6">
                Your order has been placed successfully, but we couldn't find your order details.
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
          )}
        </div>
      </div>
    </div>
  );
} 