'use client';

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/lib/store';
import { removeFromWishlist } from '@/lib/wishlistSlice';
import { addToCart } from '@/lib/cartSlice';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, ShoppingBag, X } from 'lucide-react';

export default function WishlistPage() {
  const dispatch = useDispatch();
  const { items } = useSelector((state: RootState) => state.wishlist);

  if (items.length === 0) {
    return (
      <div className="wishlist-empty-page">
        <div className="container">
          <div className="empty-state">
            <Heart size={80} />
            <h1>Your Wishlist is Empty</h1>
            <p>Save your favorite items for later!</p>
            <Link href="/products" className="btn btn-primary btn-lg">
              Browse Products
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="wishlist-page">
      <div className="container">
        <h1>My Wishlist ({items.length})</h1>

        <div className="wishlist-grid">
          {items.map((item) => (
            <div key={item.product.id} className="wishlist-item">
              <div className="item-image">
                <Link href={`/products/${item.product.slug}`}>
                  <Image
                    src={item.product.images[0]}
                    alt={item.product.name}
                    width={300}
                    height={400}
                    style={{ objectFit: 'cover' }}
                  />
                </Link>
                <button
                  className="remove-btn"
                  onClick={() => dispatch(removeFromWishlist(item.product.id))}
                >
                  <X size={20} />
                </button>
              </div>
              <div className="item-info">
                <span className="item-category">{item.product.category}</span>
                <h3>
                  <Link href={`/products/${item.product.slug}`}>{item.product.name}</Link>
                </h3>
                <div className="item-price">
                  <span className="price">₹{item.product.price.toLocaleString()}</span>
                  {item.product.originalPrice > item.product.price && (
                    <span className="original-price">₹{item.product.originalPrice.toLocaleString()}</span>
                  )}
                </div>
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    dispatch(addToCart({
                      product: item.product,
                      quantity: 1,
                      selectedSize: item.product.sizes[0],
                      selectedColor: item.product.colors[0].name,
                    }));
                    dispatch(removeFromWishlist(item.product.id));
                  }}
                >
                  <ShoppingBag size={18} />
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
