'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/lib/store';
import { toggleWishlist, toggleSearch, openCart } from '@/lib/uiSlice';
import { openCart as openCartAction } from '@/lib/cartSlice';
import { toggleMobileMenu } from '@/lib/uiSlice';
import { ShoppingBag, Heart, Search, Menu, X, User } from 'lucide-react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const wishlistItems = useSelector((state: RootState) => state.wishlist.items);
  const isAuthenticated = useSelector((state: RootState) => state.user.isAuthenticated);
  
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const wishlistCount = wishlistItems.length;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/products?search=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <>
      <nav className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
        <div className="container">
          <div className="navbar-content">
            {/* Mobile Menu Button */}
            <button 
              className="mobile-menu-btn"
              onClick={() => dispatch(toggleMobileMenu())}
              aria-label="Toggle menu"
            >
              <Menu size={24} />
            </button>

            {/* Logo */}
            <Link href="/" className="navbar-logo">
              <span className="logo-text">LAQAB</span>
            </Link>

            {/* Desktop Navigation */}
            <ul className="navbar-links">
              <li className="navbar-item">
                <Link href="/" className="navbar-link">Home</Link>
              </li>
              <li className="navbar-item navbar-dropdown">
                <Link href="/collections" className="navbar-link">
                  Collections
                  <svg className="dropdown-icon" width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
                    <path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" strokeWidth="1.5" fill="none" />
                  </svg>
                </Link>
                <div className="navbar-dropdown-menu">
                  <Link href="/collections/wedding-special" className="dropdown-item">Wedding Special</Link>
                  <Link href="/collections/sherwani" className="dropdown-item">Sherwani</Link>
                  <Link href="/collections/kurta" className="dropdown-item">Kurta</Link>
                  <Link href="/collections/festival-collection" className="dropdown-item">Festival Collection</Link>
                </div>
              </li>
              <li className="navbar-item">
                <Link href="/products?scollection=wedding-special" className="navbar-link">Wedding</Link>
              </li>
              <li className="navbar-item">
                <Link href="/products?category=sherwani" className="navbar-link">Sherwani</Link>
              </li>
              <li className="navbar-item">
                <Link href="/products?category=kurta" className="navbar-link">Kurtas</Link>
              </li>
              <li className="navbar-item">
                <Link href="/about" className="navbar-link">About</Link>
              </li>
              <li className="navbar-item">
                <Link href="/blog" className="navbar-link">Blog</Link>
              </li>
              <li className="navbar-item">
                <Link href="/contact" className="navbar-link">Contact</Link>
              </li>
            </ul>

            {/* Right Icons */}
            <div className="navbar-actions">
              <button 
                className="navbar-action"
                onClick={() => setSearchOpen(!searchOpen)}
                aria-label="Search"
              >
                <Search size={20} />
              </button>
              
              <button 
                className="navbar-action hide-mobile"
                onClick={() => dispatch(toggleWishlist())}
                aria-label="Wishlist"
              >
                <Heart size={20} />
                {wishlistCount > 0 && (
                  <span className="action-badge">{wishlistCount}</span>
                )}
              </button>
              
              <button 
                className="navbar-action hide-mobile"
                onClick={() => dispatch(openCartAction())}
                aria-label="Cart"
              >
                <ShoppingBag size={20} />
                {cartCount > 0 && (
                  <span className="action-badge">{cartCount}</span>
                )}
              </button>
              
              <Link href="/account" className="navbar-action hide-mobile" aria-label="Account">
                <User size={20} />
              </Link>
            </div>

            {/* Mobile Cart & Wishlist */}
            <div className="mobile-actions">
              <Link href="/wishlist" className="mobile-action">
                <Heart size={20} />
                {wishlistCount > 0 && (
                  <span className="mobile-badge">{wishlistCount}</span>
                )}
              </Link>
              <Link href="/cart" className="mobile-action">
                <ShoppingBag size={20} />
                {cartCount > 0 && (
                  <span className="mobile-badge">{cartCount}</span>
                )}
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Search Overlay */}
      {searchOpen && (
        <div className="search-overlay">
          <div className="search-container">
            <form onSubmit={handleSearch} className="search-form">
              <input
                type="text"
                placeholder="Search for sherwani, kurta, wedding wear..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
                autoFocus
              />
              <button type="submit" className="search-btn">
                <Search size={24} />
              </button>
            </form>
            <button 
              className="search-close"
              onClick={() => setSearchOpen(false)}
            >
              <X size={24} />
            </button>
          </div>
        </div>
      )}

      <style jsx>{`
        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          padding: 20px 0;
          transition: all 0.3s ease;
          background: transparent;
        }

        .navbar-scrolled {
          background: rgba(26, 26, 26, 0.98);
          padding: 15px 0;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
        }

        .navbar-content {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 40px;
        }

        .navbar-logo {
          text-decoration: none;
        }

        .logo-text {
          font-family: var(--font-heading);
          font-size: 2rem;
          font-weight: 700;
          color: var(--color-gold);
          letter-spacing: 8px;
        }

        .navbar-links {
          display: flex;
          align-items: center;
          gap: 32px;
          list-style: none;
          margin: 0;
          padding: 0;
        }

        .navbar-item {
          position: relative;
        }

        .navbar-link {
          display: flex;
          align-items: center;
          gap: 6px;
          color: var(--color-white);
          text-decoration: none;
          font-size: 0.85rem;
          font-weight: 500;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          transition: color 0.3s ease;
        }

        .navbar-link:hover {
          color: var(--color-gold);
        }

        .dropdown-icon {
          transition: transform 0.3s ease;
        }

        .navbar-dropdown:hover .dropdown-icon {
          transform: rotate(180deg);
        }

        .navbar-dropdown-menu {
          position: absolute;
          top: 100%;
          left: 0;
          min-width: 200px;
          background: var(--color-white);
          border-radius: 8px;
          padding: 12px 0;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
          opacity: 0;
          visibility: hidden;
          transform: translateY(10px);
          transition: all 0.3s ease;
        }

        .navbar-dropdown:hover .navbar-dropdown-menu {
          opacity: 1;
          visibility: visible;
          transform: translateY(0);
        }

        .dropdown-item {
          display: block;
          padding: 10px 20px;
          color: var(--color-gray-700);
          text-decoration: none;
          font-size: 0.875rem;
          transition: all 0.3s ease;
        }

        .dropdown-item:hover {
          background: var(--color-gray-100);
          color: var(--color-gold);
        }

        .navbar-actions {
          display: flex;
          align-items: center;
          gap: 20px;
        }

        .navbar-action {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 44px;
          height: 44px;
          color: var(--color-white);
          border-radius: 50%;
          transition: all 0.3s ease;
          cursor: pointer;
          background: transparent;
          border: none;
        }

        .navbar-action:hover {
          color: var(--color-gold);
          background: rgba(212, 175, 55, 0.1);
        }

        .action-badge {
          position: absolute;
          top: 0;
          right: 0;
          min-width: 18px;
          height: 18px;
          background: var(--color-gold);
          color: var(--color-black);
          font-size: 0.625rem;
          font-weight: 700;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0 4px;
        }

        .mobile-menu-btn {
          display: none;
          color: var(--color-white);
          background: transparent;
          border: none;
          cursor: pointer;
        }

        .mobile-actions {
          display: none;
          gap: 16px;
        }

        .mobile-action {
          position: relative;
          color: var(--color-white);
        }

        .mobile-badge {
          position: absolute;
          top: -8px;
          right: -8px;
          min-width: 16px;
          height: 16px;
          background: var(--color-gold);
          color: var(--color-black);
          font-size: 0.625rem;
          font-weight: 700;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* Search Overlay */
        .search-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          background: rgba(26, 26, 26, 0.98);
          padding: 100px 0;
          z-index: 2000;
          animation: fadeIn 0.3s ease;
        }

        .search-container {
          max-width: 800px;
          margin: 0 auto;
          padding: 0 24px;
          position: relative;
        }

        .search-form {
          display: flex;
          gap: 16px;
        }

        .search-input {
          flex: 1;
          padding: 20px 24px;
          font-size: 1.25rem;
          background: transparent;
          border: none;
          border-bottom: 2px solid var(--color-gray-600);
          color: var(--color-white);
          outline: none;
          transition: border-color 0.3s ease;
        }

        .search-input:focus {
          border-color: var(--color-gold);
        }

        .search-input::placeholder {
          color: var(--color-gray-500);
        }

        .search-btn {
          padding: 20px;
          background: var(--color-gold);
          color: var(--color-black);
          border: none;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .search-btn:hover {
          background: var(--color-gold-dark);
        }

        .search-close {
          position: absolute;
          top: -60px;
          right: 24px;
          color: var(--color-white);
          background: transparent;
          border: none;
          cursor: pointer;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        /* Responsive */
        @media (max-width: 1024px) {
          .navbar-links {
            display: none;
          }

          .mobile-menu-btn {
            display: flex;
          }

          .mobile-actions {
            display: flex;
          }
        }

        @media (max-width: 768px) {
          .hide-mobile {
            display: none !important;
          }

          .logo-text {
            font-size: 1.5rem;
            letter-spacing: 4px;
          }
        }
      `}</style>
    </>
  );
}
