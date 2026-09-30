import { describe, it, expect } from 'vitest';
import { resolveErrorCorrectionLevel } from '../../src/core/qr/safetyGuard';

describe('QR Safety Guard', () => {
  it('retains user error correction when no logo is attached', () => {
    expect(resolveErrorCorrectionLevel('L', false)).toBe('L');
    expect(resolveErrorCorrectionLevel('M', false)).toBe('M');
    expect(resolveErrorCorrectionLevel('Q', false)).toBe('Q');
    expect(resolveErrorCorrectionLevel('H', false)).toBe('H');
  });

  it('elevates error correction to at least Q when a logo is attached', () => {
    expect(resolveErrorCorrectionLevel('L', true)).toBe('Q');
    expect(resolveErrorCorrectionLevel('M', true)).toBe('Q');
    expect(resolveErrorCorrectionLevel('Q', true)).toBe('Q');
    expect(resolveErrorCorrectionLevel('H', true)).toBe('H');
  });
});
