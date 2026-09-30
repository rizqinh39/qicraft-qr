import { create } from 'zustand';
import { IQRConfig, IQRStyleOptions, IQRLogoOptions, ErrorCorrectionLevel } from '../core/qr/types';
import { IUrlPayload, IWifiPayload, IVCardPayload, ISmsPayload } from '../core/encoders/types';
import { UrlEncoder } from '../core/encoders/urlEncoder';
import { WifiEncoder } from '../core/encoders/wifiEncoder';
import { VCardEncoder } from '../core/encoders/vcardEncoder';
import { SmsEncoder } from '../core/encoders/smsEncoder';
import { DpiPresetKey, PRESET_DIMENSIONS } from '../core/dpi/printCalculator';

export type PayloadType = 'url' | 'wifi' | 'vcard' | 'text' | 'sms';

export interface IPrintConfig {
  preset: DpiPresetKey;
  isCustom: boolean;
  pixels: number;
  dpi: number;
}

const urlEncoder = new UrlEncoder();
const wifiEncoder = new WifiEncoder();
const vcardEncoder = new VCardEncoder();
const smsEncoder = new SmsEncoder();

const defaultStyle: IQRStyleOptions = {
  dotsType: 'rounded',
  dotsColor: '#6366F1', // Primary Indigo
  backgroundColor: '#FFFFFF',
  gradient: {
    enabled: false,
    type: 'linear',
    colorStops: [
      { offset: 0, color: '#6366F1' },
      { offset: 1, color: '#10B981' },
    ],
    rotation: 45,
  },
  cornerSquareType: 'extra-rounded',
  cornerSquareColor: '#6366F1',
  cornerDotType: 'dot',
  cornerDotColor: '#6366F1',
};

const defaultLogo: IQRLogoOptions = {
  image: undefined,
  size: 0.22,
  margin: 4,
  hasHalo: true,
};

const defaultPrint: IPrintConfig = {
  preset: 'webStandard',
  isCustom: false,
  pixels: 1024,
  dpi: 72,
};

interface QRState {
  payloadType: PayloadType;
  urlPayload: IUrlPayload;
  wifiPayload: IWifiPayload;
  vcardPayload: IVCardPayload;
  textPayload: string;
  smsPayload: ISmsPayload;

  config: IQRConfig;
  printConfig: IPrintConfig;

  setPayloadType: (type: PayloadType) => void;
  setUrlPayload: (payload: Partial<IUrlPayload>) => void;
  setWifiPayload: (payload: Partial<IWifiPayload>) => void;
  setVcardPayload: (payload: Partial<IVCardPayload>) => void;
  setTextPayload: (text: string) => void;
  setSmsPayload: (payload: Partial<ISmsPayload>) => void;

  setStyle: (style: Partial<IQRStyleOptions>) => void;
  setLogo: (logo: Partial<IQRLogoOptions>) => void;
  setErrorCorrection: (level: ErrorCorrectionLevel) => void;
  setMargin: (margin: number) => void;

  setPrintPreset: (presetKey: DpiPresetKey) => void;
  setCustomPrint: (pixels: number, dpi: number) => void;
  applyFullConfig: (config: Partial<IQRConfig>) => void;
  resetDefaults: () => void;
}

function computeEncodedData(
  type: PayloadType,
  url: IUrlPayload,
  wifi: IWifiPayload,
  vcard: IVCardPayload,
  text: string,
  sms: ISmsPayload
): string {
  switch (type) {
    case 'url':
      return urlEncoder.encode(url);
    case 'wifi':
      return wifiEncoder.encode(wifi);
    case 'vcard':
      return vcardEncoder.encode(vcard);
    case 'text':
      return text;
    case 'sms':
      return smsEncoder.encode(sms);
    default:
      return 'https://qicraft.io';
  }
}

const initialUrl: IUrlPayload = { baseUrl: 'https://qicraft.io' };
const initialWifi: IWifiPayload = { ssid: 'MyNetwork', password: '', encryption: 'WPA', hidden: false };
const initialVcard: IVCardPayload = { firstName: 'Rizqi', lastName: 'Nur', organization: 'QiCraft' };
const initialText = 'Hello from QiCraft Static QR!';
const initialSms: ISmsPayload = { phone: '+62812345678', message: 'Hello QiCraft' };

