import { IDpiPreset, IPrintDimension, DpiPresetKey } from './types';

/**
 * Standard preset dimension configurations for layman and professional usage
 */
export const PRESET_DIMENSIONS: Record<DpiPresetKey, IDpiPreset> = {
  webStandard: {
    key: 'webStandard',
    labelKey: 'dpi.preset.webStandard.label',
    pixels: 1024,
    dpi: 72,
    descriptionKey: 'dpi.preset.webStandard.desc',
  },
  retinaScreen: {
    key: 'retinaScreen',
    labelKey: 'dpi.preset.retinaScreen.label',
    pixels: 2048,
    dpi: 72,
    descriptionKey: 'dpi.preset.retinaScreen.desc',
  },
  printBrochure: {
    key: 'printBrochure',
    labelKey: 'dpi.preset.printBrochure.label',
    pixels: 1200,
    dpi: 300,
    descriptionKey: 'dpi.preset.printBrochure.desc',
  },
  printPoster: {
    key: 'printPoster',
    labelKey: 'dpi.preset.printPoster.label',
    pixels: 2400,
    dpi: 300,
    descriptionKey: 'dpi.preset.printPoster.desc',
  },
  printBillboard: {
    key: 'printBillboard',
    labelKey: 'dpi.preset.printBillboard.label',
    pixels: 4096,
    dpi: 300,
    descriptionKey: 'dpi.preset.printBillboard.desc',
  },
};

/**
 * Calculates physical print dimensions in centimeters and inches from pixels and DPI
 * Formula: inches = pixels / dpi; cm = inches * 2.54
 */
export function calculatePrintDimensions(pixels: number, dpi: number): IPrintDimension {
  const safeDpi = Math.max(1, dpi);
  const safePixels = Math.max(1, pixels);

  const inches = safePixels / safeDpi;
  const cm = inches * 2.54;

  return {
    pixels: safePixels,
    dpi: safeDpi,
    inches,
    cm,
  };
}
