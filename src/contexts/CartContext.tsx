/**
 * @file: CartContext.tsx
 * @description: Context provider for managing shopping cart functionality
 * 
 * @dependencies:
 * - react: For context API
 * - @/lib/data/stores: For product types
 * 
 * @inputs: Children components
 * @outputs: Cart context provider with cart state and functions
 * 
 * @side_effects: Stores cart data in localStorage
 */

"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product, Store, getStoreById } from '@/lib/data/stores';

// Define cart item type with quantity
export interface CartItem {
  product: Product;
  quantity: number;
  storeId: string;
}

// Define cart context type
interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, storeId: string) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartItemsCount: () => number;
  getStoreItems: (storeId: string) => CartItem[];
  getUniqueStores: () => { store: Store; items: CartItem[] }[];
}

// Create the context with default values
const CartContext = createContext<CartContextType>({
  items: [],
  addToCart: () => {},
  removeFromCart: () => {},
  updateQuantity: () => {},
  clearCart: () => {},
  getCartTotal: () => 0,
  getCartItemsCount: () => 0,
  getStoreItems: () => [],
  getUniqueStores: () => [],
});

// Custom hook to use the cart context
export const useCart = () => useContext(CartContext);

// Cart provider component
export function CartProvider({ children }: { children: ReactNode }) {
  // Initialize cart state from localStorage if available
  const [items, setItems] = useState<CartItem[]>([]);
  
  // Load cart from localStorage on initial render
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart));
      } catch (error) {
        console.error('Failed to parse cart from localStorage:', error);
        localStorage.removeItem('cart');
      }
    }
  }, []);
  
  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items));
  }, [items]);
  
  // Add a product to the cart
  const addToCart = (product: Product, storeId: string) => {
    setItems(prevItems => {
      // Check if product already exists in cart
      const existingItemIndex = prevItems.findIndex(
        item => item.product.id === product.id
      );
      
      if (existingItemIndex >= 0) {
        // If product exists, increase quantity
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + 1
        };
        return updatedItems;
      } else {
        // If product doesn't exist, add it with quantity 1
        return [...prevItems, { product, quantity: 1, storeId }];
      }
    });
  };
  
  // Remove a product from the cart
  const removeFromCart = (productId: string) => {
    setItems(prevItems => 
      prevItems.filter(item => item.product.id !== productId)
    );
  };
  
  // Update the quantity of a product in the cart
  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    
    setItems(prevItems => 
      prevItems.map(item => 
        item.product.id === productId
          ? { ...item, quantity }
          : item
      )
    );
  };
  
  // Clear the entire cart
  const clearCart = () => {
    setItems([]);
  };
  
  // Calculate the total price of all items in the cart
  const getCartTotal = () => {
    return items.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  };
  
  // Get the total number of items in the cart
  const getCartItemsCount = () => {
    return items.reduce((count, item) => count + item.quantity, 0);
  };
  
  // Get items from a specific store
  const getStoreItems = (storeId: string) => {
    return items.filter(item => item.storeId === storeId);
  };
  
  // Get unique stores in the cart with their items
  const getUniqueStores = () => {
    const storeMap = new Map<string, CartItem[]>();
    
    // Group items by store
    items.forEach(item => {
      if (!storeMap.has(item.storeId)) {
        storeMap.set(item.storeId, []);
      }
      storeMap.get(item.storeId)?.push(item);
    });
    
    // Convert map to array of store objects with items
    return Array.from(storeMap.entries()).map(([storeId, storeItems]) => {
      const store = getStoreById(storeId);
      if (!store) {
        throw new Error(`Store with ID ${storeId} not found`);
      }
      return { store, items: storeItems };
    });
  };
  
  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartTotal,
        getCartItemsCount,
        getStoreItems,
        getUniqueStores,
      }}
    >
      {children}
    </CartContext.Provider>
  );
} 