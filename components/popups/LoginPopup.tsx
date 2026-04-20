'use client';

import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/lib/store';
import { closePopup } from '@/lib/uiSlice';
import { setUser } from '@/lib/userSlice';
import { X, Mail, Lock, Phone, Eye, EyeOff } from 'lucide-react';

export default function LoginPopup() {
  const dispatch = useDispatch();
  const { popups } = useSelector((state: RootState) => state.ui);
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
  });

  const loginPopup = popups.find(p => p.id === 'login');

  if (!loginPopup?.isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate login/signup
    dispatch(setUser({
      id: 'user-001',
      name: formData.name || 'Guest User',
      email: formData.email || 'guest@laqab.com',
      phone: formData.phone || '+91 98765 43210',
      addresses: [],
      orders: [],
    }));
    dispatch(closePopup('login'));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className="popup-overlay" onClick={() => dispatch(closePopup('login'))} />
      <div className="login-popup">
        <button className="popup-close" onClick={() => dispatch(closePopup('login'))}>
          <X size={24} />
        </button>
        
        <div className="login-header">
          <h3>{isLogin ? 'Welcome Back' : 'Create Account'}</h3>
          <p>{isLogin ? 'Login to access your account' : 'Join the LAQAB family'}</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          {!isLogin && (
            <div className="form-group">
              <label>Full Name</label>
              <div className="input-wrapper">
                <input
                  type="text"
                  name="name"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required={!isLogin}
                />
              </div>
            </div>
          )}

          <div className="form-group">
            <label>Email</label>
            <div className="input-wrapper">
              <Mail size={18} />
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          {!isLogin && (
            <div className="form-group">
              <label>Phone Number</label>
              <div className="input-wrapper">
                <Phone size={18} />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Enter your phone number"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required={!isLogin}
                />
              </div>
            </div>
          )}

          <div className="form-group">
            <label>Password</label>
            <div className="input-wrapper">
              <Lock size={18} />
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
              <button type="button" className="password-toggle" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {isLogin && (
            <div className="forgot-password">
              <a href="/forgot-password">Forgot Password?</a>
            </div>
          )}

          <button type="submit" className="btn btn-primary btn-full">
            {isLogin ? 'Login' : 'Create Account'}
          </button>
        </form>

        <div className="login-divider">
          <span>or</span>
        </div>

        <div className="social-login">
          <button className="social-btn">
            <svg viewBox="0 0 24 24" width="20" height="20">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continue with Google
          </button>
        </div>

        <div className="login-footer">
          <p>
            {isLogin ? "Don't have an account?" : 'Already have an account?'}
            <button onClick={() => setIsLogin(!isLogin)}>
              {isLogin ? 'Sign Up' : 'Login'}
            </button>
          </p>
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

        .login-popup {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 90%;
          max-width: 440px;
          background: var(--color-white);
          border-radius: 16px;
          z-index: 3000;
          padding: 40px;
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
          background: var(--color-gray-100);
          border-radius: 50%;
          cursor: pointer;
        }

        .login-header {
          text-align: center;
          margin-bottom: 32px;
        }

        .login-header h3 {
          font-family: var(--font-heading);
          font-size: 1.75rem;
          margin-bottom: 8px;
        }

        .login-header p {
          color: var(--color-gray-600);
          margin: 0;
        }

        .login-form {
          margin-bottom: 24px;
        }

        .form-group {
          margin-bottom: 20px;
        }

        .form-group label {
          display: block;
          font-size: 0.875rem;
          font-weight: 500;
          margin-bottom: 8px;
          color: var(--color-gray-700);
        }

        .input-wrapper {
          position: relative;
          display: flex;
          align-items: center;
        }

        .input-wrapper svg {
          position: absolute;
          left: 16px;
          color: var(--color-gray-400);
        }

        .input-wrapper input {
          width: 100%;
          padding: 14px 16px 14px 48px;
          border: 1px solid var(--color-gray-300);
          border-radius: 8px;
          font-size: 1rem;
          transition: border-color 0.3s ease;
        }

        .input-wrapper input:focus {
          outline: none;
          border-color: var(--color-gold);
        }

        .password-toggle {
          position: absolute;
          right: 16px;
          color: var(--color-gray-400);
          cursor: pointer;
        }

        .forgot-password {
          text-align: right;
          margin-bottom: 20px;
        }

        .forgot-password a {
          font-size: 0.875rem;
          color: var(--color-gold);
        }

        .login-divider {
          text-align: center;
          margin: 24px 0;
          position: relative;
        }

        .login-divider::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 0;
          right: 0;
          height: 1px;
          background: var(--color-gray-200);
        }

        .login-divider span {
          position: relative;
          background: var(--color-white);
          padding: 0 16px;
          color: var(--color-gray-500);
          font-size: 0.875rem;
        }

        .social-login {
          margin-bottom: 24px;
        }

        .social-btn {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          padding: 14px;
          border: 1px solid var(--color-gray-300);
          border-radius: 8px;
          font-size: 0.95rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
          background: var(--color-white);
        }

        .social-btn:hover {
          background: var(--color-gray-50);
          border-color: var(--color-gray-400);
        }

        .login-footer {
          text-align: center;
        }

        .login-footer p {
          font-size: 0.9rem;
          color: var(--color-gray-600);
          margin: 0;
        }

        .login-footer button {
          color: var(--color-gold);
          font-weight: 600;
          margin-left: 4px;
          background: none;
          border: none;
          cursor: pointer;
        }
      `}</style>
    </>
  );
}
