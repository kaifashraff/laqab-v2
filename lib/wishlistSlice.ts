'use client';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { WishlistItem, Product } from './types';

interface WishlistState {
  items: WishlistItem[];
  isOpen: boolean;
}

const initialState: WishlistState = {
  items: [],
  isOpen: false,
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    addToWishlist: (state, action: PayloadAction<Product>) => {
      const exists = state.items.find(
        (item) => item.product.id === action.payload.id
      );
      if (!exists) {
        state.items.push({
          product: action.payload,
          addedAt: new Date().toISOString(),
        });
      }
    },

    removeFromWishlist: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(
        (item) => item.product.id !== action.payload
      );
    },

    toggleWishlist: (state) => {
      state.isOpen = !state.isOpen;
    },

    clearWishlist: (state) => {
      state.items = [];
    },
  },
});

export const {
  addToWishlist,
  removeFromWishlist,
  toggleWishlist,
  clearWishlist,
} = wishlistSlice.actions;

export default wishlistSlice.reducer;
