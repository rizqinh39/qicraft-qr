import QRCodeStyling, { Options } from 'qr-code-styling';
import { IQRConfig } from './types';
import { resolveErrorCorrectionLevel } from './safetyGuard';

export class QRRenderer {
  private qrCode: QRCodeStyling;

  constructor(config: IQRConfig) {
    this.qrCode = new QRCodeStyling(this.mapConfigToOptions(config));
  }

  public update(config: IQRConfig): void {
    this.qrCode.update(this.mapConfigToOptions(config));
  }

  public append(container: HTMLElement): void {
    container.innerHTML = '';
    this.qrCode.append(container);
  }

  public async getRawSvg(): Promise<string> {
    const rawData = await this.qrCode.getRawData('svg');
    if (!rawData) return '';
    if (typeof rawData === 'string') return rawData;
    if (rawData instanceof Blob) {
      return await rawData.text();
    }
    return '';
  }

  public async getBlob(format: 'png' | 'svg' | 'jpeg' = 'png'): Promise<Blob | null> {
    const raw = await this.qrCode.getRawData(format);
    if (!raw) return null;
    if (raw instanceof Blob) return raw;
    if (typeof raw === 'string') {
      return new Blob([raw], { type: format === 'svg' ? 'image/svg+xml' : 'image/png' });
    }
    return null;
  }

  private mapConfigToOptions(config: IQRConfig): Options {
    const effectiveEcLevel = resolveErrorCorrectionLevel(
      config.errorCorrectionLevel,
      Boolean(config.logo.image)
    );

    const options: Options = {
      width: config.width,
      height: config.height,
      data: config.data || 'https://qicraft.io',
      margin: config.margin,
      qrOptions: {
        typeNumber: 0,
        mode: 'Byte',
        errorCorrectionLevel: effectiveEcLevel,
      },
      dotsOptions: {
        type: config.style.dotsType,
        color: config.style.dotsColor,
        gradient: config.style.gradient?.enabled
          ? {
              type: config.style.gradient.type,
              rotation: ((config.style.gradient.rotation || 0) * Math.PI) / 180,
              colorStops: config.style.gradient.colorStops,
            }
          : undefined,
      },
      cornersSquareOptions: {
        type: config.style.cornerSquareType,
        color: config.style.cornerSquareColor || config.style.dotsColor,
      },
      cornersDotOptions: {
        type: config.style.cornerDotType,
        color: config.style.cornerDotColor || config.style.dotsColor,
      },
      backgroundOptions: {
        color: config.style.backgroundColor,
      },
    };

    if (config.logo.image) {
      options.image = config.logo.image;
      options.imageOptions = {
        hideBackgroundDots: config.logo.hasHalo,
        imageSize: config.logo.size,
        margin: config.logo.margin,
        crossOrigin: 'anonymous',
      };
    }

    return options;
  }
}
