'use client';

import Link from 'next/link';
import Image from 'next/image';
import { collections } from '@/data/collections';
import { ArrowRight } from 'lucide-react';

export default function CollectionsPage() {
  return (
    <div className="collections-page">
      <div className="container">
        {/* Hero */}
        <div className="page-hero">
          <h1>Our Collections</h1>
          <p>Explore our curated collections designed for every occasion</p>
        </div>

        {/* Collections Grid */}
        <div className="collections-grid">
          {collections.map((collection) => (
            <Link 
              key={collection.id} 
              href={`/collections/${collection.slug}`}
              className="collection-card"
            >
              <div className="collection-image">
                <Image
                  src={collection.image}
                  alt={collection.name}
                  width={600}
                  height={700}
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div className="collection-overlay">
                <span className="product-count">{collection.productCount} Products</span>
                <h3>{collection.name}</h3>
                <p>{collection.description}</p>
                <span className="shop-btn">
                  Shop Now <ArrowRight size={18} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
