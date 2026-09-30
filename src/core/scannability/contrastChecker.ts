import { colord } from 'colord';
import { IScannabilityResult, ScannabilityLevel } from './types';

/**
 * Converts an sRGB color component to linear value for WCAG luminance
 */
function sRgbToLinear(c: number): number {
  const norm = c / 255;
  return norm <= 0.04045 ? norm / 12.92 : Math.pow((norm + 0.055) / 1.055, 2.4);
}

/**
 * Calculates relative luminance of a color according to WCAG 2.1
 */
export function getRelativeLuminance(colorHex: string): number {
  const { r, g, b } = colord(colorHex).toRgb();
  const rLin = sRgbToLinear(r);
  const gLin = sRgbToLinear(g);
  const bLin = sRgbToLinear(b);

  return 0.2126 * rLin + 0.7152 * gLin + 0.0722 * bLin;
}

/**
 * Calculates WCAG 2.1 contrast ratio between two colors (range: 1.0 to 21.0)
 */
export function calculateContrastRatio(color1: string, color2: string): number {
  const lum1 = getRelativeLuminance(color1);
  const lum2 = getRelativeLuminance(color2);

  const lighter = Math.max(lum1, lum2);
  const darker = Math.min(lum1, lum2);

  return (lighter + 0.05) / (darker + 0.05);
}

/**
 * Evaluates the scannability of a QR code based on contrast ratio
 * Standard QR optical scanners require significant contrast between foreground & background.
 */
export function evaluateScannability(ratio: number): IScannabilityResult {
  let level: ScannabilityLevel;
  let isScannable = true;
  let messageKey = 'scannability.optimal';

  if (ratio >= 5.0) {
    level = 'optimal';
    messageKey = 'scannability.optimal';
  } else if (ratio >= 3.0) {
    level = 'acceptable';
    messageKey = 'scannability.acceptable';
  } else if (ratio >= 2.0) {
    level = 'warning';
    isScannable = false;
    messageKey = 'scannability.warning';
  } else {
    level = 'critical';
    isScannable = false;
    messageKey = 'scannability.critical';
  }

  return {
    ratio,
    level,
    isScannable,
    messageKey,
  };
}
