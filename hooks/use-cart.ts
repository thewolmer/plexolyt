import { Color, Length, Product, ProductImage, Width } from 'prisma/prisma-client';
import { toast } from 'sonner';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export interface CartItem extends Product {
  quantity?: number;
  images: ProductImage[];
  color: Color;
  length: Length;
  width: Width;
}

interface CartStore {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  calculateItemTotal: (id: string) => number;
  totalAmount: () => number;
}

export const useCart = create(
  persist<CartStore>(
    (set, get) => ({
      items: [],
      addItem: (item: CartItem) => {
        const currentItems = get().items;
        const existingItem = currentItems.find((i) => i.id === item.id);
        const quantity = item.quantity || 1;
        if (existingItem) {
          existingItem.quantity! += quantity;
          set({ items: [...currentItems] });
          toast.info('Item quantity updated');
        } else {
          const newItem: CartItem = { ...item, quantity };
          set({ items: [...currentItems, newItem] });
          toast.success('Item added to cart');
        }
      },
      removeItem: (id: string) => {
        const currentItems = get().items;
        const newItems = currentItems.filter((i) => i.id !== id);
        set({ items: newItems });
        toast.success('Item removed from cart');
      },
      clearCart: () => {
        set({ items: [] });
        toast.success('Cart cleared');
      },
      calculateItemTotal: (id: string) => {
        const item = get().items.find((i) => i.id === id);
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
