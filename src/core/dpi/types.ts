export interface IPrintDimension {
  pixels: number;
  dpi: number;
  cm: number;
  inches: number;
}

export type DpiPresetKey = 'webStandard' | 'retinaScreen' | 'printBrochure' | 'printPoster' | 'printBillboard';

export interface IDpiPreset {
  key: DpiPresetKey;
  labelKey: string;
  pixels: number;
  dpi: number;
  descriptionKey: string;
}
