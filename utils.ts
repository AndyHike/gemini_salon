import { Language } from './types';

/**
 * Helper to get the localized string from an object that contains keys like name_en, name_uk, etc.
 */
export const getLocalizedText = (item: any, lang: Language, prefix: string): string => {
  const key = `${prefix}_${lang}`;
  return item[key] || item[`${prefix}_en`] || '';
};

/**
 * Helper to format price.
 * Hardcoded to Czech Koruna (Kč) as the backend does not provide currency.
 */
export const formatPrice = (price: number) => {
  return new Intl.NumberFormat('cs-CZ', {
    style: 'currency',
    currency: 'CZK',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
};