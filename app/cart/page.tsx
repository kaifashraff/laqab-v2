'use client';

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/lib/store';
import { removeFromCart, updateQuantity, clearCart } from '@/lib/cartSlice';
import Link from 'next/link';
import Image from 'next/image';
import { Minus, Plus, X, ShoppingBag, ArrowLeft, ArrowRight } from 'lucide-react';

export default function CartPage() {
  const dispatch = useDispatch();
  const { items } = useSelector((state: RootState) => state.cart);

  const subtotal = items.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  const originalTotal = items.reduce(
    (total, item) => total + item.product.originalPrice * item.quantity,
    0
  );

  const savings = originalTotal - subtotal;
  const shipping = subtotal >= 5000 ? 0 : 200;
  const total = subtotal + shipping;

  if (items.length === 0) {
    return (
      <div className="cart-empty-page">
        <div className="container">
          <div className="empty-state">
            <ShoppingBag size={80} />
            <h1>Your Cart is Empty</h1>
            <p>Looks like you haven't added anything to your cart yet.</p>
            <Link href="/products" className="btn btn-primary btn-lg">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="container">
        <h1>Shopping Cart ({items.length})</h1>

        <div className="cart-layout">
          <div className="cart-items">
            {items.map((item) => (
              <div key={`${item.product.id}-${item.selectedSize}-${item.selectedColor}`} className="cart-item">
                <div className="item-image">
                  <Image
                    src={item.product.images[0]}
                    alt={item.product.name}
                    width={150}
                    height={200}
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <div className="item-details">
                  <Link href={`/products/${item.product.slug}`} className="item-name">
                    {item.product.name}
                  </Link>
                  <p className="item-option">Size: {item.selectedSize} | Color: {item.selectedColor}</p>
                  <p className="item-category">{item.product.category}</p>
                  <div className="item-price">
                    <span className="price">₹{item.product.price.toLocaleString()}</span>
                    {item.product.originalPrice > item.product.price && (
                      <span className="original-price">₹{item.product.originalPrice.toLocaleString()}</span>
                    )}
                  </div>
                </div>
                <div className="item-quantity">
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
                    <Minus size={16} />
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
                    <Plus size={16} />
                  </button>
                </div>
                <div className="item-total">
                  ₹{(item.product.price * item.quantity).toLocaleString()}
                </div>
                <button
                  className="item-remove"
                  onClick={() => dispatch(removeFromCart({
                    productId: item.product.id,
                    selectedSize: item.selectedSize,
                    selectedColor: item.selectedColor,
                  }))}
                >
                  <X size={20} />
                </button>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h3>Order Summary</h3>
            <div className="summary-rows">
              <div className="summary-row">
                <span>Subtotal ({items.length} items)</span>
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
                <span>{shipping === 0 ? 'FREE' : `₹${shipping}`}</span>
              </div>
              <div className="summary-divider"></div>
              <div className="summary-row total">
                <span>Total</span>
                <span>₹{total.toLocaleString()}</span>
              </div>
            </div>

            {shipping > 0 && (
              <p className="free-shipping">
                Add ₹{(5000 - subtotal).toLocaleString()} more for FREE shipping!
              </p>
            )}

            <Link href="/checkout" className="btn btn-primary btn-full">
              Proceed to Checkout
            </Link>
            <Link href="/products" className="btn btn-outline btn-full">
              <ArrowLeft size={18} />
              Continue Shopping
            </Link>

            <button 
              className="clear-cart"
              onClick={() => dispatch(clearCart())}
            >
              Clear Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
