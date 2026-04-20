'use client';

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/lib/store';
import { closePopup } from '@/lib/uiSlice';
import { addToCart } from '@/lib/cartSlice';
import { addToWishlist } from '@/lib/wishlistSlice';
import { X, Heart, ShoppingBag, Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export default function QuickViewPopup() {
  const dispatch = useDispatch();
  const { popups } = useSelector((state: RootState) => state.ui);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');

  const quickViewPopup = popups.find(p => p.id === 'quick-view');
  
  // In a real app, we'd have a selectedProduct state
  // For now, this is a template

  if (!quickViewPopup?.isOpen) return null;

  return (
    <>
      <div className="popup-overlay" onClick={() => dispatch(closePopup('quick-view'))} />
      <div className="quickview-popup">
        <button className="popup-close" onClick={() => dispatch(closePopup('quick-view'))}>
          <X size={24} />
        </button>
        <div className="quickview-content">
          <div className="quickview-image">
            <Image
              src="https://images.unsplash.com/photo-1519741497674-611481863552?w=600&q=80"
              alt="Product"
              width={400}
              height={500}
              style={{ objectFit: 'cover' }}
            />
          </div>
          <div className="quickview-details">
            <h3>Royal Gold Embroidered Sherwani</h3>
            <div className="quickview-rating">
              <Star size={16} fill="currentColor" />
              <span>4.9 (12 reviews)</span>
            </div>
            <p className="quickview-price">
              <span className="price">₹28,500</span>
              <span className="original-price">₹35,000</span>
              <span className="discount">18% OFF</span>
            </p>
            <p className="quickview-description">
              A masterpiece of Indian craftsmanship featuring intricate zari and sequin work...
            </p>
            
            <div className="quickview-options">
              <div className="option-group">
                <label>Size:</label>
                <div className="size-options">
                  {['S', 'M', 'L', 'XL'].map(size => (
                    <button
                      key={size}
                      className={`size-btn ${selectedSize === size ? 'selected' : ''}`}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="option-group">
                <label>Color:</label>
                <div className="color-options">
                  <button 
                    className={`color-btn ${selectedColor === 'Gold' ? 'selected' : ''}`}
                    onClick={() => setSelectedColor('Gold')}
                    style={{ backgroundColor: '#D4AF37' }}
                  />
                  <button 
                    className={`color-btn ${selectedColor === 'Cream' ? 'selected' : ''}`}
                    onClick={() => setSelectedColor('Cream')}
                    style={{ backgroundColor: '#FFF8E7' }}
                  />
                </div>
              </div>
            </div>

            <div className="quickview-actions">
              <button className="btn btn-primary">
                <ShoppingBag size={18} />
                Add to Cart
              </button>
              <button className="btn btn-outline">
                <Heart size={18} />
              </button>
            </div>

            <Link href="/products/royal-gold-embroidered-sherwani" className="view-details">
              View Full Details →
            </Link>
          </div>
        </div>
      </div>

      <style jsx>{`
        .popup-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.6);
          z-index: 2999;
        }

        .quickview-popup {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 90%;
          max-width: 900px;
          max-height: 90vh;
          background: var(--color-white);
          border-radius: 16px;
          z-index: 3000;
          overflow: hidden;
          animation: scaleIn 0.3s ease;
        }

        @keyframes scaleIn {
          from { transform: translate(-50%, -50%) scale(0.9); opacity: 0; }
          to { transform: translate(-50%, -50%) scale(1); opacity: 1; }
        }

        .popup-close {
          position: absolute;
          top: 16px;
          right: 16px;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--color-white);
          border-radius: 50%;
          cursor: pointer;
          z-index: 1;
        }

        .quickview-content {
          display: grid;
          grid-template-columns: 1fr 1fr;
          max-height: 90vh;
        }

        .quickview-image {
          aspect-ratio: 4/5;
        }

        .quickview-details {
          padding: 40px;
          overflow-y: auto;
        }

        .quickview-details h3 {
          font-family: var(--font-heading);
          font-size: 1.5rem;
          margin-bottom: 12px;
        }

        .quickview-rating {
          display: flex;
          align-items: center;
          gap: 6px;
          color: var(--color-gold);
          margin-bottom: 16px;
        }

        .quickview-rating span {
          color: var(--color-gray-600);
          font-size: 0.9rem;
        }

        .quickview-price {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 16px;
        }

        .price {
          font-size: 1.5rem;
          font-weight: 700;
        }

        .original-price {
          text-decoration: line-through;
          color: var(--color-gray-400);
        }

        .discount {
          background: #FEE2E2;
          color: #EF4444;
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 0.75rem;
          font-weight: 600;
        }

        .quickview-description {
          color: var(--color-gray-600);
          font-size: 0.95rem;
          line-height: 1.7;
          margin-bottom: 24px;
        }

        .option-group {
          margin-bottom: 20px;
        }

        .option-group label {
          display: block;
          font-weight: 600;
          margin-bottom: 10px;
          font-size: 0.9rem;
        }

        .size-options {
          display: flex;
          gap: 8px;
        }

        .size-btn {
          width: 48px;
          height: 48px;
          border: 1px solid var(--color-gray-300);
          border-radius: 8px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .size-btn:hover,
        .size-btn.selected {
          background: var(--color-black);
          color: var(--color-white);
          border-color: var(--color-black);
        }

        .color-options {
          display: flex;
          gap: 8px;
        }

        .color-btn {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          border: 2px solid transparent;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .color-btn.selected {
          border-color: var(--color-black);
          transform: scale(1.1);
        }

        .quickview-actions {
          display: flex;
          gap: 12px;
          margin-bottom: 20px;
        }

        .quickview-actions :global(.btn) {
          flex: 1;
        }

        .view-details {
          display: block;
          text-align: center;
          color: var(--color-gold);
          font-weight: 500;
        }

        @media (max-width: 768px) {
          .quickview-content {
            grid-template-columns: 1fr;
          }

          .quickview-image {
            max-height: 300px;
          }

          .quickview-details {
            padding: 24px;
          }
        }
      `}</style>
    </>
  );
}
