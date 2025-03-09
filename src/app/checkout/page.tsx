/**
 * @file: checkout/page.tsx
 * @description: Checkout page for placing orders
 * 
 * @dependencies:
 * - next/navigation: For programmatic navigation
 * - react-icons: For icons
 * 
 * @inputs: None
 * @outputs: Checkout page UI
 * 
 * @side_effects: None
 */

"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FiArrowLeft, FiPlus } from 'react-icons/fi';
import { useCart } from '@/contexts/CartContext';
import { useUser } from '@/contexts/UserContext';
import { formatPrice } from '@/lib/utils';
import { 
  generateOrderId, 
  saveOrder, 
  calculateEstimatedDelivery, 
  generateInitialTracking,
  OrderStatus
} from '@/lib/models/order';
import { Address } from '@/lib/models/order';

export default function CheckoutPage() {
  const router = useRouter();
  const { items, getCartTotal, getUniqueStores, clearCart } = useCart();
  const { user, isAuthenticated, addAddress } = useUser();
  
  const [selectedAddressIndex, setSelectedAddressIndex] = useState<number>(-1);
  const [paymentMethod, setPaymentMethod] = useState<'COD' | 'ONLINE'>('COD');
  const [isAddingAddress, setIsAddingAddress] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');
  
  // New address form state
  const [newAddress, setNewAddress] = useState<Address>({
    fullName: '',
    street: '',
    city: '',
    state: '',
    postalCode: '',
    phone: '',
  });
  
  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login?redirect=/checkout');
    }
  }, [isAuthenticated, router]);
  
  // Redirect if cart is empty
  useEffect(() => {
    if (items.length === 0) {
      router.push('/cart');
    }
  }, [items, router]);
  
  // Set default address if available
  useEffect(() => {
    if (user && user.defaultAddressIndex >= 0) {
      setSelectedAddressIndex(user.defaultAddressIndex);
    }
  }, [user]);
  
  const cartTotal = getCartTotal();
  const deliveryFee = 40; // Fixed delivery fee
  const totalAmount = cartTotal + deliveryFee;
  const uniqueStores = getUniqueStores();
  
  const handleAddressChange = (index: number) => {
    setSelectedAddressIndex(index);
  };
  
  const handleNewAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewAddress(prev => ({ ...prev, [name]: value }));
  };
  
  const handleAddAddress = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate address
    if (!newAddress.fullName || !newAddress.street || !newAddress.city || 
        !newAddress.state || !newAddress.postalCode || !newAddress.phone) {
      setError('All address fields are required');
      return;
    }
    
    // Add address
    addAddress(newAddress);
    
    // Select the newly added address
    if (user) {
      setSelectedAddressIndex(user.addresses.length);
    }
    
    // Reset form and hide it
    setNewAddress({
      fullName: '',
      street: '',
      city: '',
      state: '',
      postalCode: '',
      phone: '',
    });
    setIsAddingAddress(false);
    setError('');
  };
  
  const handlePlaceOrder = async () => {
    // Validate selection
    if (selectedAddressIndex < 0 || !user) {
      setError('Please select a delivery address');
      return;
    }
    
    setIsProcessing(true);
    setError('');
    
    try {
      // Process each store as a separate order
      for (const { store, items } of uniqueStores) {
        // Calculate total for this store
        const storeTotal = items.reduce(
          (total, item) => total + item.product.price * item.quantity,
          0
        ) + deliveryFee;
        
        // Create order
        const order = {
          id: generateOrderId(),
          userId: user.id,
          items,
          store,
          status: OrderStatus.PENDING,
          createdAt: new Date(),
          updatedAt: new Date(),
          total: storeTotal,
          address: user.addresses[selectedAddressIndex],
          paymentMethod,
          estimatedDelivery: calculateEstimatedDelivery(),
          trackingInfo: generateInitialTracking(),
        };
        
        // Save order
        saveOrder(order);
      }
      
      // Clear cart
      clearCart();
      
      // Redirect to success page
      router.push('/checkout/success');
    } catch (error) {
      console.error('Error placing order:', error);
      setError('An error occurred while placing your order. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };
  
  if (!isAuthenticated || !user) {
    return null; // Will redirect in useEffect
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Checkout</h1>
      
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Main Content */}
        <div className="flex-grow">
          {/* Delivery Address */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6">
            <div className="p-4 bg-gray-50 border-b">
              <h2 className="font-medium text-gray-800">Delivery Address</h2>
            </div>
            
            <div className="p-6">
              {error && (
                <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-4">
                  {error}
                </div>
              )}
              
              {user.addresses.length > 0 ? (
                <div className="space-y-4">
                  {user.addresses.map((address, index) => (
                    <div key={index} className="flex items-start">
                      <input
                        type="radio"
                        id={`address-${index}`}
                        name="address"
                        checked={selectedAddressIndex === index}
                        onChange={() => handleAddressChange(index)}
                        className="mt-1 mr-3"
                      />
                      <label htmlFor={`address-${index}`} className="flex-grow">
                        <div className="font-medium">{address.fullName}</div>
                        <div className="text-gray-600 text-sm">
                          {address.street}, {address.city}, {address.state} {address.postalCode}
                        </div>
                        <div className="text-gray-600 text-sm">
                          Phone: {address.phone}
                        </div>
                      </label>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-gray-600 mb-4">
                  You don't have any saved addresses. Please add one.
                </div>
              )}
              
              {isAddingAddress ? (
                <div className="mt-6 border-t pt-6">
                  <h3 className="font-medium text-gray-800 mb-4">Add New Address</h3>
                  <form onSubmit={handleAddAddress}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="fullName" className="block text-gray-700 text-sm font-medium mb-1">
                          Full Name
                        </label>
                        <input
                          type="text"
                          id="fullName"
                          name="fullName"
                          value={newAddress.fullName}
                          onChange={handleNewAddressChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="phone" className="block text-gray-700 text-sm font-medium mb-1">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={newAddress.phone}
                          onChange={handleNewAddressChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          required
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label htmlFor="street" className="block text-gray-700 text-sm font-medium mb-1">
                          Street Address
                        </label>
                        <input
                          type="text"
                          id="street"
                          name="street"
                          value={newAddress.street}
                          onChange={handleNewAddressChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="city" className="block text-gray-700 text-sm font-medium mb-1">
                          City
                        </label>
                        <input
                          type="text"
                          id="city"
                          name="city"
                          value={newAddress.city}
                          onChange={handleNewAddressChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="state" className="block text-gray-700 text-sm font-medium mb-1">
                          State
                        </label>
                        <input
                          type="text"
                          id="state"
                          name="state"
                          value={newAddress.state}
                          onChange={handleNewAddressChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="postalCode" className="block text-gray-700 text-sm font-medium mb-1">
                          Postal Code
                        </label>
                        <input
                          type="text"
                          id="postalCode"
                          name="postalCode"
                          value={newAddress.postalCode}
                          onChange={handleNewAddressChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="mt-4 flex space-x-3">
                      <button
                        type="submit"
                        className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
                      >
                        Save Address
                      </button>
                      <button
                        type="button"
                        onClick={() => setIsAddingAddress(false)}
                        className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              ) : (
                <button
                  onClick={() => setIsAddingAddress(true)}
                  className="mt-4 flex items-center text-indigo-600 hover:text-indigo-800"
                >
                  <FiPlus className="mr-1" />
                  Add New Address
                </button>
              )}
            </div>
          </div>
          
          {/* Payment Method */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6">
            <div className="p-4 bg-gray-50 border-b">
              <h2 className="font-medium text-gray-800">Payment Method</h2>
            </div>
            
            <div className="p-6">
              <div className="space-y-4">
                <div className="flex items-start">
                  <input
                    type="radio"
                    id="payment-cod"
                    name="payment"
                    checked={paymentMethod === 'COD'}
                    onChange={() => setPaymentMethod('COD')}
                    className="mt-1 mr-3"
                  />
                  <label htmlFor="payment-cod" className="flex-grow">
                    <div className="font-medium">Cash on Delivery</div>
                    <div className="text-gray-600 text-sm">
                      Pay with cash when your order is delivered
                    </div>
                  </label>
                </div>
                
                <div className="flex items-start opacity-50">
                  <input
                    type="radio"
                    id="payment-online"
                    name="payment"
                    disabled
                    className="mt-1 mr-3"
                  />
                  <label htmlFor="payment-online" className="flex-grow">
                    <div className="font-medium">Online Payment (Coming Soon)</div>
                    <div className="text-gray-600 text-sm">
                      Pay securely with credit/debit card or UPI
                    </div>
                  </label>
                </div>
              </div>
            </div>
          </div>
          
          {/* Order Items */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-4 bg-gray-50 border-b">
              <h2 className="font-medium text-gray-800">Order Summary</h2>
            </div>
            
            <div className="p-6">
              {uniqueStores.map(({ store, items }) => (
                <div key={store.id} className="mb-6 last:mb-0">
                  <h3 className="font-medium text-gray-800 mb-3">{store.name}</h3>
                  
                  <div className="space-y-3">
                    {items.map((item) => (
                      <div key={item.product.id} className="flex justify-between">
                        <div>
                          <span className="text-gray-800">
                            {item.product.name}
                          </span>
                          <span className="text-gray-500 ml-2">
                            × {item.quantity}
                          </span>
                        </div>
                        <div className="text-gray-800">
                          {formatPrice(item.product.price * item.quantity)}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {uniqueStores.length > 1 && <hr className="my-4" />}
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Order Total */}
        <div className="lg:w-80">
          <div className="bg-white rounded-xl shadow-md overflow-hidden sticky top-24">
            <div className="p-4 bg-gray-50 border-b">
              <h2 className="font-medium text-gray-800">Order Total</h2>
            </div>
            
            <div className="p-4">
              <div className="space-y-3 mb-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">{formatPrice(cartTotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Delivery Fee</span>
                  <span className="font-medium">{formatPrice(deliveryFee)}</span>
                </div>
                <div className="border-t pt-3 flex justify-between">
                  <span className="font-medium">Total</span>
                  <span className="font-bold text-indigo-600">{formatPrice(totalAmount)}</span>
                </div>
              </div>
              
              <button
                onClick={handlePlaceOrder}
                disabled={isProcessing || selectedAddressIndex < 0}
                className={`w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-colors ${
                  (isProcessing || selectedAddressIndex < 0) ? 'opacity-70 cursor-not-allowed' : ''
                }`}
              >
                {isProcessing ? 'Processing...' : 'Place Order'}
              </button>
              
              <Link
                href="/cart"
                className="mt-4 block text-center text-indigo-600 hover:text-indigo-800"
              >
                <FiArrowLeft className="inline mr-1" />
                Back to Cart
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 