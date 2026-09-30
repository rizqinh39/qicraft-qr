export type ScannabilityLevel = 'optimal' | 'acceptable' | 'warning' | 'critical';

export interface IScannabilityResult {
  ratio: number;
  level: ScannabilityLevel;
  isScannable: boolean;
  messageKey: string;
}
