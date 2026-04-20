// Product Types
export interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  originalPrice: number;
  images: string[];
  sizes: string[];
  colors: ProductColor[];
  category: string;
  collection: string;
  description: string;
  fabric: string;
  work: string;
  occasion: string;
  inStock: boolean;
  rating: number;
  reviews: Review[];
  featured: boolean;
  trending: boolean;
  createdAt: string;
}

export interface ProductColor {
  name: string;
  hex: string;
}

// Collection Types
export interface Collection {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  productCount: number;
  featured: boolean;
}

// Cart Types
export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize: string;
  selectedColor: string;
}

// Wishlist Types
export interface WishlistItem {
  product: Product;
  addedAt: string;
}

// User Types
export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  addresses: Address[];
  orders: Order[];
}

export interface Address {
  id: string;
  label: string;
  name: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
  isDefault: boolean;
}

// Order Types
export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  status: OrderStatus;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  shippingAddress: Address;
  createdAt: string;
  updatedAt: string;
}

export type OrderStatus = 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
export type PaymentMethod = 'upi' | 'card' | 'netbanking' | 'cod';
export type PaymentStatus = 'pending' | 'paid' | 'failed' | 'refunded';

// Review Types
export interface Review {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  title: string;
  comment: string;
  verified: boolean;
  createdAt: string;
}

// Filter Types
export interface ProductFilters {
  category?: string;
  collection?: string;
  priceRange?: [number, number];
  size?: string;
  color?: string;
  sortBy?: 'price-low' | 'price-high' | 'newest' | 'rating' | 'popular';
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Auth Types
export interface LoginCredentials {
  email?: string;
  phone?: string;
  password: string;
}

export interface SignupData {
  name: string;
  email: string;
  phone: string;
  password: string;
}

// Newsletter Types
export interface NewsletterSubscription {
  email: string;
  subscribed: boolean;
  subscribedAt?: string;
}
