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
          <span className="hero-subtitle">Ahmedabad Se, Pure Love Se ❤️</span>
          <h1 className="hero-title">
            Sherwanis Jo Dil <span className="text-gold">Chura Le</span>
          </h1>
          <p className="hero-description">
            Shadi ho ya engagement, reception ho ya casual event - LAQAB ke sherwanis mein aapka style baar bar dikhta hai. Gujarat mein tailor ki tarah, har outfit fit baithti hai. Agar aapko pasand nahi aaya toh 7 din mein paise wapas!
          </p>
          <div className="hero-actions">
            <Link href="/collections" className="btn btn-primary btn-lg">
              Collection Dekho
            </Link>
            <Link href="/products?collection=wedding-special" className="btn btn-outline btn-lg">
              Shaadi Wale Dekho
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
                <p>₹5000 se upar ke orders pe</p>
              </div>
            </div>
            <div className="trust-item">
              <Shield size={32} />
              <div>
                <h4>Secure Payment</h4>
                <p>100% safe transactions</p>
              </div>
            </div>
            <div className="trust-item">
              <RotateCcw size={32} />
              <div>
                <h4>Easy Returns</h4>
                <p>7 din mein paise wapas</p>
              </div>
            </div>
            <div className="trust-item">
              <Award size={32} />
              <div>
                <h4>Premium Quality</h4>
                <p>Handcrafted items</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Collections */}
      <section className="section collections-section">
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle">Hamare Collections</span>
            <h2 className="section-title">Jo Log Sabse Zyada Maangte Hain</h2>
            <p className="section-description">
              Sherwani ho ya Kurta, Wedding Special ho ya Festival Collection - har collection mein quality aur style dono milega
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
            <h2 className="section-title">Sabse Jyada Bikne Waale</h2>
            <p className="section-description">
              Jinhe dekh ke log bolte hain "yaar yeh kahan se laaya"
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
              Saare Products Dekho
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Shadi Season Mei Discount!</h2>
            <p>Wedding sherwanis pe 25% tak kiye. Bas limited time ke liye!</p>
            <Link href="/products?collection=wedding-special" className="btn btn-primary btn-lg">
              Shadi Collection Dekho
            </Link>
          </div>
        </div>
      </section>

      {/* Trending Products */}
      <section className="section trending-section">
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle">Trending Now</span>
            <h2 className="section-title">Is Week Jo Sabse Jyada Dekha Gaya</h2>
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
            <span className="section-subtitle">Customers Bol Rahe Hain</span>
            <h2 className="section-title">Real Reviews, Real People</h2>
          </div>
          <div className="testimonials-grid">
            <div className="testimonial-card">
              <div className="testimonial-rating">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} size={16} fill="currentColor" />
                ))}
              </div>
              <p className="testimonial-text">
                "Bhai, maine apni shadi ke liye LAQAB se sherwani li. Photos mein toh waah lag raha tha, but real mein bhi utna hi sundar tha. Zyada important hai ki poore function mein comfortable raha - koi irritation nahi, koi pain nahi. Bas ek baar tailor leke jaana padega length ke liye."
              </p>
              <div className="testimonial-author">
                <div className="author-avatar">IK</div>
                <div>
                  <h5>Imran Khan</h5>
                  <p>Surat, Gujarat</p>
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
                "Maine gift mein maang ke di thi LAQAB ki kurta. Jaise ready hui, waise hi bheja - packaging itni acchi thi ki gift waale ko toh gift dekh ke hi khush ho gaye. Quality dekh ke lagta hai ki asli mein mehnat di gayi hai."
              </p>
              <div className="testimonial-author">
                <div className="author-avatar">YS</div>
                <div>
                  <h5>Yusuf Shaikh</h5>
                  <p>Vadodara</p>
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
                "UK se order kiya for brothers wedding. Delivery smooth thi, 12 din mein aa gayi. Colour jo website pe dikhaya tha waise hi tha - kabhi kabhi photo se alag aata hai but yahan nahi. Will order again for sure."
              </p>
              <div className="testimonial-author">
                <div className="author-avatar">FA</div>
                <div>
                  <h5>Firoz Ansari</h5>
                  <p>Birmingham, UK</p>
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
            <h2>LAQAB Family Mein Shamil Ho Jao</h2>
            <p>Naye products, discount offers, aur style tips - sabse pehle aapko pata chalega!</p>
            <form className="newsletter-form">
              <input type="email" placeholder="Apna email daalo" />
              <button type="submit" className="btn btn-primary">Subscribe Karo</button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
