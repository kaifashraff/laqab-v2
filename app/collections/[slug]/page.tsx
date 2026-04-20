'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useDispatch } from 'react-redux';
import { addToCart } from '@/lib/cartSlice';
import { addToWishlist } from '@/lib/wishlistSlice';
import { getCollectionBySlug } from '@/data/collections';
import { getProductsByCollection } from '@/data/products';
import { Star, Heart, ShoppingBag } from 'lucide-react';

export default function CollectionDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const dispatch = useDispatch();

  const collection = getCollectionBySlug(slug);
  const products = collection ? getProductsByCollection(collection.name) : [];

  if (!collection) {
    return (
      <div className="container">
        <h1>Collection Not Found</h1>
        <Link href="/collections" className="btn btn-primary">Back to Collections</Link>
      </div>
    );
  }

  return (
    <div className="collection-detail-page">
      {/* Hero */}
      <div className="collection-hero" style={{ backgroundImage: `url(${collection.image})` }}>
        <div className="hero-overlay">
          <div className="container">
            <nav className="breadcrumb">
              <Link href="/">Home</Link>
              <span>/</span>
              <Link href="/collections">Collections</Link>
              <span>/</span>
              <span>{collection.name}</span>
            </nav>
            <h1>{collection.name}</h1>
            <p>{collection.description}</p>
            <span className="product-count">{collection.productCount} Products</span>
          </div>
        </div>
      </div>

      {/* Products */}
      <div className="container">
        <div className="products-grid">
          {products.map((product) => (
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
                    }}
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
      </div>
    </div>
  );
}
