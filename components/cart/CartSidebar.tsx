'use client';

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/lib/store';
import { closeCart, removeFromCart, updateQuantity } from '@/lib/cartSlice';
import Link from 'next/link';
import Image from 'next/image';
import { X, Minus, Plus, ShoppingBag } from 'lucide-react';

export default function CartSidebar() {
  const dispatch = useDispatch();
  const { items, isOpen } = useSelector((state: RootState) => state.cart);

  const subtotal = items.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  const originalTotal = items.reduce(
    (total, item) => total + item.product.originalPrice * item.quantity,
    0
  );

  const savings = originalTotal - subtotal;

  if (!isOpen) return null;

  return (
    <>
      <div className="cart-overlay" onClick={() => dispatch(closeCart())} />
      <div className="cart-sidebar">
        <div className="cart-header">
          <h3>
            <ShoppingBag size={20} />
            Shopping Cart ({items.length})
          </h3>
          <button 
            className="cart-close"
            onClick={() => dispatch(closeCart())}
            aria-label="Close cart"
          >
            <X size={24} />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="cart-empty">
            <ShoppingBag size={64} />
            <h4>Your cart is empty</h4>
            <p>Add some beautiful ethnic wear to get started!</p>
            <Link 
              href="/products" 
              className="btn btn-primary"
              onClick={() => dispatch(closeCart())}
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {items.map((item) => (
                <div key={`${item.product.id}-${item.selectedSize}-${item.selectedColor}`} className="cart-item">
                  <div className="cart-item-image">
                    <Image
                      src={item.product.images[0]}
                      alt={item.product.name}
                      width={100}
                      height={120}
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                  <div className="cart-item-details">
                    <h4>{item.product.name}</h4>
                    <p className="cart-item-option">
                      Size: {item.selectedSize} | Color: {item.selectedColor}
                    </p>
                    <p className="cart-item-price">
                      ₹{item.product.price.toLocaleString()}
                      {item.product.originalPrice > item.product.price && (
                        <span className="original-price">
                          ₹{item.product.originalPrice.toLocaleString()}
                        </span>
                      )}
                    </p>
                    <div className="cart-item-quantity">
                      <button
                        onClick={() => {
                          if (item.quantity > 1) {
                            dispatch(updateQuantity({
                              productId: item.product.id,
                              selectedSize: item.selectedSize,
                              selectedColor: item.selectedColor,
                              quantity: item.quantity - 1,
                            }));
                          }
                        }}
                      >
                        <Minus size={14} />
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        onClick={() => {
                          dispatch(updateQuantity({
                            productId: item.product.id,
                            selectedSize: item.selectedSize,
                            selectedColor: item.selectedColor,
                            quantity: item.quantity + 1,
                          }));
                        }}
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>
                  <button
                    className="cart-item-remove"
                    onClick={() => dispatch(removeFromCart({
                      productId: item.product.id,
                      selectedSize: item.selectedSize,
                      selectedColor: item.selectedColor,
                    }))}
                    aria-label="Remove item"
                  >
                    <X size={18} />
                  </button>
                </div>
              ))}
            </div>

            <div className="cart-footer">
              <div className="cart-summary">
                <div className="summary-row">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toLocaleString()}</span>
                </div>
                {savings > 0 && (
                  <div className="summary-row savings">
                    <span>You Save</span>
                    <span>-₹{savings.toLocaleString()}</span>
                  </div>
                )}
                <div className="summary-row">
                  <span>Shipping</span>
                  <span>{subtotal >= 5000 ? 'FREE' : 'Calculated at checkout'}</span>
                </div>
                <div className="summary-row total">
                  <span>Total</span>
                  <span>₹{subtotal.toLocaleString()}</span>
                </div>
              </div>

              {subtotal < 5000 && (
                <p className="free-shipping-note">
                  Add ₹{(5000 - subtotal).toLocaleString()} more for FREE shipping!
                </p>
              )}

              <Link 
                href="/checkout" 
                className="btn btn-primary btn-full"
                onClick={() => dispatch(closeCart())}
              >
                Proceed to Checkout
              </Link>
              <Link 
                href="/cart" 
                className="btn btn-outline btn-full"
                onClick={() => dispatch(closeCart())}
              >
                View Cart
              </Link>
            </div>
          </>
        )}
      </div>

      <style jsx>{`
        .cart-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          z-index: 1999;
          animation: fadeIn 0.3s ease;
        }

        .cart-sidebar {
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

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slideIn {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }

        .cart-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 20px 24px;
          border-bottom: 1px solid var(--color-gray-200);
        }

        .cart-header h3 {
          display: flex;
          align-items: center;
          gap: 10px;
          font-family: var(--font-heading);
          font-size: 1.25rem;
          margin: 0;
        }

        .cart-close {
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          background: var(--color-gray-100);
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .cart-close:hover {
          background: var(--color-gray-200);
        }

        .cart-empty {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 40px;
          text-align: center;
          color: var(--color-gray-600);
        }

        .cart-empty h4 {
          margin: 20px 0 10px;
          font-size: 1.25rem;
        }

        .cart-empty p {
          margin-bottom: 24px;
        }

        .cart-items {
          flex: 1;
          overflow-y: auto;
          padding: 20px 24px;
        }

        .cart-item {
          display: flex;
          gap: 16px;
          padding: 16px 0;
          border-bottom: 1px solid var(--color-gray-200);
          position: relative;
        }

        .cart-item-image {
          width: 100px;
          height: 120px;
          border-radius: 8px;
          overflow: hidden;
          flex-shrink: 0;
        }

        .cart-item-details {
          flex: 1;
          min-width: 0;
        }

        .cart-item-details h4 {
          font-size: 0.95rem;
          font-weight: 600;
          margin-bottom: 6px;
          line-height: 1.3;
        }

        .cart-item-option {
          font-size: 0.8rem;
          color: var(--color-gray-600);
          margin-bottom: 8px;
        }

        .cart-item-price {
          font-weight: 600;
          color: var(--color-black);
          margin-bottom: 10px;
        }

        .original-price {
          text-decoration: line-through;
          color: var(--color-gray-400);
          font-weight: 400;
          margin-left: 8px;
          font-size: 0.85rem;
        }

        .cart-item-quantity {
          display: flex;
          align-items: center;
          gap: 12px;
          border: 1px solid var(--color-gray-200);
          border-radius: 6px;
          width: fit-content;
        }

        .cart-item-quantity button {
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: background 0.3s ease;
        }

        .cart-item-quantity button:hover {
          background: var(--color-gray-100);
        }

        .cart-item-quantity span {
          font-weight: 600;
          min-width: 24px;
          text-align: center;
        }

        .cart-item-remove {
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
          transition: color 0.3s ease;
        }

        .cart-item-remove:hover {
          color: #EF4444;
        }

        .cart-footer {
          padding: 24px;
          border-top: 1px solid var(--color-gray-200);
          background: var(--color-gray-50);
        }

        .cart-summary {
          margin-bottom: 20px;
        }

        .summary-row {
          display: flex;
          justify-content: space-between;
          padding: 8px 0;
          font-size: 0.9rem;
        }

        .summary-row.savings {
          color: #22C55E;
        }

        .summary-row.total {
          font-size: 1.1rem;
          font-weight: 700;
          border-top: 1px solid var(--color-gray-200);
          margin-top: 8px;
          padding-top: 16px;
        }

        .free-shipping-note {
          font-size: 0.8rem;
          color: var(--color-maroon);
          text-align: center;
          margin-bottom: 16px;
          padding: 8px;
          background: rgba(128, 0, 32, 0.1);
          border-radius: 6px;
        }

        .cart-footer :global(.btn) {
          margin-bottom: 12px;
        }

        .cart-footer :global(.btn:last-child) {
          margin-bottom: 0;
        }

        @media (max-width: 480px) {
          .cart-sidebar {
            max-width: 100%;
          }
        }
      `}</style>
    </>
  );
}
