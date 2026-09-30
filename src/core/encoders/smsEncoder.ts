import { IPayloadEncoder, ISmsPayload } from './types';

export class SmsEncoder implements IPayloadEncoder<ISmsPayload> {
  readonly type = 'sms';

  encode(payload: ISmsPayload): string {
    const phone = payload.phone?.trim() || '';
    const msg = payload.message || '';
    if (msg) {
      return `SMSTO:${phone}:${msg}`;
    }
    return `SMSTO:${phone}`;
  }

  validate(payload: ISmsPayload): { isValid: boolean; error?: string } {
    if (!payload.phone?.trim()) {
      return { isValid: false, error: 'Phone number cannot be empty' };
    }
    return { isValid: true };
  }
}
