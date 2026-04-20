'use client';

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/lib/store';
import { toggleWishlist, removeFromWishlist } from '@/lib/wishlistSlice';
import { addToCart } from '@/lib/cartSlice';
import Link from 'next/link';
import Image from 'next/image';
import { X, Heart, ShoppingBag } from 'lucide-react';

export default function WishlistSidebar() {
  const dispatch = useDispatch();
  const { items, isOpen } = useSelector((state: RootState) => state.wishlist);

  if (!isOpen) return null;

  return (
    <>
      <div className="wishlist-overlay" onClick={() => dispatch(toggleWishlist())} />
      <div className="wishlist-sidebar">
        <div className="wishlist-header">
          <h3>
            <Heart size={20} />
            Wishlist ({items.length})
          </h3>
          <button 
            className="wishlist-close"
            onClick={() => dispatch(toggleWishlist())}
          >
            <X size={24} />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="wishlist-empty">
            <Heart size={64} />
            <h4>Your wishlist is empty</h4>
            <p>Save your favorite items for later!</p>
            <Link 
              href="/products" 
              className="btn btn-primary"
              onClick={() => dispatch(toggleWishlist())}
            >
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="wishlist-items">
            {items.map((item) => (
              <div key={item.product.id} className="wishlist-item">
                <div className="wishlist-item-image">
                  <Image
                    src={item.product.images[0]}
                    alt={item.product.name}
                    width={100}
                    height={120}
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <div className="wishlist-item-details">
                  <h4>{item.product.name}</h4>
                  <p className="wishlist-item-category">{item.product.category}</p>
                  <p className="wishlist-item-price">
                    ₹{item.product.price.toLocaleString()}
                    {item.product.originalPrice > item.product.price && (
                      <span className="original-price">
                        ₹{item.product.originalPrice.toLocaleString()}
                      </span>
                    )}
                  </p>
                  <button
                    className="btn btn-sm btn-primary"
                    onClick={() => {
                      dispatch(addToCart({
                        product: item.product,
                        quantity: 1,
                        selectedSize: item.product.sizes[0],
                        selectedColor: item.product.colors[0].name,
                      }));
                      dispatch(removeFromWishlist(item.product.id));
                    }}
                  >
                    <ShoppingBag size={14} />
                    Add to Cart
                  </button>
                </div>
                <button
                  className="wishlist-item-remove"
                  onClick={() => dispatch(removeFromWishlist(item.product.id))}
                >
                  <X size={18} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <style jsx>{`
        .wishlist-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          z-index: 1999;
        }

        .wishlist-sidebar {
          position: fixed;
          top: 0;
          right: 0;
          width: 100%;
          max-width: 420px;
          height: 100vh;
          background: var(--color-white);
          z-index: 2000;
          display: flex;
          flex-direction: column;
          animation: slideIn 0.3s ease;
        }

        @keyframes slideIn {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }

        .wishlist-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 20px 24px;
          border-bottom: 1px solid var(--color-gray-200);
        }

        .wishlist-header h3 {
          display: flex;
          align-items: center;
          gap: 10px;
          font-family: var(--font-heading);
          font-size: 1.25rem;
          margin: 0;
        }

        .wishlist-close {
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          background: var(--color-gray-100);
          cursor: pointer;
        }

        .wishlist-empty {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 40px;
          text-align: center;
          color: var(--color-gray-600);
        }

        .wishlist-empty h4 {
          margin: 20px 0 10px;
        }

        .wishlist-items {
          flex: 1;
          overflow-y: auto;
          padding: 20px 24px;
        }

        .wishlist-item {
          display: flex;
          gap: 16px;
          padding: 16px 0;
          border-bottom: 1px solid var(--color-gray-200);
          position: relative;
        }

        .wishlist-item-image {
          width: 100px;
          height: 120px;
          border-radius: 8px;
          overflow: hidden;
          flex-shrink: 0;
        }

        .wishlist-item-details {
          flex: 1;
        }

        .wishlist-item-details h4 {
          font-size: 0.95rem;
          margin-bottom: 4px;
        }

        .wishlist-item-category {
          font-size: 0.8rem;
          color: var(--color-gray-600);
          margin-bottom: 8px;
        }

        .wishlist-item-price {
          font-weight: 600;
          margin-bottom: 12px;
        }

        .original-price {
          text-decoration: line-through;
          color: var(--color-gray-400);
          font-weight: 400;
          margin-left: 8px;
          font-size: 0.85rem;
        }

        .wishlist-item-remove {
          position: absolute;
          top: 16px;
          right: 0;
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--color-gray-400);
          cursor: pointer;
        }

        .wishlist-item-remove:hover {
          color: #EF4444;
        }

        @media (max-width: 480px) {
          .wishlist-sidebar {
            max-width: 100%;
          }
        }
      `}</style>
    </>
  );
}
