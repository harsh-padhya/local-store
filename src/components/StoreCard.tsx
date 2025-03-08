/**
 * @file: StoreCard.tsx
 * @description: Store card component for displaying store information
 * 
 * @dependencies:
 * - next/image: For optimized image loading
 * - next/link: For navigation
 * - react-icons: For icons
 * 
 * @inputs: Store data
 * @outputs: Store card UI component
 * 
 * @side_effects: None
 */

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaStar, FaMapMarkerAlt } from 'react-icons/fa';
import { Store } from '@/lib/data/stores';

interface StoreCardProps {
  store: Store;
  distance?: number;
}

export default function StoreCard({ store, distance }: StoreCardProps) {
  return (
    <Link href={`/stores/${store.id}`} className="block">
      <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg hover:-translate-y-1">
        <div className="relative h-48 w-full">
          <Image
            src={store.image || 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?q=80&w=800&auto=format&fit=crop'}
            alt={store.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
            priority={false}
          />
          <div className="absolute top-2 right-2 bg-white px-2 py-1 rounded-full text-sm font-medium text-gray-800">
            {store.category}
          </div>
        </div>
        <div className="p-4">
          <div className="flex justify-between items-start">
            <h3 className="text-lg font-semibold text-gray-800 mb-1">{store.name}</h3>
            <div className="flex items-center text-amber-500">
              <FaStar />
              <span className="ml-1 text-sm font-medium">{store.rating.toFixed(1)}</span>
            </div>
          </div>
          <p className="text-gray-600 text-sm mb-2 line-clamp-2">{store.description}</p>
          <div className="flex items-center text-gray-500 text-sm">
            <FaMapMarkerAlt className="mr-1" />
            <span className="truncate">{store.address}</span>
          </div>
          {distance !== undefined && (
            <div className="mt-2 text-sm text-indigo-600 font-medium">
              {distance < 1 
                ? `${(distance * 1000).toFixed(0)} m away` 
                : `${distance.toFixed(1)} km away`}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
} 