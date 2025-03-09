/**
 * @file: cart/page.tsx
 * @description: Shopping cart page to display cart items and proceed to checkout
 * 
 * @dependencies:
 * - next/image: For optimized image loading
 * - react-icons: For icons
 * 
 * @inputs: None
 * @outputs: Cart page UI
 * 
 * @side_effects: None
 */

"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FiTrash2, FiMinus, FiPlus, FiArrowLeft, FiShoppingBag } from 'react-icons/fi';
import { useCart } from '@/contexts/CartContext';
import { useUser } from '@/contexts/UserContext';
import { formatPrice } from '@/lib/utils';

export default function CartPage() {
  const router = useRouter();
  const { items, removeFromCart, updateQuantity, getCartTotal, getUniqueStores } = useCart();
  const { isAuthenticated } = useUser();
  
  const uniqueStores = getUniqueStores();
  const cartTotal = getCartTotal();
  
  const handleQuantityChange = (productId: string, newQuantity: number) => {
    updateQuantity(productId, newQuantity);
  };
  
  const handleRemoveItem = (productId: string) => {
    removeFromCart(productId);
  };
  
  const handleCheckout = () => {
    if (isAuthenticated) {
      router.push('/checkout');
    } else {
      router.push('/login?redirect=/checkout');
    }
  };
  
  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto text-center">
          <div className="mb-6 flex justify-center">
            <FiShoppingBag className="text-6xl text-gray-300" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Your cart is empty</h1>
          <p className="text-gray-600 mb-8">
            Looks like you haven't added any products to your cart yet.
          </p>
          <Link
            href="/stores"
            className="inline-flex items-center bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            <FiArrowLeft className="mr-2" />
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Your Shopping Cart</h1>
      
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Cart Items */}
        <div className="flex-grow">
          {uniqueStores.map(({ store, items }) => (
            <div key={store.id} className="bg-white rounded-xl shadow-md overflow-hidden mb-6">
              <div className="p-4 bg-gray-50 border-b">
                <Link href={`/stores/${store.id}`} className="font-medium text-indigo-600 hover:text-indigo-800">
                  {store.name}
                </Link>
              </div>
              
              <div className="divide-y">
                {items.map((item) => (
                  <div key={item.product.id} className="p-4 flex flex-col sm:flex-row items-start sm:items-center">
                    <div className="relative h-20 w-20 flex-shrink-0 rounded overflow-hidden mb-3 sm:mb-0">
                      <Image
                        src={item.product.image}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    
                    <div className="sm:ml-4 flex-grow">
                      <h3 className="font-medium text-gray-800">{item.product.name}</h3>
                      <p className="text-sm text-gray-500 mb-2">{item.product.category}</p>
                      <div className="text-indigo-600 font-medium">
                        {formatPrice(item.product.price)}
                      </div>
                    </div>
                    
                    <div className="flex items-center mt-3 sm:mt-0">
                      <div className="flex items-center border rounded-lg overflow-hidden">
                        <button
                          onClick={() => handleQuantityChange(item.product.id, item.quantity - 1)}
                          className="px-3 py-1 bg-gray-100 hover:bg-gray-200 transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <FiMinus className="text-gray-600" />
                        </button>
                        <span className="px-3 py-1 text-center w-10">{item.quantity}</span>
                        <button
                          onClick={() => handleQuantityChange(item.product.id, item.quantity + 1)}
                          className="px-3 py-1 bg-gray-100 hover:bg-gray-200 transition-colors"
                          aria-label="Increase quantity"
                        >
                          <FiPlus className="text-gray-600" />
                        </button>
                      </div>
                      
                      <button
                        onClick={() => handleRemoveItem(item.product.id)}
                        className="ml-3 text-red-500 hover:text-red-700 transition-colors"
                        aria-label="Remove item"
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
          
          <div className="mt-6">
            <Link
              href="/stores"
              className="inline-flex items-center text-indigo-600 hover:text-indigo-800"
            >
              <FiArrowLeft className="mr-2" />
              Continue Shopping
            </Link>
          </div>
        </div>
        
        {/* Order Summary */}
        <div className="lg:w-80">
          <div className="bg-white rounded-xl shadow-md overflow-hidden sticky top-24">
            <div className="p-4 bg-gray-50 border-b">
              <h2 className="font-medium text-gray-800">Order Summary</h2>
            </div>
            
            <div className="p-4">
              <div className="space-y-3 mb-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">{formatPrice(cartTotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Delivery Fee</span>
                  <span className="font-medium">{formatPrice(40)}</span>
                </div>
                <div className="border-t pt-3 flex justify-between">
                  <span className="font-medium">Total</span>
                  <span className="font-bold text-indigo-600">{formatPrice(cartTotal + 40)}</span>
                </div>
              </div>
              
              <button
                onClick={handleCheckout}
                className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 