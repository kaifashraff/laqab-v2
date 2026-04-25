'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useDispatch } from 'react-redux';
import { addToCart } from '@/lib/cartSlice';
import { addToWishlist } from '@/lib/wishlistSlice';
import { getProductBySlug, getRelatedProducts } from '@/data/products';
import { Star, Heart, ShoppingBag, Truck, Shield, RotateCcw, Check, Minus, Plus, Ruler } from 'lucide-react';

export default function ProductDetailClient() {
  const params = useParams();
  const slug = params.slug as string;
  const dispatch = useDispatch();
  
  const product = getProductBySlug(slug);
  const relatedProducts = product ? getRelatedProducts(product.id, 4) : [];

  const [selectedSize, setSelectedSize] = useState(product?.sizes[0] || '');
  const [selectedColor, setSelectedColor] = useState(product?.colors[0].name || '');
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [activeTab, setActiveTab] = useState('description');

  if (!product) {
    return (
      <div className="product-not-found">
        <div className="container">
          <h1>Product Not Found</h1>
          <p>The product you're looking for doesn't exist.</p>
          <Link href="/products" className="btn btn-primary">Browse Products</Link>
        </div>
      </div>
    );
  }

  const discount = Math.round((1 - product.price / product.originalPrice) * 100);

  return (
    <div className="product-detail-page">
      <div className="container">
        {/* Breadcrumb */}
        <nav className="breadcrumb">
          <Link href="/">Home</Link>
          <span>/</span>
          <Link href="/products">Products</Link>
          <span>/</span>
          <Link href={`/products?category=${product.category.toLowerCase()}`}>{product.category}</Link>
          <span>/</span>
          <span>{product.name}</span>
        </nav>

        <div className="product-detail-grid">
          {/* Product Images */}
          <div className="product-images">
            <div className="main-image">
              <Image
                src={product.images[activeImage]}
                alt={`Hand Embroidered ${product.name} by LAQAB - ${product.work}`}
                width={600}
                height={750}
                priority
                style={{ objectFit: 'cover' }}
              />
              {product.originalPrice > product.price && (
                <span className="image-badge">{discount}% OFF</span>
              )}
            </div>
            <div className="thumbnail-images">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  className={`thumbnail ${activeImage === index ? 'active' : ''}`}
                  onClick={() => setActiveImage(index)}
                >
                  <Image
                    src={image}
                    alt={`Hand Embroidered ${product.name} - View ${index + 1}`}
                    width={100}
                    height={125}
                    style={{ objectFit: 'cover' }}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="product-info">
            {/* Hand Embroidered Badge */}
            <div className="mb-3 inline-flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-[#D4AF37]/20 to-[#D4AF37]/10 border border-[#D4AF37]/40 rounded-full">
              <span className="text-[#D4AF37] text-sm">✨</span>
              <span className="text-[#D4AF37] text-sm font-semibold tracking-wide">Hand Embroidered by Karigars</span>
            </div>
            
            <span className="product-category">{product.category}</span>
            <h1 className="product-title">{product.name}</h1>
            
            <div className="product-rating">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star 
                  key={star} 
                  size={18} 
                  fill={star <= Math.floor(product.rating) ? 'currentColor' : 'none'}
                />
              ))}
              <span className="rating-value">{product.rating}</span>
              <span className="review-count">({product.reviews.length} reviews)</span>
            </div>

            <div className="product-price">
              <span className="price-large">₹{product.price.toLocaleString()}</span>
              {product.originalPrice > product.price && (
                <>
                  <span className="original-price">₹{product.originalPrice.toLocaleString()}</span>
                  <span className="discount">{discount}% off</span>
                </>
              )}
            </div>

            {/* Delivery Timeline Notice */}
            <div className="mb-4 px-4 py-3 bg-[#FFF8E7] border border-[#D4AF37]/30 rounded-lg">
              <p className="text-sm text-[#800020] font-medium">
                <span className="text-[#D4AF37] mr-1">📦</span>
                Custom orders: <strong>15-25 days delivery</strong> | Hand crafted with care by skilled karigars
              </p>
            </div>

            {/* Custom Order CTA */}
            <div className="mb-6">
              <Link 
                href="/contact" 
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#800020] text-[#FFF8E7] rounded-lg font-medium hover:bg-[#6B001A] transition-colors text-sm"
              >
                <span>🎨</span>
                Want Custom Design? Contact Us — We can create your dream outfit
              </Link>
            </div>

            <p className="product-description">{product.description}</p>

            <div className="product-meta">
              <div className="meta-item">
                <span className="meta-label">Fabric:</span>
                <span className="meta-value">{product.fabric}</span>
              </div>
              <div className="meta-item">
                <span className="meta-label">Work:</span>
                <span className="meta-value">{product.work}</span>
              </div>
              <div className="meta-item">
                <span className="meta-label">Occasion:</span>
                <span className="meta-value">{product.occasion}</span>
              </div>
            </div>

            {/* Size Selection */}
            <div className="option-section">
              <div className="option-header">
                <label>Size</label>
                <button className="size-guide-btn">
                  <Ruler size={16} />
                  Size Guide
                </button>
              </div>
              <div className="size-options">
                {product.sizes.map((size) => (
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

            {/* Color Selection */}
            <div className="option-section">
              <label>Color</label>
              <div className="color-options">
                {product.colors.map((color) => (
                  <button
                    key={color.name}
                    className={`color-btn ${selectedColor === color.name ? 'selected' : ''}`}
                    onClick={() => setSelectedColor(color.name)}
                    style={{ backgroundColor: color.hex }}
                    title={color.name}
                  >
                    {selectedColor === color.name && <Check size={16} />}
                  </button>
                ))}
                <span className="color-name">{selectedColor}</span>
              </div>
            </div>

            {/* Quantity */}
            <div className="option-section">
              <label>Quantity</label>
              <div className="quantity-selector">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>
                  <Minus size={18} />
                </button>
                <span>{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)}>
                  <Plus size={18} />
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="product-actions">
              <button 
                className="btn btn-primary btn-lg"
                onClick={() => {
                  dispatch(addToCart({
                    product,
                    quantity,
                    selectedSize,
                    selectedColor,
                  }));
                }}
              >
                <ShoppingBag size={20} />
                Add to Cart
              </button>
              <button 
                className="btn btn-outline"
                onClick={() => dispatch(addToWishlist(product))}
              >
                <Heart size={20} />
              </button>
            </div>

            {/* Trust Badges */}
            <div className="trust-badges">
              <div className="trust-badge">
                <Truck size={24} />
                <span>Free Shipping</span>
              </div>
              <div className="trust-badge">
                <Shield size={24} />
                <span>Secure Payment</span>
              </div>
              <div className="trust-badge">
                <RotateCcw size={24} />
                <span>Easy Returns</span>
              </div>
            </div>
          </div>
        </div>

        {/* Product Tabs */}
        <div className="product-tabs">
          <div className="tabs-header">
            <button 
              className={activeTab === 'description' ? 'active' : ''}
              onClick={() => setActiveTab('description')}
            >
              Description
            </button>
            <button 
              className={activeTab === 'reviews' ? 'active' : ''}
              onClick={() => setActiveTab('reviews')}
            >
              Reviews ({product.reviews.length})
            </button>
            <button 
              className={activeTab === 'shipping' ? 'active' : ''}
              onClick={() => setActiveTab('shipping')}
            >
              Shipping
            </button>
          </div>
          
          <div className="tabs-content">
            {activeTab === 'description' && (
              <div className="tab-panel">
                <p>{product.description}</p>
                <ul>
                  <li><strong>Fabric:</strong> {product.fabric}</li>
                  <li><strong>Work:</strong> {product.work}</li>
                  <li><strong>Occasion:</strong> {product.occasion}</li>
                  <li><strong>Category:</strong> {product.category}</li>
                  <li><strong>Collection:</strong> {product.collection}</li>
                </ul>
              </div>
            )}
            {activeTab === 'reviews' && (
              <div className="tab-panel">
                {product.reviews.length > 0 ? (
                  product.reviews.map((review) => (
                    <div key={review.id} className="review-item">
                      <div className="review-header">
                        <div className="review-author">{review.userName}</div>
                        <div className="review-rating">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star key={star} size={14} fill={star <= review.rating ? 'currentColor' : 'none'} />
                          ))}
                        </div>
                      </div>
                      <h4>{review.title}</h4>
                      <p>{review.comment}</p>
                      {review.verified && (
                        <span className="verified-badge">Verified Purchase</span>
                      )}
                    </div>
                  ))
                ) : (
                  <p>No reviews yet.</p>
                )}
              </div>
            )}
            {activeTab === 'shipping' && (
              <div className="tab-panel">
                <h4>Shipping Information</h4>
                <ul>
                  <li><strong>Custom Orders:</strong> 15-25 days delivery (each piece is hand embroidered by karigars)</li>
                  <li>Free shipping on orders above ₹5,000</li>
                  <li>Standard delivery: 5-7 business days (for ready-made items)</li>
                  <li>Express delivery: 2-3 business days (extra charges apply)</li>
                  <li>International shipping available</li>
                </ul>
                <h4>Return Policy</h4>
                <ul>
                  <li>7 days return/exchange policy</li>
                  <li>Items must be unused and in original condition</li>
                  <li>Customized orders are non-returnable (each piece made to your specifications)</li>
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="related-products">
            <h2>You May Also Like</h2>
            <div className="products-grid">
              {relatedProducts.map((relatedProduct) => (
                <div key={relatedProduct.id} className="product-card">
                  <Link href={`/products/${relatedProduct.slug}`}>
                    <Image
                      src={relatedProduct.images[0]}
                      alt={`Hand Embroidered ${relatedProduct.name} by LAQAB`}
                      width={300}
                      height={400}
                      style={{ objectFit: 'cover' }}
                    />
                  </Link>
                  <div className="product-info">
                    <h3>
                      <Link href={`/products/${relatedProduct.slug}`}>{relatedProduct.name}</Link>
                    </h3>
                    <p className="price">₹{relatedProduct.price.toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}