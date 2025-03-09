/**
 * @file: order.ts
 * @description: Order model and utility functions for managing orders
 * 
 * @dependencies:
 * - @/contexts/CartContext: For cart item types
 * 
 * @inputs: None
 * @outputs: Order types and utility functions
 * 
 * @side_effects: None
 */

import { CartItem } from "@/contexts/CartContext";
import { Store } from "@/lib/data/stores";

// Order status enum
export enum OrderStatus {
  PENDING = "pending",
  CONFIRMED = "confirmed",
  PREPARING = "preparing",
  OUT_FOR_DELIVERY = "out_for_delivery",
  DELIVERED = "delivered",
  CANCELLED = "cancelled"
}

// Address interface
export interface Address {
  fullName: string;
  street: string;
  city: string;
  state: string;
  postalCode: string;
  phone: string;
}

// Order interface
export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  store: Store;
  status: OrderStatus;
  createdAt: Date;
  updatedAt: Date;
  total: number;
  address: Address;
  paymentMethod: "COD" | "ONLINE";
  estimatedDelivery?: Date;
  trackingInfo?: {
    currentStatus: string;
    statusHistory: {
      status: OrderStatus;
      timestamp: Date;
      description: string;
    }[];
  };
}

// Generate a unique order ID
export function generateOrderId(): string {
  return `ORD-${Math.random().toString(36).substring(2, 8).toUpperCase()}-${Date.now().toString().substring(9)}`;
}

// Get all orders for a user from localStorage
export function getUserOrders(userId: string): Order[] {
  try {
    const ordersJson = localStorage.getItem(`orders_${userId}`);
    if (!ordersJson) return [];
    
    const orders = JSON.parse(ordersJson) as Order[];
    
    // Convert string dates back to Date objects
    return orders.map(order => ({
      ...order,
      createdAt: new Date(order.createdAt),
      updatedAt: new Date(order.updatedAt),
      estimatedDelivery: order.estimatedDelivery ? new Date(order.estimatedDelivery) : undefined,
      trackingInfo: order.trackingInfo ? {
        ...order.trackingInfo,
        statusHistory: order.trackingInfo.statusHistory.map(history => ({
          ...history,
          timestamp: new Date(history.timestamp)
        }))
      } : undefined
    }));
  } catch (error) {
    console.error('Failed to parse orders from localStorage:', error);
    return [];
  }
}

// Save an order to localStorage
export function saveOrder(order: Order): void {
  try {
    const existingOrders = getUserOrders(order.userId);
    const updatedOrders = [...existingOrders, order];
    localStorage.setItem(`orders_${order.userId}`, JSON.stringify(updatedOrders));
  } catch (error) {
    console.error('Failed to save order to localStorage:', error);
  }
}

// Update an existing order
export function updateOrder(updatedOrder: Order): void {
  try {
    const existingOrders = getUserOrders(updatedOrder.userId);
    const updatedOrders = existingOrders.map(order => 
      order.id === updatedOrder.id ? updatedOrder : order
    );
    localStorage.setItem(`orders_${updatedOrder.userId}`, JSON.stringify(updatedOrders));
  } catch (error) {
    console.error('Failed to update order in localStorage:', error);
  }
}

// Get a single order by ID
export function getOrderById(userId: string, orderId: string): Order | undefined {
  const orders = getUserOrders(userId);
  return orders.find(order => order.id === orderId);
}

// Calculate estimated delivery date (24-48 hours from order creation)
export function calculateEstimatedDelivery(createdAt: Date = new Date()): Date {
  const estimatedDelivery = new Date(createdAt);
  estimatedDelivery.setHours(estimatedDelivery.getHours() + 24 + Math.floor(Math.random() * 24));
  return estimatedDelivery;
}

// Generate initial tracking info
export function generateInitialTracking(): Order['trackingInfo'] {
  const now = new Date();
  return {
    currentStatus: OrderStatus.PENDING,
    statusHistory: [
      {
        status: OrderStatus.PENDING,
        timestamp: now,
        description: 'Order has been placed and is awaiting confirmation'
      }
    ]
  };
}

// Update order status with new tracking information
export function updateOrderStatus(
  order: Order, 
  newStatus: OrderStatus, 
  description: string
): Order {
  const now = new Date();
  
  const updatedOrder: Order = {
    ...order,
    status: newStatus,
    updatedAt: now,
    trackingInfo: {
      currentStatus: newStatus,
      statusHistory: [
        ...(order.trackingInfo?.statusHistory || []),
        {
          status: newStatus,
          timestamp: now,
          description
        }
      ]
    }
  };
  
  updateOrder(updatedOrder);
  return updatedOrder;
} 