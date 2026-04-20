'use client';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Popup {
  id: string;
  type: 'newsletter' | 'size-guide' | 'quick-view' | 'login' | 'mobile-menu';
  isOpen: boolean;
}

interface UIState {
  popups: Popup[];
  searchQuery: string;
  isSearchOpen: boolean;
  mobileMenuOpen: boolean;
  recentlyViewed: string[];
  notifications: Notification[];
}

interface Notification {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
  duration?: number;
}

const initialState: UIState = {
  popups: [
    { id: 'newsletter', type: 'newsletter', isOpen: false },
    { id: 'size-guide', type: 'size-guide', isOpen: false },
    { id: 'quick-view', type: 'quick-view', isOpen: false },
    { id: 'login', type: 'login', isOpen: false },
    { id: 'mobile-menu', type: 'mobile-menu', isOpen: false },
  ],
  searchQuery: '',
  isSearchOpen: false,
  mobileMenuOpen: false,
  recentlyViewed: [],
  notifications: [],
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    openPopup: (state, action: PayloadAction<string>) => {
      const popup = state.popups.find((p) => p.id === action.payload);
      if (popup) {
        popup.isOpen = true;
      }
    },

    closePopup: (state, action: PayloadAction<string>) => {
      const popup = state.popups.find((p) => p.id === action.payload);
      if (popup) {
        popup.isOpen = false;
      }
    },

    togglePopup: (state, action: PayloadAction<string>) => {
      const popup = state.popups.find((p) => p.id === action.payload);
      if (popup) {
        popup.isOpen = !popup.isOpen;
      }
    },

    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },

    toggleSearch: (state) => {
      state.isSearchOpen = !state.isSearchOpen;
    },

    toggleMobileMenu: (state) => {
      state.mobileMenuOpen = !state.mobileMenuOpen;
    },

    closeMobileMenu: (state) => {
      state.mobileMenuOpen = false;
    },

    addToRecentlyViewed: (state, action: PayloadAction<string>) => {
      const productId = action.payload;
      state.recentlyViewed = state.recentlyViewed.filter((id) => id !== productId);
      state.recentlyViewed.unshift(productId);
      if (state.recentlyViewed.length > 10) {
        state.recentlyViewed = state.recentlyViewed.slice(0, 10);
      }
    },

    addNotification: (
      state,
      action: PayloadAction<Omit<Notification, 'id'>>
    ) => {
      const id = Date.now().toString();
      state.notifications.push({ ...action.payload, id });
    },

    removeNotification: (state, action: PayloadAction<string>) => {
      state.notifications = state.notifications.filter(
        (n) => n.id !== action.payload
      );
    },
  },
});

export const {
  openPopup,
  closePopup,
  togglePopup,
  setSearchQuery,
  toggleSearch,
  toggleMobileMenu,
  closeMobileMenu,
  addToRecentlyViewed,
  addNotification,
  removeNotification,
} = uiSlice.actions;

export default uiSlice.reducer;
