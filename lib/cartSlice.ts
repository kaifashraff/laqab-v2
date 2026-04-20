'use client';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartItem, Product } from './types';

interface CartState {
  items: CartItem[];
  isOpen: boolean;
}

const initialState: CartState = {
  items: [],
  isOpen: false,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (
      state,
      action: PayloadAction<{
        product: Product;
        quantity: number;
        selectedSize: string;
        selectedColor: string;
      }>
    ) => {
      const { product, quantity, selectedSize, selectedColor } = action.payload;
      const existingItem = state.items.find(
        (item) =>
          item.product.id === product.id &&
          item.selectedSize === selectedSize &&
          item.selectedColor === selectedColor
      );

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.items.push({
          product,
          quantity,
          selectedSize,
          selectedColor,
        });
      }
      state.isOpen = true;
    },

    removeFromCart: (
      state,
      action: PayloadAction<{
        productId: string;
        selectedSize: string;
        selectedColor: string;
      }>
    ) => {
      const { productId, selectedSize, selectedColor } = action.payload;
      state.items = state.items.filter(
        (item) =>
          !(
            item.product.id === productId &&
            item.selectedSize === selectedSize &&
            item.selectedColor === selectedColor
          )
      );
    },

    updateQuantity: (
      state,
      action: PayloadAction<{
        productId: string;
        selectedSize: string;
        selectedColor: string;
        quantity: number;
      }>
    ) => {
      const { productId, selectedSize, selectedColor, quantity } = action.payload;
      const item = state.items.find(
        (item) =>
          item.product.id === productId &&
          item.selectedSize === selectedSize &&
          item.selectedColor === selectedColor
      );
      if (item) {
        item.quantity = quantity;
      }
    },

    clearCart: (state) => {
      state.items = [];
    },

    toggleCart: (state) => {
      state.isOpen = !state.isOpen;
    },

    openCart: (state) => {
      state.isOpen = true;
    },

    closeCart: (state) => {
      state.isOpen = false;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  toggleCart,
  openCart,
  closeCart,
} = cartSlice.actions;

export default cartSlice.reducer;
