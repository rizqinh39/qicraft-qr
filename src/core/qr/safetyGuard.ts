import { ErrorCorrectionLevel } from './types';

/**
 * Resolves the effective Reed-Solomon Error Correction Level.
 * When a logo/image is embedded inside the QR matrix, the optical capacity is obscured.
 * Therefore, error correction must be elevated to at least 'Q' (25%) or 'H' (30%)
 * to guarantee scannability.
 */
export function resolveErrorCorrectionLevel(
  requestedLevel: ErrorCorrectionLevel,
  hasLogo: boolean
): ErrorCorrectionLevel {
  if (!hasLogo) {
    return requestedLevel;
  }

  // If user selected L (7%) or M (15%) with a logo, elevate to Q (25%)
  if (requestedLevel === 'L' || requestedLevel === 'M') {
    return 'Q';
  }

  return requestedLevel;
}
