'use client';

import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/lib/store';
import { logout } from '@/lib/userSlice';
import { User, Package, Heart, MapPin, Settings, LogOut } from 'lucide-react';
import Link from 'next/link';

export default function AccountPage() {
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state: RootState) => state.user);
  const orders = user?.orders || [];
  const [activeTab, setActiveTab] = useState('profile');

  if (!isAuthenticated) {
    return (
      <div className="account-login-required">
        <div className="container">
          <div className="login-prompt">
            <User size={64} />
            <h1>Please Login</h1>
            <p>Login to access your account and manage your orders.</p>
            <Link href="/contact" className="btn btn-primary">
              Login / Sign Up
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="account-page">
      <div className="container">
        <h1>My Account</h1>

        <div className="account-layout">
          {/* Sidebar */}
          <aside className="account-sidebar">
            <div className="user-info">
              <div className="user-avatar">
                {user?.name?.charAt(0).toUpperCase() || 'U'}
              </div>
              <div>
                <h3>{user?.name}</h3>
                <p>{user?.email}</p>
              </div>
            </div>

            <nav className="account-nav">
              <button
                className={activeTab === 'profile' ? 'active' : ''}
                onClick={() => setActiveTab('profile')}
              >
                <User size={18} />
                Profile
              </button>
              <button
                className={activeTab === 'orders' ? 'active' : ''}
                onClick={() => setActiveTab('orders')}
              >
                <Package size={18} />
                My Orders
              </button>
              <button
                className={activeTab === 'wishlist' ? 'active' : ''}
                onClick={() => setActiveTab('wishlist')}
              >
                <Heart size={18} />
                Wishlist
              </button>
              <button
                className={activeTab === 'addresses' ? 'active' : ''}
                onClick={() => setActiveTab('addresses')}
              >
                <MapPin size={18} />
                Addresses
              </button>
              <button
                className={activeTab === 'settings' ? 'active' : ''}
                onClick={() => setActiveTab('settings')}
              >
                <Settings size={18} />
                Settings
              </button>
              <button
                className="logout-btn"
                onClick={() => dispatch(logout())}
              >
                <LogOut size={18} />
                Logout
              </button>
            </nav>
          </aside>

          {/* Content */}
          <div className="account-content">
            {activeTab === 'profile' && (
              <div className="profile-section">
                <h2>Profile Information</h2>
                <div className="profile-form">
                  <div className="form-group">
                    <label>Full Name</label>
                    <input type="text" defaultValue={user?.name} />
                  </div>
                  <div className="form-group">
                    <label>Email</label>
                    <input type="email" defaultValue={user?.email} />
                  </div>
                  <div className="form-group">
                    <label>Phone</label>
                    <input type="tel" defaultValue={user?.phone} />
                  </div>
                  <button className="btn btn-primary">Update Profile</button>
                </div>
              </div>
            )}

            {activeTab === 'orders' && (
              <div className="orders-section">
                <h2>My Orders</h2>
                {orders.length > 0 ? (
                  <div className="orders-list">
                    {orders.map((order) => (
                      <div key={order.id} className="order-card">
                        <div className="order-header">
                          <span className="order-id">Order #{order.id}</span>
                          <span className={`order-status ${order.status}`}>{order.status}</span>
                        </div>
                        <div className="order-details">
                          <p>{order.items.length} items</p>
                          <p className="order-total">₹{order.total.toLocaleString()}</p>
                        </div>
                        <p className="order-date">
                          {new Date(order.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="empty-orders">
                    <Package size={48} />
                    <p>No orders yet</p>
                    <Link href="/products" className="btn btn-primary">
                      Start Shopping
                    </Link>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'wishlist' && (
              <div className="wishlist-section">
                <h2>My Wishlist</h2>
                <Link href="/wishlist" className="btn btn-outline">
                  View Wishlist
                </Link>
              </div>
            )}

            {activeTab === 'addresses' && (
              <div className="addresses-section">
                <h2>Saved Addresses</h2>
                <div className="addresses-list">
                  {user?.addresses?.map((address) => (
                    <div key={address.id} className="address-card">
                      <h4>{address.label}</h4>
                      <p>{address.name}</p>
                      <p>{address.addressLine1}</p>
                      {address.addressLine2 && <p>{address.addressLine2}</p>}
                      <p>{address.city}, {address.state} - {address.pincode}</p>
                      <p>Phone: {address.phone}</p>
                    </div>
                  ))}
                </div>
                <button className="btn btn-primary">Add New Address</button>
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="settings-section">
                <h2>Account Settings</h2>
                <div className="settings-options">
                  <button className="setting-btn">Change Password</button>
                  <button className="setting-btn">Notification Preferences</button>
                  <button className="setting-btn">Delete Account</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
