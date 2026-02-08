import { Language } from './types';

/**
 * Helper to get the localized string from an object that contains keys like name_en, name_uk, etc.
 */
export const getLocalizedText = (item: any, lang: Language, prefix: string): string => {
  const key = `${prefix}_${lang}`;
  return item[key] || item[`${prefix}_en`] || '';
};

/**
 * Helper to format price with currency
 */
export const formatPrice = (price: number, currency: string) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
  }).format(price);
};