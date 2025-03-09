/**
 * @file: account/orders/page.tsx
 * @description: Orders page to display user's order history
 * 
 * @dependencies:
 * - next/navigation: For programmatic navigation
 * - react-icons: For icons
 * 
 * @inputs: None
 * @outputs: Orders page UI
 * 
 * @side_effects: None
 */

"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { FiUser, FiShoppingBag, FiLogOut, FiChevronRight, FiPackage } from 'react-icons/fi';
import { useUser } from '@/contexts/UserContext';
import { getUserOrders, Order } from '@/lib/models/order';
import { formatPrice } from '@/lib/utils';

export default function OrdersPage() {
  const router = useRouter();
  const { user, isAuthenticated, logout } = useUser();
  const [orders, setOrders] = useState<Order[]>([]);
  
  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login?redirect=/account/orders');
    }
  }, [isAuthenticated, router]);
  
  // Load orders
  useEffect(() => {
    if (user) {
      const userOrders = getUserOrders(user.id);
      // Sort by date, newest first
      const sortedOrders = [...userOrders].sort(
        (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
      );
      setOrders(sortedOrders);
    }
  }, [user]);
  
  const handleLogout = () => {
    logout();
    router.push('/');
  };
  
  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'confirmed':
        return 'bg-blue-100 text-blue-800';
      case 'preparing':
        return 'bg-indigo-100 text-indigo-800';
      case 'out_for_delivery':
        return 'bg-purple-100 text-purple-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  const formatDate = (date: Date): string => {
    return new Intl.DateTimeFormat('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    }).format(date);
  };
  
  if (!isAuthenticated || !user) {
    return null; // Will redirect in useEffect
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">My Orders</h1>
      
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar */}
        <div className="lg:w-64">
          <div className="bg-white rounded-xl shadow-md overflow-hidden sticky top-24">
            <div className="p-4 bg-gray-50 border-b">
              <h2 className="font-medium text-gray-800">Account Menu</h2>
            </div>
            
            <div className="p-4">
              <nav className="space-y-2">
                <Link
                  href="/account"
                  className="flex items-center text-gray-700 hover:text-indigo-600 p-2 rounded-lg hover:bg-gray-50"
                >
                  <FiUser className="mr-3" />
                  <span>Profile</span>
                </Link>
                <Link
                  href="/account/orders"
                  className="flex items-center text-indigo-600 font-medium p-2 rounded-lg bg-indigo-50"
                >
                  <FiShoppingBag className="mr-3" />
                  <span>My Orders</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center text-gray-700 hover:text-red-600 w-full text-left p-2 rounded-lg hover:bg-gray-50"
                >
                  <FiLogOut className="mr-3" />
                  <span>Logout</span>
                </button>
              </nav>
            </div>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="flex-grow">
          {orders.length > 0 ? (
            <div className="space-y-6">
              {orders.map((order) => (
                <div key={order.id} className="bg-white rounded-xl shadow-md overflow-hidden">
                  <div className="p-4 bg-gray-50 border-b flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                    <div>
                      <div className="flex items-center">
                        <h2 className="font-medium text-gray-800">Order #{order.id}</h2>
                        <span className={`ml-3 text-xs px-2 py-1 rounded-full ${getStatusColor(order.status)}`}>
                          {order.status.replace('_', ' ').toUpperCase()}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">
                        Placed on {formatDate(order.createdAt)}
                      </p>
                    </div>
                    <Link
                      href={`/account/orders/${order.id}`}
                      className="text-indigo-600 hover:text-indigo-800 text-sm flex items-center"
                    >
                      View Details
                      <FiChevronRight className="ml-1" />
                    </Link>
                  </div>
                  
                  <div className="p-4">
                    <div className="flex items-start mb-4">
                      <div className="flex-shrink-0 mr-4">
                        <div className="relative h-16 w-16 rounded-lg overflow-hidden">
                          <Image
                            src={order.store.image}
                            alt={order.store.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-800">{order.store.name}</h3>
                        <p className="text-sm text-gray-600">{order.items.length} items</p>
                        <p className="text-sm text-gray-600">Total: {formatPrice(order.total)}</p>
                      </div>
                    </div>
                    
                    <div className="border-t pt-4">
                      <div className="flex items-center">
                        <FiPackage className="text-indigo-600 mr-2" />
                        <div className="text-sm">
                          <span className="font-medium">Estimated Delivery: </span>
                          {order.estimatedDelivery ? formatDate(order.estimatedDelivery) : 'Not available'}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="p-8 text-center">
                <FiShoppingBag className="mx-auto text-4xl text-gray-400 mb-4" />
                <h2 className="text-xl font-medium text-gray-800 mb-2">No Orders Yet</h2>
                <p className="text-gray-600 mb-6">
                  You haven't placed any orders yet. Start shopping to place your first order!
                </p>
                <Link
                  href="/stores"
                  className="inline-flex items-center justify-center bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  Browse Stores
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 