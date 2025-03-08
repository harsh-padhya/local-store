/**
 * @file: page.tsx
 * @description: Home page component showing nearby stores and category filtering
 * 
 * @dependencies:
 * - next/image: For optimized image loading
 * 
 * @inputs: None
 * @outputs: Home page UI
 * 
 * @side_effects: None
 */

"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaMapMarkerAlt, FaStore } from 'react-icons/fa';
import { stores, getAllCategories } from '@/lib/data/stores';
import { getUserLocation, sortStoresByDistance } from '@/lib/utils';
import StoreCard from '@/components/StoreCard';
import CategoryFilter from '@/components/CategoryFilter';

export default function Home() {
  const [nearbyStores, setNearbyStores] = useState(stores);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [userLocation, setUserLocation] = useState<{ lat: number; lon: number } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [locationError, setLocationError] = useState<string | null>(null);
  
  const categories = getAllCategories();

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        setIsLoading(true);
        const position = await getUserLocation();
        setUserLocation({
          lat: position.coords.latitude,
          lon: position.coords.longitude
        });
        setLocationError(null);
      } catch (error) {
        console.error('Error getting location:', error);
        setLocationError('Unable to get your location. Showing all stores instead.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchLocation();
  }, []);

  useEffect(() => {
    let filteredStores = stores;
    
    // Filter by category if selected
    if (selectedCategory) {
      filteredStores = filteredStores.filter(
        store => store.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }
    
    // Sort by distance if user location is available
    if (userLocation) {
      filteredStores = sortStoresByDistance(
        filteredStores,
        userLocation.lat,
        userLocation.lon
      );
    }
    
    setNearbyStores(filteredStores);
  }, [selectedCategory, userLocation]);

  const handleCategoryChange = (category: string | null) => {
    setSelectedCategory(category);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="relative rounded-xl overflow-hidden mb-12">
        <div className="relative h-80 md:h-96 w-full">
          <Image
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1200&auto=format&fit=crop"
            alt="Discover local stores"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/70 to-indigo-600/30 flex items-center">
            <div className="px-6 md:px-12 max-w-2xl">
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Discover Local Stores Near You
              </h1>
              <p className="text-white/90 text-lg mb-6">
                Find the best local stores and products in your neighborhood
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/stores"
                  className="bg-white text-indigo-700 hover:bg-indigo-50 px-6 py-3 rounded-full font-medium flex items-center justify-center"
                >
                  <FaStore className="mr-2" />
                  Browse All Stores
                </Link>
                <Link
                  href="#nearby"
                  className="bg-indigo-600 text-white hover:bg-indigo-700 px-6 py-3 rounded-full font-medium flex items-center justify-center"
                >
                  <FaMapMarkerAlt className="mr-2" />
                  Find Nearby
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Nearby Stores Section */}
      <section id="nearby" className="mb-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-1">Nearby Stores</h2>
            <p className="text-gray-600">
              {locationError 
                ? locationError 
                : userLocation 
                  ? 'Stores closest to your current location' 
                  : 'Finding stores near you...'}
            </p>
          </div>
        </div>

        {/* Category Filter */}
        <CategoryFilter 
          categories={categories} 
          selectedCategory={selectedCategory} 
          onChange={handleCategoryChange} 
        />

        {/* Stores Grid */}
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {nearbyStores.map(store => (
              <StoreCard 
                key={store.id} 
                store={store} 
                distance={userLocation ? 
                  Number(
                    (
                      Math.sqrt(
                        Math.pow(69.1 * (userLocation.lat - store.latitude), 2) +
                        Math.pow(69.1 * (store.longitude - userLocation.lon) * Math.cos(store.latitude / 57.3), 2)
                      ) * 1.609344
                    ).toFixed(1)
                  ) : 
                  undefined
                } 
              />
            ))}
          </div>
        )}

        {nearbyStores.length === 0 && !isLoading && (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No stores found</h3>
            <p className="text-gray-600">
              {selectedCategory 
                ? `No ${selectedCategory} stores found in your area. Try another category.` 
                : 'No stores found in your area.'}
            </p>
          </div>
        )}
      </section>

    </div>
  );
} 