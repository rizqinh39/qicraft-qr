import { IPayloadEncoder, IUrlPayload } from './types';

export class UrlEncoder implements IPayloadEncoder<IUrlPayload> {
  readonly type = 'url';

  encode(payload: IUrlPayload): string {
    if (!payload.baseUrl) return '';

    let urlString = payload.baseUrl.trim();
    if (!/^https?:\/\//i.test(urlString)) {
      urlString = `https://${urlString}`;
    }

    try {
      const url = new URL(urlString);
      if (payload.utmSource?.trim()) url.searchParams.set('utm_source', payload.utmSource.trim());
      if (payload.utmMedium?.trim()) url.searchParams.set('utm_medium', payload.utmMedium.trim());
      if (payload.utmCampaign?.trim()) url.searchParams.set('utm_campaign', payload.utmCampaign.trim());
      if (payload.utmTerm?.trim()) url.searchParams.set('utm_term', payload.utmTerm.trim());
      if (payload.utmContent?.trim()) url.searchParams.set('utm_content', payload.utmContent.trim());
      return url.toString();
    } catch {
      return urlString;
    }
  }

  validate(payload: IUrlPayload): { isValid: boolean; error?: string } {
    if (!payload.baseUrl?.trim()) {
      return { isValid: false, error: 'Base URL cannot be empty' };
    }
    return { isValid: true };
  }
}
