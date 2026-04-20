import { Collection } from '@/lib/types';

export const collections: Collection[] = [
  {
    id: 'coll-001',
    name: 'Wedding Special',
    slug: 'wedding-special',
    description:
      'Exquisite wedding sherwanis crafted for the special day. From grand receptions to intimate ceremonies, find your perfect wedding ensemble.',
    image:
      'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80',
    productCount: 12,
    featured: true,
  },
  {
    id: 'coll-002',
    name: 'Sherwani',
    slug: 'sherwani',
    description:
      'Timeless sherwanis for every occasion. Browse our collection of embroidered, velvet, and silk sherwanis designed for the modern gentleman.',
    image:
      'https://images.unsplash.com/photo-1598808503746-f34c53b9323e?w=800&q=80',
    productCount: 10,
    featured: true,
  },
  {
    id: 'coll-003',
    name: 'Festival Collection',
    slug: 'festival-collection',
    description:
      'Celebrate festivals in style with our festive kurtas and ethnic wear. Perfect for Diwali, Holi, Navratri, and all your favorite celebrations.',
    image:
      'https://images.unsplash.com/photo-1612178537253-bccd437b730e?w=800&q=80',
    productCount: 10,
    featured: true,
  },
  {
    id: 'coll-004',
    name: 'Kurta',
    slug: 'kurta',
    description:
      'Comfortable and stylish kurtas for every occasion. From everyday cotton to luxurious silk, find your perfect kurta.',
    image:
      'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&q=80',
    productCount: 12,
    featured: false,
  },
];

export const getCollectionBySlug = (slug: string): Collection | undefined => {
  return collections.find((c) => c.slug === slug);
};

export const getFeaturedCollections = (): Collection[] => {
  return collections.filter((c) => c.featured);
};
