import { describe, it, expect } from 'vitest';
import { calculatePrintDimensions, PRESET_DIMENSIONS } from '../../src/core/dpi/printCalculator';

describe('DPI & Print Dimension Calculator', () => {
  it('accurately calculates physical dimensions for 1200px at 300 DPI', () => {
    const result = calculatePrintDimensions(1200, 300);
    expect(result.inches).toBe(4);
    expect(result.cm).toBeCloseTo(10.16, 2);
  });

  it('accurately calculates physical dimensions for 1024px at 72 DPI', () => {
    const result = calculatePrintDimensions(1024, 72);
    expect(result.inches).toBeCloseTo(14.22, 2);
    expect(result.cm).toBeCloseTo(36.12, 2);
  });

  it('provides correct default presets for web and print', () => {
    expect(PRESET_DIMENSIONS.webStandard.pixels).toBe(1024);
    expect(PRESET_DIMENSIONS.webStandard.dpi).toBe(72);
    expect(PRESET_DIMENSIONS.printBrochure.pixels).toBe(1200);
    expect(PRESET_DIMENSIONS.printBrochure.dpi).toBe(300);
    expect(PRESET_DIMENSIONS.printPoster.pixels).toBe(2400);
    expect(PRESET_DIMENSIONS.printPoster.dpi).toBe(300);
    expect(PRESET_DIMENSIONS.printBillboard.pixels).toBe(4096);
    expect(PRESET_DIMENSIONS.printBillboard.dpi).toBe(300);
  });
});
