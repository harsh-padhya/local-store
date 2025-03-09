/**
 * @file: account/page.tsx
 * @description: Account page for user profile management
 * 
 * @dependencies:
 * - next/navigation: For programmatic navigation
 * - react-icons: For icons
 * 
 * @inputs: None
 * @outputs: Account page UI
 * 
 * @side_effects: None
 */

"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { FiUser, FiMapPin, FiShoppingBag, FiLogOut, FiEdit2, FiTrash2, FiPlus } from 'react-icons/fi';
import { FcGoogle } from 'react-icons/fc';
import { useUser } from '@/contexts/UserContext';
import { Address } from '@/lib/models/order';

export default function AccountPage() {
  const router = useRouter();
  const { user, isAuthenticated, logout, updateUser, updateAddress, removeAddress, setDefaultAddress } = useUser();
  
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  
  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login?redirect=/account');
    }
  }, [isAuthenticated, router]);
  
  // Set initial form values
  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setPhone(user.phone || '');
    }
  }, [user]);
  
  const handleLogout = () => {
    logout();
    router.push('/');
  };
  
  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) return;
    
    updateUser({
      name,
      email,
      phone: phone || undefined,
    });
    
    setIsEditingProfile(false);
  };
  
  const handleSetDefaultAddress = (index: number) => {
    setDefaultAddress(index);
  };
  
  const handleRemoveAddress = (index: number) => {
    if (confirm('Are you sure you want to remove this address?')) {
      removeAddress(index);
    }
  };
  
  if (!isAuthenticated || !user) {
    return null; // Will redirect in useEffect
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">My Account</h1>
      
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
                  className="flex items-center text-indigo-600 font-medium p-2 rounded-lg bg-indigo-50"
                >
                  <FiUser className="mr-3" />
                  <span>Profile</span>
                </Link>
                <Link
                  href="/account/orders"
                  className="flex items-center text-gray-700 hover:text-indigo-600 p-2 rounded-lg hover:bg-gray-50"
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
          {/* Profile Information */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6">
            <div className="p-4 bg-gray-50 border-b flex justify-between items-center">
              <h2 className="font-medium text-gray-800">Profile Information</h2>
              <button
                onClick={() => setIsEditingProfile(!isEditingProfile)}
                className="text-indigo-600 hover:text-indigo-800"
              >
                <FiEdit2 />
              </button>
            </div>
            
            <div className="p-6">
              {isEditingProfile ? (
                <form onSubmit={handleProfileUpdate}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-gray-700 text-sm font-medium mb-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-gray-700 text-sm font-medium mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
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
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                  </div>
                  
                  <div className="mt-4 flex space-x-3">
                    <button
                      type="submit"
                      className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
                    >
                      Save Changes
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsEditingProfile(false)}
                      className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <div className="space-y-4">
                  {user.photoURL && (
                    <div className="flex items-center mb-4">
                      <div className="relative h-16 w-16 rounded-full overflow-hidden mr-4">
                        <Image
                          src={user.photoURL}
                          alt={user.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      {user.provider === 'google' && (
                        <div className="flex items-center text-sm text-gray-500">
                          <FcGoogle className="mr-1" />
                          <span>Google Account</span>
                        </div>
                      )}
                    </div>
                  )}
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Full Name</h3>
                    <p className="text-gray-800">{user.name}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Email Address</h3>
                    <p className="text-gray-800">{user.email}</p>
                  </div>
                  {user.phone && (
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Phone Number</h3>
                      <p className="text-gray-800">{user.phone}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
          
          {/* Saved Addresses */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-4 bg-gray-50 border-b flex justify-between items-center">
              <h2 className="font-medium text-gray-800">Saved Addresses</h2>
              <Link
                href="/checkout"
                className="text-indigo-600 hover:text-indigo-800"
              >
                <FiPlus />
              </Link>
            </div>
            
            <div className="p-6">
              {user.addresses.length > 0 ? (
                <div className="space-y-6">
                  {user.addresses.map((address, index) => (
                    <div key={index} className="border rounded-lg p-4 relative">
                      {user.defaultAddressIndex === index && (
                        <div className="absolute top-2 right-2 bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded-full">
                          Default
                        </div>
                      )}
                      
                      <div className="font-medium">{address.fullName}</div>
                      <div className="text-gray-600 text-sm mt-1">
                        {address.street}, {address.city}, {address.state} {address.postalCode}
                      </div>
                      <div className="text-gray-600 text-sm">
                        Phone: {address.phone}
                      </div>
                      
                      <div className="mt-3 flex space-x-3">
                        {user.defaultAddressIndex !== index && (
                          <button
                            onClick={() => handleSetDefaultAddress(index)}
                            className="text-xs text-indigo-600 hover:text-indigo-800"
                          >
                            Set as Default
                          </button>
                        )}
                        <button
                          onClick={() => handleRemoveAddress(index)}
                          className="text-xs text-red-600 hover:text-red-800"
                        >
                          <FiTrash2 className="inline mr-1" />
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-gray-600 text-center py-6">
                  <FiMapPin className="mx-auto text-3xl text-gray-400 mb-2" />
                  <p>You don't have any saved addresses.</p>
                  <Link
                    href="/checkout"
                    className="mt-2 inline-block text-indigo-600 hover:text-indigo-800"
                  >
                    Add an address
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 