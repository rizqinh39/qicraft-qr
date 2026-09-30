import { IPayloadEncoder, IWifiPayload } from './types';

export class WifiEncoder implements IPayloadEncoder<IWifiPayload> {
  readonly type = 'wifi';

  encode(payload: IWifiPayload): string {
    const ssid = payload.ssid || '';
    const enc = payload.encryption || 'WPA';
    const passPart = enc !== 'nopass' && payload.password ? `P:${payload.password};` : '';
    const hidden = payload.hidden ? 'true' : 'false';

    return `WIFI:T:${enc};S:${ssid};${passPart}H:${hidden};;`;
  }

  validate(payload: IWifiPayload): { isValid: boolean; error?: string } {
    if (!payload.ssid?.trim()) {
      return { isValid: false, error: 'SSID cannot be empty' };
    }
    return { isValid: true };
  }
}
