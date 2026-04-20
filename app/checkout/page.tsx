'use client';

import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/lib/store';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Check, CreditCard, Smartphone, Building, Truck, ChevronRight } from 'lucide-react';

export default function CheckoutPage() {
  const router = useRouter();
  const { items } = useSelector((state: RootState) => state.cart);
  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [orderPlaced, setOrderPlaced] = useState(false);

  const subtotal = items.reduce((total, item) => total + item.product.price * item.quantity, 0);
  const shipping = subtotal >= 5000 ? 0 : 200;
  const total = subtotal + shipping;

  const [shippingAddress, setShippingAddress] = useState({
    name: '',
    phone: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    pincode: '',
    country: 'India',
  });

  const handleAddressSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(3);
  };

  const handlePlaceOrder = () => {
    setOrderPlaced(true);
    setTimeout(() => {
      router.push('/');
    }, 5000);
  };

  if (items.length === 0 && !orderPlaced) {
    return (
      <div className="checkout-empty">
        <div className="container">
          <h1>Your cart is empty</h1>
          <Link href="/products" className="btn btn-primary">Continue Shopping</Link>
        </div>
      </div>
    );
  }

  if (orderPlaced) {
    return (
      <div className="order-success">
        <div className="container">
          <div className="success-content">
            <div className="success-icon">
              <Check size={48} />
            </div>
            <h1>Order Placed Successfully!</h1>
            <p>Thank you for your order. You will receive a confirmation email shortly.</p>
            <p className="order-number">Order #LAQ{Date.now().toString().slice(-8)}</p>
            <Link href="/" className="btn btn-primary">Continue Shopping</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <div className="container">
        {/* Steps */}
        <div className="checkout-steps">
          <div className={`step ${step >= 1 ? 'active' : ''}`}>
            <span className="step-number">1</span>
            <span className="step-label">Shipping</span>
          </div>
          <div className="step-line"></div>
          <div className={`step ${step >= 2 ? 'active' : ''}`}>
            <span className="step-number">2</span>
            <span className="step-label">Payment</span>
          </div>
          <div className="step-line"></div>
          <div className={`step ${step >= 3 ? 'active' : ''}`}>
            <span className="step-number">3</span>
            <span className="step-label">Confirm</span>
          </div>
        </div>

        <div className="checkout-layout">
          {/* Main Content */}
          <div className="checkout-main">
            {step === 1 && (
              <div className="shipping-section">
                <h2>Shipping Address</h2>
                <form onSubmit={handleAddressSubmit}>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Full Name *</label>
                      <input
                        type="text"
                        required
                        value={shippingAddress.name}
                        onChange={(e) => setShippingAddress({ ...shippingAddress, name: e.target.value })}
                      />
                    </div>
                    <div className="form-group">
                      <label>Phone Number *</label>
                      <input
                        type="tel"
                        required
                        value={shippingAddress.phone}
                        onChange={(e) => setShippingAddress({ ...shippingAddress, phone: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Address Line 1 *</label>
                    <input
                      type="text"
                      required
                      value={shippingAddress.addressLine1}
                      onChange={(e) => setShippingAddress({ ...shippingAddress, addressLine1: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label>Address Line 2</label>
                    <input
                      type="text"
                      value={shippingAddress.addressLine2}
                      onChange={(e) => setShippingAddress({ ...shippingAddress, addressLine2: e.target.value })}
                    />
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>City *</label>
                      <input
                        type="text"
                        required
                        value={shippingAddress.city}
                        onChange={(e) => setShippingAddress({ ...shippingAddress, city: e.target.value })}
                      />
                    </div>
                    <div className="form-group">
                      <label>State *</label>
                      <input
                        type="text"
                        required
                        value={shippingAddress.state}
                        onChange={(e) => setShippingAddress({ ...shippingAddress, state: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Pincode *</label>
                      <input
                        type="text"
                        required
                        value={shippingAddress.pincode}
                        onChange={(e) => setShippingAddress({ ...shippingAddress, pincode: e.target.value })}
                      />
                    </div>
                    <div className="form-group">
                      <label>Country</label>
                      <input type="text" value="India" disabled />
                    </div>
                  </div>
                  <button type="submit" className="btn btn-primary btn-lg">
                    Continue to Payment
                    <ChevronRight size={18} />
                  </button>
                </form>
              </div>
            )}

            {step === 2 && (
              <div className="payment-section">
                <h2>Payment Method</h2>
                <div className="payment-options">
                  <label className={`payment-option ${paymentMethod === 'upi' ? 'selected' : ''}`}>
                    <input
                      type="radio"
                      name="payment"
                      value="upi"
                      checked={paymentMethod === 'upi'}
                      onChange={() => setPaymentMethod('upi')}
                    />
                    <Smartphone size={24} />
                    <div>
                      <h4>UPI</h4>
                      <p>Pay with Google Pay, PhonePe, Paytm</p>
                    </div>
                  </label>
                  <label className={`payment-option ${paymentMethod === 'card' ? 'selected' : ''}`}>
                    <input
                      type="radio"
                      name="payment"
                      value="card"
                      checked={paymentMethod === 'card'}
                      onChange={() => setPaymentMethod('card')}
                    />
                    <CreditCard size={24} />
                    <div>
                      <h4>Credit/Debit Card</h4>
                      <p>Visa, Mastercard, RuPay</p>
                    </div>
                  </label>
                  <label className={`payment-option ${paymentMethod === 'netbanking' ? 'selected' : ''}`}>
                    <input
                      type="radio"
                      name="payment"
                      value="netbanking"
                      checked={paymentMethod === 'netbanking'}
                      onChange={() => setPaymentMethod('netbanking')}
                    />
                    <Building size={24} />
                    <div>
                      <h4>Net Banking</h4>
                      <p>All major banks supported</p>
                    </div>
                  </label>
                  <label className={`payment-option ${paymentMethod === 'cod' ? 'selected' : ''}`}>
                    <input
                      type="radio"
                      name="payment"
                      value="cod"
                      checked={paymentMethod === 'cod'}
                      onChange={() => setPaymentMethod('cod')}
                    />
                    <Truck size={24} />
                    <div>
                      <h4>Cash on Delivery</h4>
                      <p>Pay when you receive</p>
                    </div>
                  </label>
                </div>
                <div className="payment-actions">
                  <button onClick={() => setStep(1)} className="btn btn-outline">
                    Back
                  </button>
                  <button onClick={handlePaymentSubmit} className="btn btn-primary btn-lg">
                    Review Order
                    <ChevronRight size={18} />
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="confirm-section">
                <h2>Order Review</h2>
                
                <div className="review-block">
                  <h4>Shipping Address</h4>
                  <p>{shippingAddress.name}</p>
                  <p>{shippingAddress.addressLine1}</p>
                  {shippingAddress.addressLine2 && <p>{shippingAddress.addressLine2}</p>}
                  <p>{shippingAddress.city}, {shippingAddress.state} - {shippingAddress.pincode}</p>
                  <p>Phone: {shippingAddress.phone}</p>
                  <button onClick={() => setStep(1)} className="edit-btn">Edit</button>
                </div>

                <div className="review-block">
                  <h4>Payment Method</h4>
                  <p>{paymentMethod.toUpperCase()}</p>
                  <button onClick={() => setStep(2)} className="edit-btn">Edit</button>
                </div>

                <div className="review-block">
                  <h4>Order Items</h4>
                  {items.map((item) => (
                    <div key={`${item.product.id}-${item.selectedSize}`} className="order-item">
                      <Image
                        src={item.product.images[0]}
                        alt={item.product.name}
                        width={60}
                        height={80}
                        style={{ objectFit: 'cover' }}
                      />
                      <div>
                        <p className="item-name">{item.product.name}</p>
                        <p className="item-qty">Qty: {item.quantity} | Size: {item.selectedSize}</p>
                        <p className="item-price">₹{(item.product.price * item.quantity).toLocaleString()}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <button onClick={handlePlaceOrder} className="btn btn-primary btn-lg btn-full">
                  Place Order - ₹{total.toLocaleString()}
                </button>
              </div>
            )}
          </div>

          {/* Order Summary */}
          <aside className="order-summary">
            <h3>Order Summary</h3>
            <div className="summary-items">
              {items.map((item) => (
                <div key={`${item.product.id}-${item.selectedSize}`} className="summary-item">
                  <Image
                    src={item.product.images[0]}
                    alt={item.product.name}
                    width={60}
                    height={80}
                    style={{ objectFit: 'cover' }}
                  />
                  <div>
                    <p>{item.product.name}</p>
                    <p>Qty: {item.quantity}</p>
                  </div>
                  <span>₹{(item.product.price * item.quantity).toLocaleString()}</span>
                </div>
              ))}
            </div>
            <div className="summary-totals">
              <div className="summary-row">
                <span>Subtotal</span>
                <span>₹{subtotal.toLocaleString()}</span>
              </div>
              <div className="summary-row">
                <span>Shipping</span>
                <span>{shipping === 0 ? 'FREE' : `₹${shipping}`}</span>
              </div>
              <div className="summary-row total">
                <span>Total</span>
                <span>₹{total.toLocaleString()}</span>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
