import { describe, it, expect } from 'vitest';
import { UrlEncoder } from '../../src/core/encoders/urlEncoder';
import { WifiEncoder } from '../../src/core/encoders/wifiEncoder';
import { VCardEncoder } from '../../src/core/encoders/vcardEncoder';
import { SmsEncoder } from '../../src/core/encoders/smsEncoder';

describe('Payload Encoders', () => {
  it('encodes URL with UTM parameters properly', () => {
    const encoder = new UrlEncoder();
    const result = encoder.encode({
      baseUrl: 'https://example.com',
      utmSource: 'newsletter',
      utmMedium: 'email',
      utmCampaign: 'launch2026',
    });
    expect(result).toBe('https://example.com/?utm_source=newsletter&utm_medium=email&utm_campaign=launch2026');
  });

  it('encodes plain URL without UTM parameters when empty', () => {
    const encoder = new UrlEncoder();
    const result = encoder.encode({
      baseUrl: 'https://example.com',
    });
    expect(result).toBe('https://example.com/');
  });

  it('encodes Wi-Fi format according to standard', () => {
    const encoder = new WifiEncoder();
    const result = encoder.encode({
      ssid: 'QiCraft-WiFi',
      password: 'secretPassword123',
      encryption: 'WPA',
      hidden: false,
    });
    expect(result).toBe('WIFI:T:WPA;S:QiCraft-WiFi;P:secretPassword123;H:false;;');
  });

  it('encodes open Wi-Fi without password', () => {
    const encoder = new WifiEncoder();
    const result = encoder.encode({
      ssid: 'QiCraft-Open',
      encryption: 'nopass',
      hidden: false,
    });
    expect(result).toBe('WIFI:T:nopass;S:QiCraft-Open;H:false;;');
  });

  it('encodes vCard 4.0 standard format', () => {
    const encoder = new VCardEncoder();
    const result = encoder.encode({
      firstName: 'Rizqi',
      lastName: 'Nur',
      organization: 'Tech Labs',
      jobTitle: 'Architect',
      phone: '+62812345678',
      email: 'rizqi@example.com',
      website: 'https://qicraft.io',
      address: 'Jakarta, Indonesia',
    });
    expect(result).toContain('BEGIN:VCARD');
    expect(result).toContain('VERSION:4.0');
    expect(result).toContain('FN:Rizqi Nur');
    expect(result).toContain('N:Nur;Rizqi;;;');
    expect(result).toContain('ORG:Tech Labs');
    expect(result).toContain('TITLE:Architect');
    expect(result).toContain('TEL:+62812345678');
    expect(result).toContain('EMAIL:rizqi@example.com');
    expect(result).toContain('URL:https://qicraft.io');
    expect(result).toContain('ADR:;;Jakarta, Indonesia;;;;');
    expect(result).toContain('END:VCARD');
  });

  it('encodes SMS format according to standard', () => {
    const encoder = new SmsEncoder();
    const result = encoder.encode({
      phone: '+62812345678',
      message: 'Hello from QiCraft',
    });
    expect(result).toBe('SMSTO:+62812345678:Hello from QiCraft');
  });
});
