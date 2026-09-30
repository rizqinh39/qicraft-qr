import { describe, it, expect } from 'vitest';
import { calculateContrastRatio, evaluateScannability } from '../../src/core/scannability/contrastChecker';

describe('Scannability & Contrast Engine', () => {
  it('calculates optimal contrast for black on white', () => {
    const ratio = calculateContrastRatio('#000000', '#FFFFFF');
    expect(ratio).toBeCloseTo(21, 0);
    const status = evaluateScannability(ratio);
    expect(status.level).toBe('optimal');
    expect(status.isScannable).toBe(true);
  });

  it('calculates acceptable contrast for medium contrast combinations', () => {
    // E.g., dark blue #1E293B on white #FFFFFF
    const ratio = calculateContrastRatio('#1E293B', '#FFFFFF');
    expect(ratio).toBeGreaterThan(7);
    const status = evaluateScannability(ratio);
    expect(status.level).toBe('optimal');
  });

  it('identifies critical unscannable contrast for very close colors', () => {
    const ratio = calculateContrastRatio('#1E293B', '#0F172A');
    expect(ratio).toBeLessThan(2.0);
    const status = evaluateScannability(ratio);
    expect(status.level).toBe('critical');
    expect(status.isScannable).toBe(false);
  });

  it('handles reverse order of colors (lighter as foreground)', () => {
    const ratio1 = calculateContrastRatio('#FFFFFF', '#000000');
    const ratio2 = calculateContrastRatio('#000000', '#FFFFFF');
    expect(ratio1).toBe(ratio2);
  });
});
