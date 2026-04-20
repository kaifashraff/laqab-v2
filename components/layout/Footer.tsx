'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <footer className="footer">
      {/* Newsletter Section */}
      <div className="footer-newsletter">
        <div className="container">
          <div className="newsletter-grid">
            <div className="newsletter-content">
              <h3>Join the LAQAB Family</h3>
              <p>Subscribe to receive exclusive offers, new collection updates, and style inspiration.</p>
            </div>
            <form onSubmit={handleNewsletterSubmit} className="newsletter-form">
              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button type="submit" className="btn btn-primary">
                {subscribed ? '✓ Subscribed!' : 'Subscribe'}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="footer-main">
        <div className="container">
          <div className="footer-grid">
            {/* Brand Column */}
            <div className="footer-column footer-brand">
              <h2 className="footer-logo">LAQAB</h2>
              <p className="footer-tagline">
                Where tradition meets elegance. Premium ethnic menswear crafted for the modern gentleman.
              </p>
              <div className="footer-social">
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                </a>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                </a>
                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div className="footer-column">
              <h4>Quick Links</h4>
              <ul>
                <li><Link href="/collections">All Collections</Link></li>
                <li><Link href="/products?collection=wedding-special">Wedding Special</Link></li>
                <li><Link href="/products?category=sherwani">Sherwani</Link></li>
                <li><Link href="/products?category=kurta">Kurtas</Link></li>
                <li><Link href="/products?featured=true">Featured Products</Link></li>
              </ul>
            </div>

            {/* Customer Service */}
            <div className="footer-column">
              <h4>Customer Service</h4>
              <ul>
                <li><Link href="/contact">Contact Us</Link></li>
                <li><Link href="/shipping">Shipping Information</Link></li>
                <li><Link href="/returns">Returns & Exchanges</Link></li>
                <li><Link href="/size-guide">Size Guide</Link></li>
                <li><Link href="/faq">FAQ</Link></li>
                <li><Link href="/track-order">Track Order</Link></li>
              </ul>
            </div>

            {/* Contact Info */}
            <div className="footer-column">
              <h4>Contact Us</h4>
              <div className="footer-contact">
                <div className="contact-item">
                  <Mail size={18} />
                  <a href="mailto:laqabinfo@gmail.com">laqabinfo@gmail.com</a>
                </div>
                <div className="contact-item">
                  <Phone size={18} />
                  <a href="tel:+919876543210">+91 98765 43210</a>
                </div>
                <div className="contact-item">
                  <MapPin size={18} />
                  <span>Ahmedabad, Gujarat, India</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Payment & Trust */}
      <div className="footer-trust">
        <div className="container">
          <div className="trust-grid">
            <div className="trust-item">
              <span className="trust-icon">🚚</span>
              <div>
                <h5>Free Shipping</h5>
                <p>On orders above ₹5,000</p>
              </div>
            </div>
            <div className="trust-item">
              <span className="trust-icon">🔒</span>
              <div>
                <h5>Secure Payment</h5>
                <p>100% secure transactions</p>
              </div>
            </div>
            <div className="trust-item">
              <span className="trust-icon">↩️</span>
              <div>
                <h5>Easy Returns</h5>
                <p>7 days return policy</p>
              </div>
            </div>
            <div className="trust-item">
              <span className="trust-icon">✨</span>
              <div>
                <h5>Premium Quality</h5>
                <p>Handcrafted with care</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom">
        <div className="container">
          <div className="footer-bottom-content">
            <p>&copy; {new Date().getFullYear()} LAQAB. All rights reserved.</p>
            <div className="footer-legal">
              <Link href="/privacy">Privacy Policy</Link>
              <Link href="/terms">Terms of Service</Link>
              <Link href="/refund">Refund Policy</Link>
            </div>
            <div className="footer-payment">
              <span>Payment Methods:</span>
              <div className="payment-icons">
                <span>VISA</span>
                <span>UPI</span>
                <span>MasterCard</span>
                <span>Net Banking</span>
                <span>COD</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .footer {
          background: var(--color-black);
          color: var(--color-white);
        }

        /* Newsletter */
        .footer-newsletter {
          background: linear-gradient(135deg, var(--color-maroon) 0%, var(--color-black) 100%);
          padding: 60px 0;
        }

        .newsletter-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 40px;
          align-items: center;
        }

        .newsletter-content h3 {
          font-family: var(--font-heading);
          font-size: 1.75rem;
          margin-bottom: 12px;
          color: var(--color-gold);
        }

        .newsletter-content p {
          color: rgba(255, 255, 255, 0.8);
          margin: 0;
        }

        .newsletter-form {
          display: flex;
          gap: 12px;
        }

        .newsletter-form input {
          flex: 1;
          padding: 16px 20px;
          border: 1px solid rgba(255, 255, 255, 0.2);
          background: rgba(255, 255, 255, 0.1);
          color: var(--color-white);
          border-radius: 4px;
          font-size: 0.95rem;
        }

        .newsletter-form input::placeholder {
          color: rgba(255, 255, 255, 0.5);
        }

        .newsletter-form input:focus {
          outline: none;
          border-color: var(--color-gold);
        }

        /* Main Footer */
        .footer-main {
          padding: 80px 0 60px;
        }

        .footer-grid {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1fr;
          gap: 60px;
        }

        .footer-logo {
          font-family: var(--font-heading);
          font-size: 2rem;
          color: var(--color-gold);
          letter-spacing: 6px;
          margin-bottom: 20px;
        }

        .footer-tagline {
          color: rgba(255, 255, 255, 0.7);
          line-height: 1.8;
          margin-bottom: 24px;
        }

        .footer-social {
          display: flex;
          gap: 12px;
        }

        .footer-social a {
          width: 44px;
          height: 44px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 50%;
          color: var(--color-white);
          transition: all 0.3s ease;
        }

        .footer-social a:hover {
          background: var(--color-gold);
          border-color: var(--color-gold);
          color: var(--color-black);
        }

        .footer-column h4 {
          font-family: var(--font-heading);
          font-size: 1rem;
          color: var(--color-gold);
          margin-bottom: 24px;
          letter-spacing: 2px;
        }

        .footer-column ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .footer-column li {
          margin-bottom: 12px;
        }

        .footer-column a {
          color: rgba(255, 255, 255, 0.7);
          text-decoration: none;
          font-size: 0.9rem;
          transition: color 0.3s ease;
        }

        .footer-column a:hover {
          color: var(--color-gold);
        }

        .footer-contact {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .contact-item {
          display: flex;
          align-items: center;
          gap: 12px;
          color: rgba(255, 255, 255, 0.7);
          font-size: 0.9rem;
        }

        .contact-item a {
          color: rgba(255, 255, 255, 0.7);
          text-decoration: none;
        }

        .contact-item a:hover {
          color: var(--color-gold);
        }

        /* Trust Section */
        .footer-trust {
          padding: 40px 0;
          background: rgba(255, 255, 255, 0.05);
        }

        .trust-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 40px;
        }

        .trust-item {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .trust-icon {
          font-size: 2rem;
        }

        .trust-item h5 {
          font-size: 0.95rem;
          font-weight: 600;
          margin-bottom: 4px;
        }

        .trust-item p {
          font-size: 0.8rem;
          color: rgba(255, 255, 255, 0.6);
          margin: 0;
        }

        /* Bottom Bar */
        .footer-bottom {
          padding: 24px 0;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }

        .footer-bottom-content {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 20px;
        }

        .footer-bottom p {
          font-size: 0.85rem;
          color: rgba(255, 255, 255, 0.5);
          margin: 0;
        }

        .footer-legal {
          display: flex;
          gap: 24px;
        }

        .footer-legal a {
          font-size: 0.85rem;
          color: rgba(255, 255, 255, 0.5);
          text-decoration: none;
        }

        .footer-legal a:hover {
          color: var(--color-gold);
        }

        .footer-payment {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 0.8rem;
          color: rgba(255, 255, 255, 0.5);
        }

        .payment-icons {
          display: flex;
          gap: 8px;
        }

        .payment-icons span {
          padding: 4px 8px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 4px;
          font-size: 0.7rem;
        }

        /* Responsive */
        @media (max-width: 1024px) {
          .footer-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .newsletter-grid {
            grid-template-columns: 1fr;
            text-align: center;
          }

          .newsletter-form {
            flex-direction: column;
          }
        }

        @media (max-width: 768px) {
          .footer-grid {
            grid-template-columns: 1fr;
            gap: 40px;
          }

          .trust-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .footer-bottom-content {
            flex-direction: column;
            text-align: center;
          }

          .footer-legal {
            flex-wrap: wrap;
            justify-content: center;
          }
        }
      `}</style>
    </footer>
  );
}
