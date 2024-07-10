'use client';
import { Color, Gauge, Length, Width } from 'prisma/prisma-client';
import { toast } from 'sonner';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { ProductWithPayLoad } from '@/types/product/ProductWithPayload';

export interface CartItem extends ProductWithPayLoad {
  quantity?: number;
  color?: Color;
  length?: Length;
  width?: Width;
  gauge?: Gauge;
}

interface CartStore {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (item: CartItem) => void;
  clearCart: () => void;
  calculateItemTotal: (item: CartItem) => number;
  totalAmount: () => number;
}
export const useCart = create(
  persist<CartStore>(
    (set, get) => ({
      items: [],
      addItem: (item: CartItem) => {
        const currentItems = get().items;
        const existingItem = currentItems.find(
          (i) =>
            i.id === item.id &&
            i.length === item.length &&
            i.color === item.color &&
            i.width === item.width &&
            i.gauge === item.gauge,
        );
        const quantity = item.quantity || 1;

        if (existingItem) {
          const updatedItems = currentItems.map((i) =>
            i.id === item.id ? { ...i, quantity: i.quantity! + quantity } : i,
          );
          set({ items: updatedItems });
          toast.info('Item quantity updated');
        } else {
          const newItem: CartItem = { ...item, quantity };
          set({ items: [...currentItems, newItem] });
          toast.success('Item added to cart');
        }
      },
      removeItem: (item: CartItem) => {
        const currentItems = get().items;
        const newItems = currentItems.filter(
          (i) =>
            i.id !== item.id ||
            i.color !== item.color ||
            i.length !== item.length ||
            i.width !== item.width ||
            i.gauge !== item.gauge,
        );
        set({ items: newItems });
        toast.success('Item removed from cart');
      },
      clearCart: () => {
        localStorage.removeItem('plexolyt-cart');
        toast.success('Cart cleared');
      },
      calculateItemTotal: (cartItem: CartItem) => {
        const item = get().items.find(
          (i) =>
            i.id === cartItem.id &&
            i.color === cartItem.color &&
            i.length === cartItem.length &&
            i.width === cartItem.width &&
            i.gauge === cartItem.gauge,
        );
        if (!item || !item.quantity) return 0;
        return Number(item.price) * item.quantity;
      },
      totalAmount: () => {
        const { items } = get();
        return items.reduce((total, item) => total + Number(item.price) * (item.quantity || 1), 0);
      },
    }),
    {
      name: 'plexolyt-cart',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