export const useQRStore = create<QRState>((set) => ({
  payloadType: 'url',
  urlPayload: initialUrl,
  wifiPayload: initialWifi,
  vcardPayload: initialVcard,
  textPayload: initialText,
  smsPayload: initialSms,

  config: {
    data: computeEncodedData('url', initialUrl, initialWifi, initialVcard, initialText, initialSms),
    errorCorrectionLevel: 'M',
    margin: 2,
    width: 1024,
    height: 1024,
    style: defaultStyle,
    logo: defaultLogo,
  },
  printConfig: defaultPrint,

  setPayloadType: (payloadType) => {
    set((state) => {
      const data = computeEncodedData(
        payloadType,
        state.urlPayload,
        state.wifiPayload,
        state.vcardPayload,
        state.textPayload,
        state.smsPayload
      );
      return { payloadType, config: { ...state.config, data } };
    });
  },

  setUrlPayload: (patch) => {
    set((state) => {
      const urlPayload = { ...state.urlPayload, ...patch };
      const data = computeEncodedData(
        state.payloadType,
        urlPayload,
        state.wifiPayload,
        state.vcardPayload,
        state.textPayload,
        state.smsPayload
      );
      return { urlPayload, config: { ...state.config, data } };
    });
  },

  setWifiPayload: (patch) => {
    set((state) => {
      const wifiPayload = { ...state.wifiPayload, ...patch };
      const data = computeEncodedData(
        state.payloadType,
        state.urlPayload,
        wifiPayload,
        state.vcardPayload,
        state.textPayload,
        state.smsPayload
      );
      return { wifiPayload, config: { ...state.config, data } };
    });
  },

  setVcardPayload: (patch) => {
    set((state) => {
      const vcardPayload = { ...state.vcardPayload, ...patch };
      const data = computeEncodedData(
        state.payloadType,
        state.urlPayload,
        state.wifiPayload,
        vcardPayload,
        state.textPayload,
        state.smsPayload
      );
      return { vcardPayload, config: { ...state.config, data } };
    });
  },

  setTextPayload: (textPayload) => {
    set((state) => {
      const data = computeEncodedData(
        state.payloadType,
        state.urlPayload,
        state.wifiPayload,
        state.vcardPayload,
        textPayload,
        state.smsPayload
      );
      return { textPayload, config: { ...state.config, data } };
    });
  },

  setSmsPayload: (patch) => {
    set((state) => {
      const smsPayload = { ...state.smsPayload, ...patch };
      const data = computeEncodedData(
        state.payloadType,
        state.urlPayload,
        state.wifiPayload,
        state.vcardPayload,
        state.textPayload,
        smsPayload
      );
      return { smsPayload, config: { ...state.config, data } };
    });
  },

  setStyle: (stylePatch) => {
    set((state) => ({
      config: {
        ...state.config,
        style: { ...state.config.style, ...stylePatch },
      },
    }));
  },

  setLogo: (logoPatch) => {
    set((state) => ({
      config: {
        ...state.config,
        logo: { ...state.config.logo, ...logoPatch },
      },
    }));
  },

  setErrorCorrection: (errorCorrectionLevel) => {
    set((state) => ({
      config: { ...state.config, errorCorrectionLevel },
    }));
  },

  setMargin: (margin) => {
    set((state) => ({
      config: { ...state.config, margin },
    }));
  },

  setPrintPreset: (presetKey) => {
    const preset = PRESET_DIMENSIONS[presetKey];
    set((state) => ({
      printConfig: {
        preset: presetKey,
        isCustom: false,
        pixels: preset.pixels,
        dpi: preset.dpi,
      },
      config: {
        ...state.config,
        width: preset.pixels,
        height: preset.pixels,
      },
    }));
  },

  setCustomPrint: (pixels, dpi) => {
    set((state) => ({
      printConfig: {
        preset: 'webStandard',
        isCustom: true,
        pixels,
        dpi,
      },
      config: {
        ...state.config,
        width: pixels,
        height: pixels,
      },
    }));
  },

  applyFullConfig: (newConfig) => {
    set((state) => ({
      config: {
        ...state.config,
        ...newConfig,
        style: { ...state.config.style, ...newConfig.style },
        logo: { ...state.config.logo, ...newConfig.logo },
      },
    }));
  },

  resetDefaults: () => {
    set({
      payloadType: 'url',
      urlPayload: initialUrl,
      wifiPayload: initialWifi,
      vcardPayload: initialVcard,
      textPayload: initialText,
      smsPayload: initialSms,
      config: {
        data: 'https://qicraft.io',
        errorCorrectionLevel: 'M',
        margin: 2,
        width: 1024,
        height: 1024,
        style: defaultStyle,
        logo: defaultLogo,
      },
      printConfig: defaultPrint,
    });
  },
}));
