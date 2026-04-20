'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useDispatch } from 'react-redux';
import { addToCart } from '@/lib/cartSlice';
import { addToWishlist } from '@/lib/wishlistSlice';
import { openCart as openCartAction } from '@/lib/cartSlice';
import { products, getFeaturedProducts, getTrendingProducts } from '@/data/products';
import { collections, getFeaturedCollections } from '@/data/collections';
import { Star, Heart, ShoppingBag, ArrowRight, Truck, Shield, RotateCcw, Award } from 'lucide-react';

export default function HomePage() {
  const dispatch = useDispatch();
  const featuredProducts = getFeaturedProducts();
  const trendingProducts = getTrendingProducts();
  const featuredCollections = getFeaturedCollections();

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <span className="hero-subtitle">Premium Ethnic Menswear</span>
          <h1 className="hero-title">
            Where <span className="text-gold">Tradition</span> Meets <span className="text-gold">Elegance</span>
          </h1>
          <p className="hero-description">
            Discover exquisite sherwanis, kurtas, and wedding wear crafted with the finest Indian artistry. Made for the modern gentleman who honors heritage.
          </p>
          <div className="hero-actions">
            <Link href="/collections" className="btn btn-primary btn-lg">
              Explore Collections
            </Link>
            <Link href="/products?collection=wedding-special" className="btn btn-outline btn-lg">
              Wedding Special
            </Link>
          </div>
        </div>
        <div className="hero-image">
          <Image
            src="https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80"
            alt="Ethnic Menswear"
            width={600}
            height={700}
            priority
            style={{ objectFit: 'cover' }}
          />
        </div>
      </section>

      {/* Trust Badges */}
      <section className="trust-section">
        <div className="container">
          <div className="trust-grid">
            <div className="trust-item">
              <Truck size={32} />
              <div>
                <h4>Free Shipping</h4>
                <p>On orders above ₹5,000</p>
              </div>
            </div>
            <div className="trust-item">
              <Shield size={32} />
              <div>
                <h4>Secure Payment</h4>
                <p>100% secure transactions</p>
              </div>
            </div>
            <div className="trust-item">
              <RotateCcw size={32} />
              <div>
                <h4>Easy Returns</h4>
                <p>7 days return policy</p>
              </div>
            </div>
            <div className="trust-item">
              <Award size={32} />
              <div>
                <h4>Premium Quality</h4>
                <p>Handcrafted with care</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Collections */}
      <section className="section collections-section">
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle">Our Collections</span>
            <h2 className="section-title">Timeless Elegance</h2>
            <p className="section-description">
              Explore our curated collections designed for every occasion
            </p>
          </div>
          <div className="collections-grid">
            {featuredCollections.map((collection) => (
              <Link 
                key={collection.id} 
                href={`/collections/${collection.slug}`}
                className="collection-card"
              >
                <div className="collection-image">
                  <Image
                    src={collection.image}
                    alt={collection.name}
                    width={400}
                    height={500}
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <div className="collection-overlay">
                  <h3>{collection.name}</h3>
                  <span>{collection.productCount} Products</span>
                  <ArrowRight size={20} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="section products-section">
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle">Featured</span>
            <h2 className="section-title">Bestsellers</h2>
            <p className="section-description">
              Our most loved pieces, chosen by customers like you
            </p>
          </div>
          <div className="products-grid">
            {featuredProducts.slice(0, 4).map((product) => (
              <div key={product.id} className="product-card">
                <div className="product-image">
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    width={300}
                    height={400}
                    style={{ objectFit: 'cover' }}
                  />
                  <div className="product-badges">
                    {product.trending && <span className="badge badge-trending">Trending</span>}
                    {product.originalPrice > product.price && (
                      <span className="badge badge-sale">
                        {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
                      </span>
                    )}
                  </div>
                  <div className="product-actions">
                    <button
                      className="action-btn"
                      onClick={() => {
                        dispatch(addToWishlist(product));
                      }}
                      title="Add to Wishlist"
                    >
                      <Heart size={20} />
                    </button>
                    <button
                      className="action-btn"
                      onClick={() => {
                        dispatch(addToCart({
                          product,
                          quantity: 1,
                          selectedSize: product.sizes[0],
                          selectedColor: product.colors[0].name,
                        }));
                        dispatch(openCartAction());
                      }}
                      title="Add to Cart"
                    >
                      <ShoppingBag size={20} />
                    </button>
                  </div>
                </div>
                <div className="product-info">
                  <span className="product-category">{product.category}</span>
                  <h3 className="product-name">
                    <Link href={`/products/${product.slug}`}>{product.name}</Link>
                  </h3>
                  <div className="product-rating">
                    <Star size={14} fill="currentColor" />
                    <span>{product.rating}</span>
                    <span className="review-count">({product.reviews.length} reviews)</span>
                  </div>
                  <div className="product-price">
                    <span className="price">₹{product.price.toLocaleString()}</span>
                    {product.originalPrice > product.price && (
                      <span className="original-price">₹{product.originalPrice.toLocaleString()}</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="section-footer">
            <Link href="/products" className="btn btn-outline">
              View All Products
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Wedding Season Special</h2>
            <p>Get up to 25% off on wedding sherwanis. Limited time offer!</p>
            <Link href="/products?collection=wedding-special" className="btn btn-primary btn-lg">
              Shop Wedding Collection
            </Link>
          </div>
        </div>
      </section>

      {/* Trending Products */}
      <section className="section trending-section">
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle">Trending Now</span>
            <h2 className="section-title">Hot This Season</h2>
          </div>
          <div className="products-grid">
            {trendingProducts.slice(0, 4).map((product) => (
              <div key={product.id} className="product-card">
                <div className="product-image">
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    width={300}
                    height={400}
                    style={{ objectFit: 'cover' }}
                  />
                  <div className="product-actions">
                    <button
                      className="action-btn"
                      onClick={() => dispatch(addToWishlist(product))}
                    >
                      <Heart size={20} />
                    </button>
                    <button
                      className="action-btn"
                      onClick={() => {
                        dispatch(addToCart({
                          product,
                          quantity: 1,
                          selectedSize: product.sizes[0],
                          selectedColor: product.colors[0].name,
                        }));
                        dispatch(openCartAction());
                      }}
                    >
                      <ShoppingBag size={20} />
                    </button>
                  </div>
                </div>
                <div className="product-info">
                  <h3 className="product-name">
                    <Link href={`/products/${product.slug}`}>{product.name}</Link>
                  </h3>
                  <div className="product-price">
                    <span className="price">₹{product.price.toLocaleString()}</span>
                    {product.originalPrice > product.price && (
                      <span className="original-price">₹{product.originalPrice.toLocaleString()}</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section testimonials-section">
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle">What They Say</span>
            <h2 className="section-title">Customer Love</h2>
          </div>
          <div className="testimonials-grid">
            <div className="testimonial-card">
              <div className="testimonial-rating">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} size={16} fill="currentColor" />
                ))}
              </div>
              <p className="testimonial-text">
                "Got my wedding sherwani from Laqab and received countless compliments. The quality of embroidery was exceptional!"
              </p>
              <div className="testimonial-author">
                <div className="author-avatar">RK</div>
                <div>
                  <h5>Rahul Kapoor</h5>
                  <p>Mumbai</p>
                </div>
              </div>
            </div>
            <div className="testimonial-card">
              <div className="testimonial-rating">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} size={16} fill="currentColor" />
                ))}
              </div>
              <p className="testimonial-text">
                "The attention to detail is remarkable. Every piece tells a story of rich craftsmanship. Highly recommended!"
              </p>
              <div className="testimonial-author">
                <div className="author-avatar">AS</div>
                <div>
                  <h5>Arjun Sharma</h5>
                  <p>Delhi</p>
                </div>
              </div>
            </div>
            <div className="testimonial-card">
              <div className="testimonial-rating">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} size={16} fill="currentColor" />
                ))}
              </div>
              <p className="testimonial-text">
                "Ordered from overseas and the delivery was seamless. The packaging was luxurious and the sherwani exceeded expectations."
              </p>
              <div className="testimonial-author">
                <div className="author-avatar">PM</div>
                <div>
                  <h5>Priyaan Mehta</h5>
                  <p>London, UK</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="newsletter-section">
        <div className="container">
          <div className="newsletter-content">
            <h2>Join the LAQAB Family</h2>
            <p>Subscribe to receive exclusive offers, new collection updates, and style inspiration.</p>
            <form className="newsletter-form">
              <input type="email" placeholder="Enter your email address" />
              <button type="submit" className="btn btn-primary">Subscribe</button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
