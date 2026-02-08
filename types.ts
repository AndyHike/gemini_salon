export type Language = 'en' | 'uk' | 'cs';

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
  url: string;
  alt: string;
  category?: string;
}

export interface NavItem {
  key: string;
  label_en: string;
  label_uk: string;
  label_cs: string;
  href: string;
}