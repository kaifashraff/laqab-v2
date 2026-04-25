import { products } from '@/data/products';
import ProductDetailClient from './ProductDetailClient';

export async function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export default function ProductDetailPage() {
  return <ProductDetailClient />;
}