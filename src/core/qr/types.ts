export type DotType = 'square' | 'dots' | 'rounded' | 'classy' | 'classy-rounded' | 'extra-rounded';
export type CornerSquareType = 'square' | 'dot' | 'extra-rounded';
export type CornerDotType = 'square' | 'dot';
export type ErrorCorrectionLevel = 'L' | 'M' | 'Q' | 'H';

export interface IQRGradient {
  enabled: boolean;
  type: 'linear' | 'radial';
  colorStops: Array<{ offset: number; color: string }>;
  rotation?: number;
}

export interface IQRStyleOptions {
  dotsType: DotType;
  dotsColor: string;
  gradient?: IQRGradient;
  backgroundColor: string;
  cornerSquareType: CornerSquareType;
  cornerSquareColor: string;
  cornerDotType: CornerDotType;
  cornerDotColor: string;
}

export interface IQRLogoOptions {
  image?: string;
  size: number; // 0.1 to 0.35
  margin: number;
  hasHalo: boolean;
}

export interface IQRConfig {
  data: string;
  errorCorrectionLevel: ErrorCorrectionLevel;
  margin: number;
  width: number;
  height: number;
  style: IQRStyleOptions;
  logo: IQRLogoOptions;
}
