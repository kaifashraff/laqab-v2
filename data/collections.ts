import { Collection } from '@/lib/types';

export const collections: Collection[] = [
  {
    id: 'coll-001',
    name: 'Wedding Special',
    slug: 'wedding-special',
    description:
      'Shadi ka season ho ya shaadi ki tayaari - LAQAB ke wedding sherwanis apke liye ready hain. Groom ho ya guest, har kisi ke liye kuch na kuch hai. Heavy zari se light embroidery tak, budget 20-50 hazar tak - har wallet ke liye sherwani hai.',
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
      'Sherwani - yeh woh kapda hai jo jab pehni toh sab bolte hain "yaar kya sher hai". Reception ke liye ho ya engagement, velvet ho ya silk, LAQAB ke sherwanis mein quality itni hai ki photos mein bhi dikhta hai.',
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
      'Diwali, Holi, Navratri, Karwa Chauth - har festival ke liye alag kurta chahiye. LAQAB ke festival collection mein aapko milegi basic cotton se lekar silk tak. Ghar waalon ki tach chand lagegi, pocket bhi nahi.',
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
      'Kurta - sabse comfortable kapda jo Indian man pehen sakta hai. Office mein ho ya gharpe, party mein ho ya pooja房里, kurta har jagah chalega. Basic white se lekar designer tak - LAQAB ke kurte har style ke liye ready hain.',
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
