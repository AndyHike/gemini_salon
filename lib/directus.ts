import { createDirectus, rest } from '@directus/sdk';

export const DIRECTUS_URL = '/api';

export interface Service {
  id: number;
  name_en: string;
  name_uk: string;
  name_cs: string;
  description_en?: string;
  description_uk?: string;
  description_cs?: string;
  price: number;
  currency: string;
  category: 'hair' | 'nails' | 'face' | 'spa';
}

export interface GalleryItem {
  id: number;
  image: string; // UUID of the file in Directus
  alt: string;
  category?: string;
}

interface Schema {
  services: Service[];
  gallery: GalleryItem[];
}

// Initialize the client
export const directus = createDirectus<Schema>(DIRECTUS_URL).with(rest());

/**
 * Helper to construct the full image URL from a Directus file ID
 */
export const getImageUrl = (id: string) => {
  return `${DIRECTUS_URL}/assets/${id}`;
};
