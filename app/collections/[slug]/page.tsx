import { collections } from '@/data/collections';
import CollectionDetailClient from './CollectionDetailClient';

export async function generateStaticParams() {
  return collections.map((collection) => ({
    slug: collection.slug,
  }));
}

export default function CollectionDetailPage() {
  return <CollectionDetailClient />;
}