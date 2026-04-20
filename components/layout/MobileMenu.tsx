'use client';

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/lib/store';
import { closeMobileMenu } from '@/lib/uiSlice';
import Link from 'next/link';
import { X, Heart, ShoppingBag, User } from 'lucide-react';

export default function MobileMenu() {
  const dispatch = useDispatch();
  const { mobileMenuOpen } = useSelector((state: RootState) => state.ui);
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const wishlistItems = useSelector((state: RootState) => state.wishlist.items);

  if (!mobileMenuOpen) return null;

  const menuItems = [
    { label: 'Home', href: '/' },
    { label: 'Collections', href: '/collections' },
    { label: 'Wedding Special', href: '/products?collection=wedding-special' },
    { label: 'Sherwani', href: '/products?category=sherwani' },
    { label: 'Kurtas', href: '/products?category=kurta' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ];

  return (
    <>
      <div className="mobile-menu-overlay" onClick={() => dispatch(closeMobileMenu())} />
      <div className="mobile-menu">
        <div className="mobile-menu-header">
          <h2>LAQAB</h2>
          <button onClick={() => dispatch(closeMobileMenu())}>
            <X size={24} />
          </button>
        </div>

        <nav className="mobile-menu-nav">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="mobile-menu-link"
              onClick={() => dispatch(closeMobileMenu())}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="mobile-menu-actions">
          <Link href="/wishlist" className="mobile-menu-action" onClick={() => dispatch(closeMobileMenu())}>
            <Heart size={20} />
            <span>Wishlist</span>
            {wishlistItems.length > 0 && <span className="badge">{wishlistItems.length}</span>}
          </Link>
          <Link href="/cart" className="mobile-menu-action" onClick={() => dispatch(closeMobileMenu())}>
            <ShoppingBag size={20} />
            <span>Cart</span>
            {cartItems.length > 0 && <span className="badge">{cartItems.length}</span>}
          </Link>
          <Link href="/account" className="mobile-menu-action" onClick={() => dispatch(closeMobileMenu())}>
            <User size={20} />
            <span>Account</span>
          </Link>
        </div>

        <div className="mobile-menu-footer">
          <p>Contact: laqabinfo@gmail.com</p>
        </div>
      </div>

      <style jsx>{`
        .mobile-menu-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          z-index: 1999;
        }

        .mobile-menu {
          position: fixed;
          top: 0;
          left: 0;
          width: 85%;
          max-width: 360px;
          height: 100vh;
          background: var(--color-white);
          z-index: 2000;
          display: flex;
          flex-direction: column;
          animation: slideIn 0.3s ease;
        }

        @keyframes slideIn {
          from { transform: translateX(-100%); }
          to { transform: translateX(0); }
        }

        .mobile-menu-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 20px 24px;
          border-bottom: 1px solid var(--color-gray-200);
        }

        .mobile-menu-header h2 {
          font-family: var(--font-heading);
          font-size: 1.5rem;
          color: var(--color-gold);
          letter-spacing: 4px;
        }

        .mobile-menu-header button {
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--color-gray-100);
          border-radius: 50%;
          cursor: pointer;
        }

        .mobile-menu-nav {
          flex: 1;
          overflow-y: auto;
          padding: 20px 0;
        }

        .mobile-menu-link {
          display: block;
          padding: 16px 24px;
          font-size: 1rem;
          font-weight: 500;
          color: var(--color-black);
          text-decoration: none;
          border-bottom: 1px solid var(--color-gray-100);
          transition: all 0.3s ease;
        }

        .mobile-menu-link:hover {
          background: var(--color-gold);
          color: var(--color-black);
        }

        .mobile-menu-actions {
          padding: 20px 24px;
          border-top: 1px solid var(--color-gray-200);
        }

        .mobile-menu-action {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 14px 0;
          color: var(--color-black);
          text-decoration: none;
          font-size: 0.95rem;
        }

        .mobile-menu-action .badge {
          margin-left: auto;
          min-width: 20px;
          height: 20px;
          background: var(--color-gold);
          color: var(--color-black);
          font-size: 0.7rem;
          font-weight: 700;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0 6px;
        }

        .mobile-menu-footer {
          padding: 20px 24px;
          background: var(--color-gray-100);
          text-align: center;
        }

        .mobile-menu-footer p {
          font-size: 0.8rem;
          color: var(--color-gray-600);
          margin: 0;
        }
      `}</style>
    </>
  );
}
