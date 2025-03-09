/**
 * @file: account/orders/[id]/page.tsx
 * @description: Order detail page to display order details and tracking information
 * 
 * @dependencies:
 * - next/navigation: For programmatic navigation
 * - react-icons: For icons
 * 
 * @inputs: Order ID from URL params
 * @outputs: Order detail page UI
 * 
 * @side_effects: None
 */

"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { FiArrowLeft, FiMapPin, FiClock, FiPackage, FiTruck, FiCheck } from 'react-icons/fi';
import { useUser } from '@/contexts/UserContext';
import { getOrderById, Order, OrderStatus } from '@/lib/models/order';
import { formatPrice } from '@/lib/utils';

interface OrderDetailPageProps {
  params: {
    id: string;
  };
}

export default function OrderDetailPage({ params }: OrderDetailPageProps) {
  const orderId = React.use(Promise.resolve(params)).id;
  const router = useRouter();
  const { user, isAuthenticated } = useUser();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  
  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login?redirect=/account/orders');
    }
  }, [isAuthenticated, router]);
  
  // Load order
  useEffect(() => {
    if (user && orderId) {
      const foundOrder = getOrderById(user.id, orderId);
      setOrder(foundOrder || null);
      setLoading(false);
    }
  }, [user, orderId]);
  
  const formatDate = (date: Date): string => {
    return new Intl.DateTimeFormat('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    }).format(date);
  };
  
  const formatDateTime = (date: Date): string => {
    return new Intl.DateTimeFormat('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    }).format(date);
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
  
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <FiClock />;
      case 'confirmed':
        return <FiCheck />;
      case 'preparing':
        return <FiPackage />;
      case 'out_for_delivery':
        return <FiTruck />;
      case 'delivered':
        return <FiCheck />;
      default:
        return <FiClock />;
    }
  };
  
  if (!isAuthenticated || !user) {
    return null; // Will redirect in useEffect
  }
  
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
        </div>
      </div>
    );
  }
  
  if (!order) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-md overflow-hidden p-8 text-center">
          <h2 className="text-xl font-medium text-gray-800 mb-4">Order Not Found</h2>
          <p className="text-gray-600 mb-6">
            The order you're looking for doesn't exist or you don't have permission to view it.
          </p>
          <Link
            href="/account/orders"
            className="inline-flex items-center text-indigo-600 hover:text-indigo-800"
          >
            <FiArrowLeft className="mr-2" />
            Back to Orders
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link
          href="/account/orders"
          className="inline-flex items-center text-indigo-600 hover:text-indigo-800"
        >
          <FiArrowLeft className="mr-2" />
          Back to Orders
        </Link>
      </div>
      
      <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6">
        <div className="p-4 bg-gray-50 border-b flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
          <div>
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-gray-800">Order #{order.id}</h1>
              <span className={`ml-3 text-xs px-2 py-1 rounded-full ${getStatusColor(order.status)}`}>
                {order.status.replace('_', ' ').toUpperCase()}
              </span>
            </div>
            <p className="text-sm text-gray-600">
              Placed on {formatDateTime(order.createdAt)}
            </p>
          </div>
        </div>
        
        <div className="p-6">
          {/* Order Status Timeline */}
          <div className="mb-8">
            <h2 className="text-lg font-medium text-gray-800 mb-4">Order Status</h2>
            
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-3 top-0 bottom-0 w-0.5 bg-gray-200"></div>
              
              {/* Timeline Items */}
              <div className="space-y-6">
                {order.trackingInfo?.statusHistory.map((status, index) => (
                  <div key={index} className="flex">
                    <div className={`relative z-10 flex items-center justify-center w-6 h-6 rounded-full ${
                      index === 0 ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-600'
                    }`}>
                      {getStatusIcon(status.status)}
                    </div>
                    <div className="ml-4">
                      <h3 className="text-sm font-medium text-gray-800">
                        {status.status.replace('_', ' ').toUpperCase()}
                      </h3>
                      <p className="text-xs text-gray-600">
                        {formatDateTime(status.timestamp)}
                      </p>
                      <p className="text-sm text-gray-700 mt-1">
                        {status.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Delivery Information */}
          <div className="mb-8">
            <h2 className="text-lg font-medium text-gray-800 mb-4">Delivery Information</h2>
            
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-start">
                <FiMapPin className="text-indigo-600 mt-1 mr-3" />
                <div>
                  <h3 className="font-medium text-gray-800">{order.address.fullName}</h3>
                  <p className="text-gray-600 text-sm">
                    {order.address.street}, {order.address.city}, {order.address.state} {order.address.postalCode}
                  </p>
                  <p className="text-gray-600 text-sm">
                    Phone: {order.address.phone}
                  </p>
                </div>
              </div>
              
              {order.estimatedDelivery && (
                <div className="flex items-start mt-4">
                  <FiClock className="text-indigo-600 mt-1 mr-3" />
                  <div>
                    <h3 className="font-medium text-gray-800">Estimated Delivery</h3>
                    <p className="text-gray-600 text-sm">
                      {formatDate(order.estimatedDelivery)}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Order Items */}
          <div className="mb-8">
            <h2 className="text-lg font-medium text-gray-800 mb-4">Order Items</h2>
            
            <div className="border rounded-lg overflow-hidden">
              <div className="p-4 bg-gray-50 border-b">
                <div className="flex items-start">
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
                  </div>
                </div>
              </div>
              
              <div className="divide-y">
                {order.items.map((item) => (
                  <div key={item.product.id} className="p-4 flex items-start">
                    <div className="relative h-16 w-16 flex-shrink-0 rounded overflow-hidden">
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
                    
                    <div className="text-right">
                      <p className="font-medium text-gray-800">
                        {formatPrice(item.product.price * item.quantity)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Payment Information */}
          <div>
            <h2 className="text-lg font-medium text-gray-800 mb-4">Payment Information</h2>
            
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">{formatPrice(order.total - 40)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Delivery Fee</span>
                  <span className="font-medium">{formatPrice(40)}</span>
                </div>
                <div className="border-t pt-2 flex justify-between">
                  <span className="font-medium">Total</span>
                  <span className="font-bold text-indigo-600">{formatPrice(order.total)}</span>
                </div>
              </div>
              
              <div className="mt-4">
                <h3 className="text-sm font-medium text-gray-800">Payment Method</h3>
                <p className="text-gray-600">
                  {order.paymentMethod === 'COD' ? 'Cash on Delivery' : 'Online Payment'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 