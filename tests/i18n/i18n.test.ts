import { describe, it, expect } from 'vitest';
import { en } from '../../src/i18n/en';
import { id } from '../../src/i18n/id';

describe('i18n Localization Integrity', () => {
  it('has identical keys for both English and Indonesian translations', () => {
    const enKeys = Object.keys(en).sort();
    const idKeys = Object.keys(id).sort();
    expect(enKeys).toEqual(idKeys);
  });

  it('contains essential branding and navigation translations', () => {
    expect(en['nav.generator']).toBe('Studio');
    expect(id['nav.generator']).toBe('Studio');
    expect(en['nav.templates']).toBe('Templates');
    expect(id['nav.templates']).toBe('Koleksi Desain');
    expect(en['scannability.optimal']).toBeDefined();
    expect(id['scannability.optimal']).toBeDefined();
  });
});
