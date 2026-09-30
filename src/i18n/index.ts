import { en } from './en';
import { id } from './id';
import { Locale, TranslationKey } from './types';

export const translations: Record<Locale, Record<TranslationKey, string>> = {
  en,
  id,
};

export function t(key: TranslationKey, locale: Locale = 'id'): string {
  const dict = translations[locale] || translations.id;
  return dict[key] || translations.en[key] || key;
}

export * from './types';
