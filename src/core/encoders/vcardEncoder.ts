import { IPayloadEncoder, IVCardPayload } from './types';

export class VCardEncoder implements IPayloadEncoder<IVCardPayload> {
  readonly type = 'vcard';

  encode(payload: IVCardPayload): string {
    const lines: string[] = [
      'BEGIN:VCARD',
      'VERSION:4.0',
    ];

    const fn = [payload.firstName, payload.lastName].filter(Boolean).join(' ').trim();
    lines.push(`FN:${fn}`);
    lines.push(`N:${payload.lastName || ''};${payload.firstName || ''};;;`);

    if (payload.organization?.trim()) {
      lines.push(`ORG:${payload.organization.trim()}`);
    }
    if (payload.jobTitle?.trim()) {
      lines.push(`TITLE:${payload.jobTitle.trim()}`);
    }
    if (payload.phone?.trim()) {
      lines.push(`TEL:${payload.phone.trim()}`);
    }
    if (payload.workPhone?.trim()) {
      lines.push(`TEL;TYPE=work:${payload.workPhone.trim()}`);
    }
    if (payload.email?.trim()) {
      lines.push(`EMAIL:${payload.email.trim()}`);
    }
    if (payload.website?.trim()) {
      lines.push(`URL:${payload.website.trim()}`);
    }
    if (payload.address?.trim()) {
      lines.push(`ADR:;;${payload.address.trim()};;;;`);
    }

    lines.push('END:VCARD');
    return lines.join('\n');
  }

  validate(payload: IVCardPayload): { isValid: boolean; error?: string } {
    if (!payload.firstName?.trim()) {
      return { isValid: false, error: 'First name cannot be empty' };
    }
    return { isValid: true };
  }
}
