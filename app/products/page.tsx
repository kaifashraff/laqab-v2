'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useDispatch } from 'react-redux';
import { addToCart } from '@/lib/cartSlice';
import { addToWishlist } from '@/lib/wishlistSlice';
import { openCart as openCartAction } from '@/lib/cartSlice';
import { products, getProductsByCollection, getProductsByCategory, getFeaturedProducts } from '@/data/products';
import { collections } from '@/data/collections';
import { Star, Heart, ShoppingBag, Filter, X, SlidersHorizontal } from 'lucide-react';

export default function ProductsPage() {
  const searchParams = useSearchParams();
  const dispatch = useDispatch();
  
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('featured');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedCollection, setSelectedCollection] = useState<string>('');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100000]);

  useEffect(() => {
    let result = [...products];

    // Filter by category from URL
    const category = searchParams.get('category');
    if (category) {
      result = result.filter(p => p.category.toLowerCase() === category.toLowerCase());
      setSelectedCategory(category);
    }

    // Filter by collection from URL
    const collection = searchParams.get('collection');
    if (collection) {
      result = result.filter(p => p.collection.toLowerCase() === collection.toLowerCase().replace('-', ' '));
      setSelectedCollection(collection);
    }

    // Filter by search
    const search = searchParams.get('search');
    if (search) {
      result = result.filter(p => 
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.description.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Apply price filter
    result = result.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

    // Sort
    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }

    setFilteredProducts(result);
  }, [searchParams, sortBy, priceRange]);

  const categories = [...new Set(products.map(p => p.category))];
  const allCollections = [...new Set(products.map(p => p.collection))];

  const clearFilters = () => {
    setSelectedCategory('');
    setSelectedCollection('');
    setPriceRange([0, 100000]);
    setSortBy('featured');
  };

  return (
    <div className="products-page">
      <div className="container">
        {/* Breadcrumb */}
        <nav className="breadcrumb">
          <Link href="/">Home</Link>
          <span>/</span>
          <span>Products</span>
        </nav>

        {/* Header */}
        <div className="page-header">
          <div>
            <h1>Our Collection</h1>
            <p>{filteredProducts.length} products</p>
          </div>
          <div className="header-actions">
            <button 
              className="filter-toggle"
              onClick={() => setShowFilters(!showFilters)}
            >
              <SlidersHorizontal size={20} />
              Filters
            </button>
            <select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
              className="sort-select"
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="newest">Newest</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>
        </div>

        <div className="products-layout">
          {/* Filters Sidebar */}
          <aside className={`filters-sidebar ${showFilters ? 'show' : ''}`}>
            <div className="filters-header">
              <h3>Filters</h3>
              <button onClick={() => setShowFilters(false)}>
                <X size={24} />
              </button>
            </div>

            {(selectedCategory || selectedCollection) && (
              <div className="active-filters">
                {selectedCategory && (
                  <span className="filter-tag">
                    {selectedCategory}
                    <button onClick={() => setSelectedCategory('')}>×</button>
                  </span>
                )}
                {selectedCollection && (
                  <span className="filter-tag">
                    {selectedCollection}
                    <button onClick={() => setSelectedCollection('')}>×</button>
                  </span>
                )}
                <button className="clear-all" onClick={clearFilters}>Clear All</button>
              </div>
            )}

            <div className="filter-section">
              <h4>Categories</h4>
              <div className="filter-options">
                {categories.map(cat => (
                  <label key={cat} className="filter-option">
                    <input
                      type="radio"
                      name="category"
                      checked={selectedCategory === cat.toLowerCase()}
                      onChange={() => setSelectedCategory(cat.toLowerCase())}
                    />
                    <span>{cat}</span>
                    <span className="count">({products.filter(p => p.category === cat).length})</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="filter-section">
              <h4>Collections</h4>
              <div className="filter-options">
                {allCollections.map(col => (
                  <label key={col} className="filter-option">
                    <input
                      type="radio"
                      name="collection"
                      checked={selectedCollection === col.toLowerCase()}
                      onChange={() => setSelectedCollection(col.toLowerCase())}
                    />
                    <span>{col}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="filter-section">
              <h4>Price Range</h4>
              <div className="price-inputs">
                <input
                  type="number"
                  placeholder="Min"
                  value={priceRange[0]}
                  onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                />
                <span>to</span>
                <input
                  type="number"
                  placeholder="Max"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                />
              </div>
            </div>

            <button className="btn btn-primary btn-full" onClick={() => setShowFilters(false)}>
              Apply Filters
            </button>
          </aside>

          {/* Products Grid */}
          <div className="products-content">
            {filteredProducts.length === 0 ? (
              <div className="empty-state">
                <h3>No products found</h3>
                <p>Try adjusting your filters or search terms.</p>
                <button className="btn btn-primary" onClick={clearFilters}>
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className="products-grid">
                {filteredProducts.map((product) => (
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
                        {/* Hand Embroidered Badge - Primary USP */}
                        <span className="badge" style={{background: '#D4AF37', color: '#1A1A1A', fontWeight: '600'}}>
                          ✨ Hand Embroidered
                        </span>
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
                            dispatch(openCartAction());
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
                        <span className="review-count">({product.reviews.length})</span>
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
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
