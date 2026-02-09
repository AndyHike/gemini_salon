import { createDirectus, rest } from '@directus/sdk';

// ВАЖЛИВО: Замініть це на ваш реальний URL Directus
export const DIRECTUS_URL = 'https://salonadmin.mobil-brevnov.cz';

export interface Service {
  id: number;
  name_en: string;
  name_uk: string;
  name_cs: string;
  description_en?: string;
  description_uk?: string;
  description_cs?: string;
  price: number;
  currency?: string;
  category: 'hair' | 'nails' | 'face' | 'spa';
}

export interface GalleryItem {
  id: number;
  image: string; // UUID файлу
  alt: string;
  category?: string;
}

interface Schema {
  services: Service[];
  gallery: GalleryItem[];
}

export const directus = createDirectus<Schema>(DIRECTUS_URL).with(rest());

export const getImageUrl = (id: string) => {
  return `${DIRECTUS_URL}/assets/${id}`;
};
